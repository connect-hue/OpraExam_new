'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content here...',
  minHeight = '180px',
  className = '',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value || '');
  const [showExtendedToolbar, setShowExtendedToolbar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [formatLabel, setFormatLabel] = useState('Format');

  // Modal / Popover inputs
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkNewTab, setLinkNewTab] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [customTableCols, setCustomTableCols] = useState(3);
  const [customTableRows, setCustomTableRows] = useState(3);

  // Save selection before opening popups so commands insert at the right spot
  const saveSelection = () => {
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (typeof window === 'undefined' || !savedSelectionRef.current) return;
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  // Sync internal HTML content from prop only if not active/focused
  useEffect(() => {
    if (!editorRef.current) return;
    if (document.activeElement !== editorRef.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlContent(value || '');
  }, [value]);

  // Handle content change inside contentEditable
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setHtmlContent(html);
    onChange(html);
  }, [onChange]);

  // Execute standard formatting command
  const execCmd = (cmd: string, val: string = '') => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(cmd, false, val);
    handleInput();
  };

  // Toggle dropdown helper
  const toggleDropdown = (name: string) => {
    saveSelection();
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.rte-dropdown-container') && !target.closest('.rte-toolbar-btn')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format Block (Paragraph, Heading 1, 2, 3, 4, Quote, Code)
  const handleFormatBlock = (tag: string, label: string = 'Format') => {
    execCmd('formatBlock', tag);
    setFormatLabel(label);
    setActiveDropdown(null);
  };

  // Insert Table helper
  const handleInsertTable = (cols: number, rows: number) => {
    restoreSelection();
    let table = `<div class="my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-xs"><table class="min-w-full divide-y divide-slate-200 text-left text-xs">`;
    table += `<thead class="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider"><tr>`;
    for (let c = 0; c < cols; c++) {
      table += `<th class="px-3 py-2 border-r border-slate-200 last:border-r-0">Header ${c + 1}</th>`;
    }
    table += `</tr></thead><tbody class="divide-y divide-slate-100 bg-white">`;
    for (let r = 0; r < rows; r++) {
      table += `<tr class="hover:bg-slate-50 transition-colors">`;
      for (let c = 0; c < cols; c++) {
        table += `<td class="px-3 py-2 border-r border-slate-100 last:border-r-0 text-slate-700">Cell ${r + 1},${c + 1}</td>`;
      }
      table += `</tr>`;
    }
    table += `</tbody></table></div><p><br></p>`;

    editorRef.current?.focus();
    document.execCommand('insertHTML', false, table);
    handleInput();
    setActiveDropdown(null);
  };

  // Insert Link helper
  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    editorRef.current?.focus();

    const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('mailto:') || linkUrl.startsWith('#')
      ? linkUrl
      : `https://${linkUrl}`;

    const textToInsert = linkText.trim() || linkUrl;
    const targetAttr = linkNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const linkHtml = `<a href="${url}"${targetAttr} class="text-blue-600 underline font-medium hover:text-blue-800 transition-colors">${textToInsert}</a>`;

    document.execCommand('insertHTML', false, linkHtml);
    handleInput();
    setLinkUrl('');
    setLinkText('');
    setActiveDropdown(null);
  };

  const handleRemoveLink = () => {
    execCmd('unlink');
    setActiveDropdown(null);
  };

  // Insert Video (YouTube embed)
  const handleInsertVideo = () => {
    if (!videoUrl.trim()) return;
    restoreSelection();
    editorRef.current?.focus();

    let embedSrc = videoUrl;
    const ytMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      embedSrc = `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    const videoHtml = `
      <div class="my-4 aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <iframe src="${embedSrc}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <p><br></p>
    `;

    document.execCommand('insertHTML', false, videoHtml);
    handleInput();
    setVideoUrl('');
    setActiveDropdown(null);
  };

  // Insert Image from URL
  const handleInsertImageUrl = () => {
    if (!imageUrl.trim()) return;
    restoreSelection();
    editorRef.current?.focus();

    const imgHtml = `
      <figure class="my-4 text-center">
        <img src="${imageUrl}" alt="${imageAlt || 'Article illustration'}" class="rounded-xl border border-slate-200 max-w-full h-auto mx-auto shadow-xs" />
        ${imageAlt ? `<figcaption class="text-xs text-slate-500 mt-1.5 italic">${imageAlt}</figcaption>` : ''}
      </figure>
      <p><br></p>
    `;

    document.execCommand('insertHTML', false, imgHtml);
    handleInput();
    setImageUrl('');
    setImageAlt('');
    setActiveDropdown(null);
  };

  // File upload image handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      restoreSelection();
      editorRef.current?.focus();
      const imgHtml = `
        <figure class="my-4 text-center">
          <img src="${dataUrl}" alt="${file.name}" class="rounded-xl border border-slate-200 max-w-full h-auto mx-auto shadow-xs" />
        </figure>
        <p><br></p>
      `;
      document.execCommand('insertHTML', false, imgHtml);
      handleInput();
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    setActiveDropdown(null);
  };

  // Insert Special Character
  const handleInsertChar = (ch: string) => {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('insertText', false, ch);
    handleInput();
    setActiveDropdown(null);
  };

  // Toggle HTML View
  const handleToggleHtml = () => {
    if (isHtmlMode) {
      // Switching from HTML textarea back to visual WYSIWYG
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlContent;
      }
      onChange(htmlContent);
      setIsHtmlMode(false);
    } else {
      // Switching to HTML textarea
      const currentHtml = editorRef.current?.innerHTML || '';
      setHtmlContent(currentHtml);
      setIsHtmlMode(true);
    }
  };

  const handleHtmlTextareaChange = (newVal: string) => {
    setHtmlContent(newVal);
    onChange(newVal);
  };

  const specialChars = [
    'Ω', 'α', 'β', 'γ', 'δ', 'π', '∑', '√', '∞',
    '≠', '≤', '≥', '±', '×', '÷', '°', 'µ',
    '©', '®', '™', '€', '£', '¥', '₹', '§', '•',
    '→', '←', '↔', '✓', '★', '💊', '🩺', '⚕️'
  ];

  const colorPalette = [
    { label: 'Black', hex: '#0f172a' },
    { label: 'Slate', hex: '#475569' },
    { label: 'Blue', hex: '#2563eb' },
    { label: 'Indigo', hex: '#4f46e5' },
    { label: 'Purple', hex: '#7c3aed' },
    { label: 'Emerald', hex: '#059669' },
    { label: 'Teal', hex: '#0d9488' },
    { label: 'Amber', hex: '#d97706' },
    { label: 'Red', hex: '#dc2626' },
    { label: 'Rose', hex: '#e11d48' },
  ];

  const highlightPalette = [
    { label: 'None', hex: 'transparent' },
    { label: 'Yellow', hex: '#fef08a' },
    { label: 'Neon Green', hex: '#bbf7d0' },
    { label: 'Cyan Blue', hex: '#bae6fd' },
    { label: 'Light Purple', hex: '#e9d5ff' },
    { label: 'Soft Pink', hex: '#fbcfe8' },
    { label: 'Soft Orange', hex: '#fed7aa' },
  ];

  return (
    <div className={`rounded-xl border border-slate-300 bg-white shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all ${className}`}>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Toolbar - Matches Image 1 */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50/80 rounded-t-xl text-slate-700 relative text-xs select-none">
        {/* Format Dropdown (Paragraph, H1, H2, H3, Quote, Code) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('format')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-800 hover:bg-slate-200/80 font-medium text-xs transition-colors"
            title="Text block format"
          >
            <span>{formatLabel}</span>
            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {activeDropdown === 'format' && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('p', 'Paragraph')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs text-slate-700 font-normal"
              >
                Paragraph
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('h1', 'Heading 1')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-sm font-bold text-slate-900"
              >
                Heading 1
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('h2', 'Heading 2')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs font-bold text-slate-800"
              >
                Heading 2
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('h3', 'Heading 3')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs font-semibold text-slate-800"
              >
                Heading 3
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('h4', 'Heading 4')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-[11px] font-semibold text-slate-700"
              >
                Heading 4
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('blockquote', 'Quote')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs italic text-slate-600 border-t border-slate-100"
              >
                Quote Block
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleFormatBlock('pre', 'Code')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs font-mono text-slate-600"
              >
                Code Block
              </button>
            </div>
          )}
        </div>

        {/* HTML Toggle Button (Matches Image 1) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggleHtml}
          className={`px-2 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1 border transition-colors ${
            isHtmlMode
              ? 'bg-blue-100 text-blue-700 border-blue-300'
              : 'text-slate-700 border-slate-300 hover:bg-slate-200/80 bg-white'
          }`}
          title="Toggle HTML source code view"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>HTML</span>
        </button>

        {/* Quick H1 Button (Dashed box with H1, matching Image 1) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleFormatBlock('h1')}
          className="px-1.5 py-0.5 rounded border border-dashed border-slate-400 hover:border-slate-700 text-slate-800 text-[11px] font-extrabold hover:bg-slate-200/60 transition-colors"
          title="Format as Heading 1"
        >
          H1
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-slate-300 mx-1" />

        {/* Bold (B) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('bold')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 font-bold text-slate-800 text-sm transition-colors"
          title="Bold (Ctrl+B)"
        >
          B
        </button>

        {/* Underline (U) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('underline')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 underline font-medium text-slate-800 text-sm transition-colors"
          title="Underline (Ctrl+U)"
        >
          U
        </button>

        {/* Italic (I) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('italic')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 italic font-serif text-slate-800 text-sm transition-colors"
          title="Italic (Ctrl+I)"
        >
          I
        </button>

        {/* Strikethrough (S) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('strikeThrough')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 line-through text-slate-800 text-sm transition-colors"
          title="Strikethrough"
        >
          S
        </button>

        {/* Bullet List (:= v) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('insertUnorderedList')}
            className="flex items-center px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Bullet List"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="9" y1="6" x2="20" y2="6"/>
              <line x1="9" y1="12" x2="20" y2="12"/>
              <line x1="9" y1="18" x2="20" y2="18"/>
              <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Numbered List (1= v) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('insertOrderedList')}
            className="flex items-center px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Numbered List"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="10" y1="6" x2="21" y2="6"/>
              <line x1="10" y1="12" x2="21" y2="12"/>
              <line x1="10" y1="18" x2="21" y2="18"/>
              <path d="M4 6h2M5 6v3" strokeWidth="1.8"/>
              <path d="M4 11h2.5c.3 0 .5.3.3.5l-2.6 2.5h2.8" strokeWidth="1.5"/>
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Outdent (Decrease Indent) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('outdent')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
          title="Decrease Indent"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="7 8 3 12 7 16" />
            <line x1="21" y1="12" x2="11" y2="12" />
            <line x1="21" y1="6" x2="11" y2="6" />
            <line x1="21" y1="18" x2="11" y2="18" />
          </svg>
        </button>

        {/* Indent (Increase Indent) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd('indent')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
          title="Increase Indent"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="11 8 15 12 11 16" />
            <line x1="21" y1="12" x2="15" y2="12" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="18" x2="3" y2="18" />
          </svg>
        </button>

        {/* Alignment Dropdown (≡ v) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('align')}
            className="flex items-center px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Text Alignment"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="15" y2="12"/>
              <line x1="3" y1="18" x2="18" y2="18"/>
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {activeDropdown === 'align' && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { execCmd('justifyLeft'); setActiveDropdown(null); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center gap-2 text-slate-700"
              >
                <span>Left</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { execCmd('justifyCenter'); setActiveDropdown(null); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center gap-2 text-slate-700"
              >
                <span>Center</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { execCmd('justifyRight'); setActiveDropdown(null); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center gap-2 text-slate-700"
              >
                <span>Right</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { execCmd('justifyFull'); setActiveDropdown(null); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center gap-2 text-slate-700"
              >
                <span>Justify</span>
              </button>
            </div>
          )}
        </div>

        {/* Image Upload Dropdown (🖼️ ⬆️ v) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Upload image from computer"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <svg className="w-2.5 h-2.5 ml-0.5 -mt-1 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </div>
            <svg className="w-2.5 h-2.5 text-slate-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Image from Web / URL (🖼️ 🔗 v) */}
        <div className="relative rte-dropdown-container">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('image-url')}
            className="flex items-center px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Insert image from web URL"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M10 14a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" strokeWidth="1.8"/>
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {activeDropdown === 'image-url' && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-40 space-y-2">
              <div className="text-xs font-bold text-slate-800">Insert Image from Web</div>
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-0.5">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-0.5">Alt Text / Caption (Optional)</label>
                <input
                  type="text"
                  placeholder="Illustration description"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertImageUrl}
                  className="px-3 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
                >
                  Insert Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Blockquote (“) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleFormatBlock('blockquote')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-800 font-serif font-black text-base transition-colors"
          title="Blockquote"
        >
          “
        </button>

        {/* 3 DOTS EXTENDED MENU TOGGLE (⋮) - Matches Image 1 & Image 2 */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            saveSelection();
            setShowExtendedToolbar((prev) => !prev);
          }}
          className={`w-7 h-7 flex items-center justify-center rounded font-bold text-sm transition-all rte-toolbar-btn ${
            showExtendedToolbar
              ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-400'
              : 'hover:bg-slate-200/80 text-slate-700'
          }`}
          title="More options (Table, Link, Video, Font, Colors, Highlighting, Math symbols)"
        >
          ⋮
        </button>

        {/* Secondary Quote (”) */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleInsertChar('”')}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-800 font-serif font-black text-base transition-colors"
          title="Closing quote"
        >
          ”
        </button>
      </div>

      {/* EXTENDED TOOLBAR (Shown when clicking 3 Dots - Exactly matches Image 2) */}
      {showExtendedToolbar && (
        <div className="flex flex-wrap items-center gap-1 px-2.5 py-1.5 bg-slate-50 border-b border-blue-200 text-slate-700 text-xs shadow-xs relative select-none animate-in fade-in duration-150">
          {/* Table (⊞ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('table')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 transition-colors"
              title="Insert Table"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'table' && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 space-y-2.5">
                <div className="text-xs font-bold text-slate-800">Quick Insert Table</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleInsertTable(2, 2)}
                    className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-[11px] rounded text-slate-700 font-medium text-left"
                  >
                    2 × 2 Table
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertTable(3, 3)}
                    className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-[11px] rounded text-slate-700 font-medium text-left"
                  >
                    3 × 3 Table
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertTable(4, 3)}
                    className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-[11px] rounded text-slate-700 font-medium text-left"
                  >
                    4 × 3 Table
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertTable(4, 5)}
                    className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-[11px] rounded text-slate-700 font-medium text-left"
                  >
                    4 × 5 Table
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Custom:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={customTableCols}
                      onChange={(e) => setCustomTableCols(parseInt(e.target.value) || 2)}
                      className="w-10 px-1 py-0.5 border border-slate-300 rounded text-center text-xs"
                    />
                    <span className="text-slate-400">×</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={customTableRows}
                      onChange={(e) => setCustomTableRows(parseInt(e.target.value) || 2)}
                      className="w-10 px-1 py-0.5 border border-slate-300 rounded text-center text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleInsertTable(customTableCols, customTableRows)}
                      className="ml-1 px-2 py-0.5 bg-blue-600 text-white rounded font-medium text-[11px] hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Link (🔗 v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('link')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 transition-colors"
              title="Insert or Edit Link"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'link' && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 space-y-2">
                <div className="text-xs font-bold text-slate-800">Insert Link</div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-0.5">Link URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-0.5">Display Text (Optional)</label>
                  <input
                    type="text"
                    placeholder="Click here"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    checked={linkNewTab}
                    onChange={(e) => setLinkNewTab(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Open in new tab</span>
                </label>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="text-red-500 hover:text-red-700 text-[11px] font-medium"
                  >
                    Unlink
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(null)}
                      className="px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertLink}
                      className="px-3 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
                    >
                      Insert
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Embed (▶ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('video')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 transition-colors"
              title="Embed Video"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'video' && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 space-y-2">
                <div className="text-xs font-bold text-slate-800">Embed Video</div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-0.5">YouTube / Video URL</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <div className="flex justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(null)}
                    className="px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertVideo}
                    className="px-3 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
                  >
                    Embed
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-slate-300 mx-0.5" />

          {/* Undo (↶) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('undo')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6" />
              <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
            </svg>
          </button>

          {/* Redo (↷) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('redo')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-700 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6" />
              <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-4 w-px bg-slate-300 mx-0.5" />

          {/* Font Family (A v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('font-family')}
              className="flex items-center gap-0.5 px-2 py-1 rounded hover:bg-slate-200/80 font-bold text-slate-800 transition-colors"
              title="Font Family"
            >
              <span>A</span>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'font-family' && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                {[
                  { name: 'Default Sans', val: 'Inter, sans-serif' },
                  { name: 'Arial', val: 'Arial, Helvetica, sans-serif' },
                  { name: 'Georgia', val: 'Georgia, serif' },
                  { name: 'Times New Roman', val: 'Times New Roman, serif' },
                  { name: 'Courier New', val: 'Courier New, monospace' },
                  { name: 'Verdana', val: 'Verdana, Geneva, sans-serif' },
                  { name: 'Trebuchet MS', val: 'Trebuchet MS, sans-serif' },
                ].map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { execCmd('fontName', f.val); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs text-slate-700"
                    style={{ fontFamily: f.val }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Color (A_ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('text-color')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 transition-colors"
              title="Text Color"
            >
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-xs leading-none">A</span>
                <span className="w-3.5 h-0.5 bg-blue-600 rounded-full mt-0.5" />
              </div>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'text-color' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 z-50">
                <div className="text-[11px] font-bold text-slate-700 mb-2">Text Color</div>
                <div className="grid grid-cols-5 gap-1.5 mb-2.5">
                  {colorPalette.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { execCmd('foreColor', c.hex); setActiveDropdown(null); }}
                      className="w-7 h-7 rounded-lg border border-slate-300 hover:scale-110 transition-transform shadow-xs"
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100">
                  <span className="text-slate-500">Custom:</span>
                  <input
                    type="color"
                    onChange={(e) => { execCmd('foreColor', e.target.value); setActiveDropdown(null); }}
                    className="w-8 h-6 p-0 border-0 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Background / Highlight Color (A ‾ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('bg-color')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 transition-colors"
              title="Text Background Color"
            >
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-xs leading-none bg-yellow-200 px-0.5 rounded">A</span>
              </div>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'bg-color' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 z-50">
                <div className="text-[11px] font-bold text-slate-700 mb-2">Background Color</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {highlightPalette.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { execCmd('hiliteColor', c.hex); setActiveDropdown(null); }}
                      className="h-6 rounded border border-slate-300 text-[10px] font-medium text-slate-800 flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
                      style={{ backgroundColor: c.hex === 'transparent' ? '#ffffff' : c.hex }}
                      title={c.label}
                    >
                      {c.hex === 'transparent' ? 'None' : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Font Size / Line Height (A ↕ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('font-size')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 font-bold transition-colors"
              title="Font Size"
            >
              <span className="text-xs">A</span>
              <span className="text-[10px] font-normal">↕</span>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'font-size' && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                {[
                  { label: 'Small (12px)', val: '2' },
                  { label: 'Normal (14px)', val: '3' },
                  { label: 'Medium (16px)', val: '4' },
                  { label: 'Large (18px)', val: '5' },
                  { label: 'Extra Large (24px)', val: '6' },
                  { label: 'Huge (32px)', val: '7' },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { execCmd('fontSize', s.val); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs text-slate-700"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Highlighter Tool (✏️ v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('highlighter')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-amber-600 transition-colors"
              title="Highlighter Marker"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'highlighter' && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="text-[11px] font-bold text-slate-700 mb-1.5">Select Marker Color</div>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: 'Yellow', hex: '#fef08a' },
                    { label: 'Neon Green', hex: '#bbf7d0' },
                    { label: 'Soft Pink', hex: '#fbcfe8' },
                    { label: 'Cyan Blue', hex: '#bae6fd' },
                  ].map((m) => (
                    <button
                      key={m.hex}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { execCmd('hiliteColor', m.hex); setActiveDropdown(null); }}
                      className="px-2 py-1 rounded border border-slate-200 text-xs text-slate-800 font-medium hover:brightness-95 text-center"
                      style={{ backgroundColor: m.hex }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-slate-300 mx-0.5" />

          {/* Clear Formatting (Tx) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('removeFormat')}
            className="px-2 py-1 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-700 font-mono text-xs transition-colors"
            title="Clear Formatting"
          >
            <span className="font-bold">T</span>
            <span className="text-[10px] -mt-1 ml-0.5 text-slate-500">x</span>
          </button>

          {/* Special Characters (Ω v) */}
          <div className="relative rte-dropdown-container">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('special-chars')}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-slate-200/80 text-slate-800 font-bold transition-colors"
              title="Special Characters & Symbols"
            >
              <span className="text-sm font-serif">Ω</span>
              <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {activeDropdown === 'special-chars' && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2.5 z-50">
                <div className="text-[11px] font-bold text-slate-700 mb-1.5">Special Characters</div>
                <div className="grid grid-cols-7 gap-1">
                  {specialChars.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleInsertChar(ch)}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-blue-50 hover:text-blue-600 text-slate-800 text-sm border border-slate-100 transition-colors"
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subscript (X₂) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('subscript')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-800 font-medium text-xs transition-colors"
            title="Subscript"
          >
            <span>X</span>
            <span className="text-[10px] mt-1">₂</span>
          </button>

          {/* Superscript (X²) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('superscript')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200/80 text-slate-800 font-medium text-xs transition-colors"
            title="Superscript"
          >
            <span>X</span>
            <span className="text-[10px] -mt-1 font-bold">²</span>
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      {isHtmlMode ? (
        <textarea
          value={htmlContent}
          onChange={(e) => handleHtmlTextareaChange(e.target.value)}
          placeholder="Type or paste raw HTML code here..."
          className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-50/50 rounded-b-xl focus:outline-none resize-y leading-relaxed border-0"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          className="p-4 text-slate-800 text-sm leading-relaxed rounded-b-xl focus:outline-none prose prose-slate max-w-none prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-headings:text-slate-900 prose-h1:text-2xl prose-h1:font-extrabold prose-h2:text-xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-semibold prose-h4:text-base prose-ul:my-2.5 prose-li:my-0.5 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
          style={{ minHeight }}
        />
      )}
    </div>
  );
}
