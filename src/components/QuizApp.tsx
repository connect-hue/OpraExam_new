"use client";

import React, { useRef, useState } from 'react';
import { submitLead } from '@/lib/leads/client';
import { trackEvent } from '@/lib/analytics';
import { COUNTRY_CODES } from '@/data/countryCodes';

import { practiceQuestions as questions, type Domain } from '@/data/practiceQuestions';

const DOMAIN_COLOURS: Record<Domain, { bg: string; text: string; border: string; light: string }> = {
  Pharmacology: { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-500', light: 'bg-emerald-50' },
  Pharmaceutics: { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-500', light: 'bg-blue-50' },
  Chemistry:     { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-500', light: 'bg-violet-50' },
};

type AnswerRecord = { selected: number; correct: boolean };

export default function QuizApp() {
  const started = useRef(false);
  const completed = useRef(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Lead capture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [country, setCountry] = useState('Australia');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    if (!started.current) {
      started.current = true;
      trackEvent('quiz_start', { placement: 'opra-quiz', question_count: questions.length });
    }
    setSelectedOption(index);
    setShowExplanation(true);

    const correct = index === questions[currentIdx].answer;
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: { selected: index, correct }
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      if (!completed.current) {
        completed.current = true;
        trackEvent('quiz_complete', { placement: 'opra-quiz', question_count: questions.length });
      }
      setIsQuizFinished(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your contact phone number.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    try {
      const fullPhone = `${countryCode} ${phone.trim()}`;
      const result = await submitLead({
        name: name.trim(), email: email.trim(), phone: fullPhone,
        qualification: 'Pharmacy', educationQualification: 'Not specified',
        source: 'OPRAExam', tag: 'opra-quiz', city: country, notes: 'Quiz',
      });
      setIsFormSubmitted(true);
      trackEvent('generate_lead', { placement: 'opra-quiz', lead_outcome: result.isDuplicate ? 'duplicate' : result.isUpdated ? 'updated' : 'created' });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    started.current = false;
    completed.current = false;
    setFormError('');
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setIsQuizFinished(false);
    setIsFormSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  // ─── RESULTS ───────────────────────────────────────────────────────────────
  if (isQuizFinished && isFormSubmitted) {
    const totalScore = Object.values(answers).filter(a => a.correct).length;
    const percentage = Math.round((totalScore / questions.length) * 100);

    const domains: Domain[] = ['Pharmacology', 'Pharmaceutics', 'Chemistry'];
    const domainStats = domains.map(domain => {
      const domainQs = questions.filter(q => q.domain === domain);
      const correct = domainQs.filter((q) => answers[questions.indexOf(q)]?.correct).length;
      return { domain, correct, total: domainQs.length, pct: Math.round((correct / domainQs.length) * 100) };
    });

    const weakestDomain = domainStats.reduce((a, b) => a.pct < b.pct ? a : b);

    let readinessMsg = '';
    let readinessBg = '';
    if (percentage >= 80) {
      readinessMsg = '🎯 Excellent — you show strong exam readiness. Focus on any weak domains below.';
      readinessBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
    } else if (percentage >= 60) {
      readinessMsg = '📈 Good foundation — targeted practice on your weak domains will push you over the line.';
      readinessBg = 'bg-blue-50 border-blue-200 text-blue-800';
    } else {
      readinessMsg = '📚 More preparation needed — focus on all three domains, especially your weakest area below.';
      readinessBg = 'bg-amber-50 border-amber-200 text-amber-800';
    }

    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🏆</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Quiz Complete!</h2>
          <p className="text-slate-500 mb-6">Your OPRA readiness score</p>
          <div className="text-7xl font-black text-emerald-600 mb-2 tracking-tighter">{percentage}%</div>
          <p className="text-slate-600 font-medium mb-6">{totalScore} / {questions.length} correct</p>
          <div className={`rounded-2xl border p-4 text-sm font-medium ${readinessBg}`}>{readinessMsg}</div>
        </div>

        {/* Domain Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Score by Domain</h3>
          <div className="space-y-5">
            {domainStats.map(({ domain, correct, total, pct }) => {
              const c = DOMAIN_COLOURS[domain];
              return (
                <div key={domain}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold text-sm ${c.text}`}>{domain}</span>
                    <span className="text-slate-600 text-sm font-medium">{correct}/{total} &nbsp;({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className={`${c.bg} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gumroad Upsell Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Recommended for you
            </div>
            <h3 className="text-2xl font-extrabold mb-2">
              OPRA Pro Mock Test Pack
            </h3>
            <p className="text-slate-300 mb-2 text-sm leading-relaxed">
              Your weakest domain was <strong className="text-white">{weakestDomain.domain}</strong> ({weakestDomain.pct}%).
              The Pro Pack includes 3 full-length 120-question papers with detailed AMH-cited explanations — exactly what you need.
            </p>
            <ul className="text-sm text-slate-300 space-y-1 mb-6 mt-4">
              {[
                '3 × 120-question full papers (timed, 3 hrs each)',
                'Domain-wise score breakdown after each attempt',
                'Detailed AMH-referenced answer explanations',
                'Lifetime access + unlimited retakes',
                '30-day full refund guarantee',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <a
                href="https://gumroad.com/l/opra-pro-mock-test-pack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all text-center"
              >
                Get the Pro Pack — AUD $27
              </a>
              <span className="text-slate-400 text-xs">
                <s className="text-slate-500">AUD $49</s> &nbsp;Limited launch price
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-3">INR 1,499 option available at checkout via Razorpay</p>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Answer Review</h3>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const a = answers[idx];
              const isCorrect = a?.correct;
              const c = DOMAIN_COLOURS[q.domain];
              return (
                <div key={q.id} className={`rounded-2xl border p-5 ${isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-slate-800 font-semibold text-sm leading-snug">{idx + 1}. {q.question}</p>
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <p className="text-red-700 text-xs mb-1">
                      <span className="font-semibold">Your answer:</span> {q.options[a?.selected]}
                    </p>
                  )}
                  <p className="text-emerald-700 text-xs mb-3">
                    <span className="font-semibold">Correct answer:</span> {q.options[q.answer]}
                  </p>
                  <div className={`rounded-xl ${c.light} p-3 text-xs text-slate-700 leading-relaxed`}>
                    <span className={`font-bold ${c.text} text-xs uppercase tracking-wide`}>{q.domain} — </span>
                    <span dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pb-4">
          <button onClick={handleRetake} className="text-emerald-600 font-medium hover:underline text-sm">
            ↺ Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // ─── LEAD CAPTURE ──────────────────────────────────────────────────────────
  if (isQuizFinished && !isFormSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Almost there!</h2>
          <p className="text-slate-500 text-sm">
            Enter your details to reveal your full score, domain breakdown, and personalized clinical answer explanations.
          </p>
        </div>

        <form onSubmit={handleLeadSubmit} className="space-y-4">
          <div>
            <label htmlFor="quiz-name" className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="quiz-name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label htmlFor="quiz-email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="quiz-email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              placeholder="pharmacist@example.com"
            />
          </div>

          <div>
            <label htmlFor="quiz-phone" className="block text-sm font-semibold text-slate-700 mb-1">
              WhatsApp / Phone Number
            </label>
            <div className="flex gap-2">
              <select
                aria-label="Country calling code"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className="w-32 px-2.5 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {COUNTRY_CODES.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.code} ({c.name})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="quiz-phone"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quiz-target-state" className="block text-sm font-semibold text-slate-700 mb-1">
              Target Registration State
            </label>
            <select
              id="quiz-target-state"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
            >
              <option>Australia (VIC - Melbourne)</option>
              <option>Australia (NSW - Sydney)</option>
              <option>Australia (QLD - Brisbane)</option>
              <option>Australia (WA - Perth)</option>
              <option>Australia (SA - Adelaide)</option>
              <option>Australia (Other State/Territory)</option>
              <option>New Zealand</option>
            </select>
          </div>

          {formError && <p className="text-red-500 text-xs font-medium">{formError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-all text-base mt-2"
          >
            {isSubmitting ? 'Submitting & Analyzing...' : 'Reveal My Score & Review Answers →'}
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-4">
          🔒 Your details are 100% confidential. You&apos;ll also receive a free AMH study guide.
        </p>
      </div>
    );
  }

  // ─── ACTIVE QUIZ ───────────────────────────────────────────────────────────
  const question = questions[currentIdx];
  const progressPercentage = (currentIdx / questions.length) * 100;
  const domainColour = DOMAIN_COLOURS[question.domain];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress + Domain */}
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${domainColour.light} ${domainColour.text}`}>
          {question.domain}
        </span>
        <span className="text-sm text-slate-500 font-medium">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let style = "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md";
              let icon = null;

              if (selectedOption !== null) {
                if (idx === question.answer) {
                  style = "border-emerald-500 bg-emerald-50 text-emerald-800 cursor-default";
                  icon = <span className="text-emerald-600 font-bold text-lg ml-3">✓</span>;
                } else if (idx === selectedOption) {
                  style = "border-red-400 bg-red-50 text-red-800 cursor-default";
                  icon = <span className="text-red-500 font-bold text-lg ml-3">✗</span>;
                } else {
                  style = "border-slate-100 opacity-40 text-slate-400 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 font-medium transition-all duration-200 flex items-center justify-between ${style}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 rounded-2xl ${domainColour.light} border ${domainColour.border} p-5 text-sm text-slate-700 leading-relaxed`}>
              <p className={`font-bold ${domainColour.text} mb-1 text-xs uppercase tracking-wide`}>
                Explanation
              </p>
              <div className="space-y-2 [&_p]:mb-1 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: question.explanation }} />
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {currentIdx < questions.length - 1 ? 'Next Question →' : 'See My Results →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
