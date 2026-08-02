import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Phone, MessageCircle, Mail } from 'lucide-react';

function Leadership() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/leadership', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load leadership');
          return;
        }

        setLeaders(data);
      } catch (err) {
        setError('Could not connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Leadership</h1>
      <p className="text-ink/50 mb-8">Meet the team leading our community.</p>

      {loading && <p className="text-ink/50">Loading...</p>}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-2.5 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && !error && leaders.length === 0 && (
        <p className="text-ink/50">No leaders have been added yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {leaders.map((leader) => (
          <div key={leader._id} className="bg-white rounded-xl border border-ink/10 border-t-4 border-t-forest p-6 shadow-sm text-center">
            <div className="w-20 h-20 rounded-full bg-forest/10 border-2 border-forest/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              {leader.photo ? (
                <img src={leader.photo} alt={leader.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display text-2xl text-forest">{leader.fullName?.[0]}</span>
              )}
            </div>
            <h3 className="font-display text-lg text-ink">{leader.fullName}</h3>
            <p className="text-sm text-gold font-medium mb-4">{leader.position}</p>

            <div className="flex items-center justify-center gap-4 text-ink/40">
              {leader.phoneNumber && (
                <a href={`tel:${leader.phoneNumber}`} title="Call" className="hover:text-forest transition">
                  <Phone size={17} />
                </a>
              )}
              {leader.whatsapp && (
                <a href={`https://wa.me/${leader.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:text-forest transition">
                  <MessageCircle size={17} />
                </a>
              )}
              {leader.email && (
                <a href={`mailto:${leader.email}`} title="Email" className="hover:text-forest transition">
                  <Mail size={17} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Leadership;
