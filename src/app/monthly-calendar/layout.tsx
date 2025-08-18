import { AuthProvider } from '@/contexts/AuthContext';

export default function MonthlyCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
