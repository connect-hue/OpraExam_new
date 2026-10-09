import { redirect } from 'next/navigation';
import { isAuthenticatedAdmin } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
