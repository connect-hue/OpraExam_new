export interface AuthorProfile {
  id: string; name: string; type: 'Person' | 'Organization'; bio: string;
  credentials?: string; registrationUrl?: string;
}

// Add individual records only after identity and credentials have been verified.
export const authors: AuthorProfile[] = [{
  id: 'editorial-team', name: 'OPRAExam.in Editorial Team', type: 'Organization',
  bio: 'The editorial team maintains independent OPRA examination guides and practice resources. Check official examination and registration requirements with the relevant authority.',
}];

export function getAuthor(id?: string): AuthorProfile | undefined {
  return authors.find(author => author.id === id);
}
