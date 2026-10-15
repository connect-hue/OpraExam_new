import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal | OPRA Exam Guide',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
