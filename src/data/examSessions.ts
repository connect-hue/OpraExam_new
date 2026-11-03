// APC Knowledge Stream schedule; registration cutoffs are Sydney time.
export const sessionSchedule = [
  {
    session: 'Nov 2026',
    fullName: 'November 2026',
    registrationDates: '18 Aug – 19 Oct 2026',
    registrationOpens: '2026-08-18T09:00:00+10:00', // AEST
    registrationCloses: '2026-10-19T17:00:00+11:00', // AEDT
    openingLabel: '18 Aug 2026',
    examDates: '23–25 Nov 2026',
    examEnds: '2026-11-25T23:59:59+11:00',
    resultsDate: '22 Dec 2026',
  },
  {
    session: 'Mar 2027',
    fullName: 'March 2027',
    registrationDates: '19 Jan – 22 Feb 2027',
    registrationOpens: '2027-01-19T09:00:00+11:00', // AEDT
    registrationCloses: '2027-02-22T17:00:00+11:00', // AEDT
    openingLabel: '19 Jan 2027',
    examDates: '22–24 Mar 2027',
    examEnds: '2027-03-24T23:59:59+11:00',
    resultsDate: '6 May 2027',
  },
  {
    session: 'Jul 2027',
    fullName: 'July 2027',
    registrationDates: '11 May – 28 Jun 2027',
    registrationOpens: '2027-05-11T09:00:00+10:00', // AEST
    registrationCloses: '2027-06-28T17:00:00+10:00', // AEST
    openingLabel: '11 May 2027',
    examDates: '26–28 Jul 2027',
    examEnds: '2027-07-28T23:59:59+10:00',
    resultsDate: '9 Sep 2027',
  },
  {
    session: 'Nov 2027',
    fullName: 'November 2027',
    registrationDates: '14 Sep – 11 Oct 2027',
    registrationOpens: '2027-09-14T09:00:00+10:00', // AEST
    registrationCloses: '2027-10-11T17:00:00+11:00', // AEDT
    openingLabel: '14 Sep 2027',
    examDates: '8–10 Nov 2027',
    examEnds: '2027-11-10T23:59:59+11:00',
    resultsDate: '23 Dec 2027',
  },
] as const;

export type ScheduledSession = (typeof sessionSchedule)[number];
export function registrationPhase(session: ScheduledSession, now = Date.now()): 'upcoming' | 'open' | 'closed' {
  if (now < Date.parse(session.registrationOpens)) return 'upcoming';
  return now <= Date.parse(session.registrationCloses) ? 'open' : 'closed';
}

const format = (iso: string) => new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' }).format(new Date(iso));
export const examSessions = sessionSchedule.map(session => ({
  session: session.fullName, year: Number(session.fullName.slice(-4)),
  registrationOpen: format(session.registrationOpens), registrationClose: format(session.registrationCloses),
  examDate: session.examDates, resultsDate: session.resultsDate, lastVerified: '2026-11-03',
  registrationOpens: session.registrationOpens, registrationCloses: session.registrationCloses,
}));
export type ExamSession = (typeof examSessions)[number];
export function getEffectiveSessionStatus(session: ExamSession, now = Date.now()): 'upcoming' | 'open' | 'closed' {
  if (now < Date.parse(session.registrationOpens)) return 'upcoming';
  return now <= Date.parse(session.registrationCloses) ? 'open' : 'closed';
}
