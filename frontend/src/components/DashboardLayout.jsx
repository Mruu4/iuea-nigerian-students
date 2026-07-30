import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, ShieldCheck, LogOut, Menu, X } from 'lucide-react';
import coatOfArms from '../assets/coat-of-arms.png';

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Leadership', path: '/leadership', icon: Users },
    { label: 'Profile', path: '/profile', icon: UserCircle },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin', path: '/admin', icon: ShieldCheck });
  }

  const currentLabel = navItems.find((i) => i.path === location.pathname)?.label || 'Dashboard';

  const SidebarContent = (
    <>
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <img src={coatOfArms} alt="" className="w-9 h-auto" />
        <div>
          <p className="font-display text-base leading-tight">Nigerian Students</p>
          <p className="text-xs text-gold-light tracking-wide">AT IUEA</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-display text-gold-light text-sm shrink-0">
            {user?.fullName?.[0] || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.fullName}</p>
            <p className="text-xs text-white/40 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-paper font-body">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-ink text-white shrink-0">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full bg-ink text-white flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-ink/10 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-ink/60 hover:text-ink"
            >
              <Menu size={22} />
            </button>
            <h2 className="font-display text-lg text-ink">{currentLabel}</h2>
          </div>
          <p className="text-xs font-mono text-ink/40 hidden sm:block">
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </header>
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
