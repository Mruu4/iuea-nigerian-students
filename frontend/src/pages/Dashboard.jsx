import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle2, ShieldCheck, Wallet, Megaphone } from 'lucide-react';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl text-ink mb-1">
        Welcome, {user?.fullName?.split(' ')[0] || 'Member'}
      </h1>
      <p className="text-ink/50 mb-8">Here's what's happening in your community.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-ink/10 border-l-4 border-l-forest p-5 shadow-sm">
          <div className="flex items-center gap-2 text-ink/40 mb-2">
            <CheckCircle2 size={16} />
            <p className="text-xs uppercase tracking-wide font-medium">Account status</p>
          </div>
          <p className="font-display text-xl text-forest">Approved</p>
        </div>

        <div className="bg-white rounded-xl border border-ink/10 border-l-4 border-l-gold p-5 shadow-sm">
          <div className="flex items-center gap-2 text-ink/40 mb-2">
            <ShieldCheck size={16} />
            <p className="text-xs uppercase tracking-wide font-medium">Role</p>
          </div>
          <p className="font-display text-xl text-ink capitalize">{user?.role}</p>
        </div>

        <div className="bg-white rounded-xl border border-ink/10 border-l-4 border-l-ink/20 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-ink/40 mb-2">
            <Wallet size={16} />
            <p className="text-xs uppercase tracking-wide font-medium">Contributions</p>
          </div>
          <p className="font-display text-xl text-ink/40">Coming soon</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-ink/10 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone size={18} className="text-forest" />
          <h2 className="font-display text-lg text-ink">Announcements</h2>
        </div>
        <p className="text-ink/50 text-sm">No announcements yet. Check back soon.</p>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
