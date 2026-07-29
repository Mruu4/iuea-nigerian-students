import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NigerianFlag from '../components/NigerianFlag';
import coatOfArms from '../assets/coat-of-arms.png';
import iueaLogo from '../assets/iuea-logo.png';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white px-4 py-12 font-body">
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-forest" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-forest" />
      </div>
      <div className="absolute inset-0 bg-white/10" />

      <NigerianFlag className="absolute top-[8%] left-[6%] w-20 h-auto opacity-70 shadow-lg animate-drift-1 rounded" />
      <NigerianFlag className="absolute top-[15%] right-[10%] w-14 h-auto opacity-60 shadow-lg animate-drift-2 rounded" />
      <NigerianFlag className="absolute bottom-[12%] left-[12%] w-16 h-auto opacity-60 shadow-lg animate-drift-3 rounded" />
      <NigerianFlag className="absolute bottom-[8%] right-[8%] w-24 h-auto opacity-70 shadow-lg animate-drift-4 rounded" />
      <NigerianFlag className="absolute top-[45%] left-[3%] w-12 h-auto opacity-50 shadow-lg animate-drift-2 rounded" />
      <NigerianFlag className="absolute top-[50%] right-[4%] w-14 h-auto opacity-50 shadow-lg animate-drift-3 rounded" />

      <div className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur-sm border border-forest/20 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={coatOfArms} alt="Coat of Arms of Nigeria" className="w-12 h-auto" />
            <div className="w-px h-10 bg-ink/15" />
            <img src={iueaLogo} alt="IUEA Logo" className="w-12 h-auto" />
          </div>
          <h1 className="font-display text-2xl text-ink">Nigerian Students at IUEA</h1>
        </div>

        <h2 className="font-display text-xl text-ink mb-1">Create an account</h2>
        <p className="text-ink/50 text-sm mb-6">Join the community</p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-2.5 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-forest/10 text-forest-dark border border-forest/20 px-4 py-2.5 rounded-lg mb-5 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-white border border-ink/15 rounded-lg px-3.5 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white border border-ink/15 rounded-lg px-3.5 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full bg-white border border-ink/15 rounded-lg px-3.5 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-white font-semibold py-2.5 rounded-lg hover:bg-forest-dark transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-ink/50 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-forest font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
