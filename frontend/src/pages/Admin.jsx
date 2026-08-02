import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Check, Trash2, Plus, Upload } from 'lucide-react';

const API = 'http://localhost:5000/api';

function Admin() {
  const token = localStorage.getItem('token');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newLeader, setNewLeader] = useState({
    fullName: '',
    position: '',
    phoneNumber: '',
    whatsapp: '',
    email: '',
  });
  const [newLeaderFile, setNewLeaderFile] = useState(null);
  const [creating, setCreating] = useState(false);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const loadData = async () => {
    try {
      const [pendingRes, leadersRes] = await Promise.all([
        fetch(`${API}/admin/pending-users`, { headers: authHeaders }),
        fetch(`${API}/leadership`, { headers: authHeaders }),
      ]);
      const pendingData = await pendingRes.json();
      const leadersData = await leadersRes.json();
      setPendingUsers(pendingData);
      setLeaders(leadersData);
    } catch (err) {
      setError('Could not load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const approveUser = async (id) => {
    await fetch(`${API}/admin/approve/${id}`, {
      method: 'PUT',
      headers: authHeaders,
    });
    loadData();
  };

  const deleteLeader = async (id) => {
    await fetch(`${API}/leadership/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    loadData();
  };

  const handleCreateLeader = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      let photoUrl = '';

      if (newLeaderFile) {
        const formData = new FormData();
        formData.append('image', newLeaderFile);
        const uploadRes = await fetch(`${API}/upload`, {
          method: 'POST',
          headers: authHeaders,
          body: formData,
        });
        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      }

      await fetch(`${API}/leadership`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newLeader, photo: photoUrl, order: leaders.length }),
      });

      setNewLeader({ fullName: '', position: '', phoneNumber: '', whatsapp: '', email: '' });
      setNewLeaderFile(null);
      loadData();
    } catch (err) {
      setError('Failed to create leader');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-ink/50">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Admin</h1>
      <p className="text-ink/50 mb-8">Manage members and leadership.</p>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-2.5 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Pending approvals */}
      <div className="bg-white rounded-xl border border-ink/10 p-6 shadow-sm mb-8">
        <h2 className="font-display text-lg text-ink mb-4">Pending Approvals</h2>
        {pendingUsers.length === 0 ? (
          <p className="text-ink/40 text-sm">No pending users.</p>
        ) : (
          <div className="space-y-3">
            {pendingUsers.map((u) => (
              <div key={u._id} className="flex items-center justify-between border border-ink/10 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{u.fullName}</p>
                  <p className="text-xs text-ink/40">{u.email}</p>
                </div>
                <button
                  onClick={() => approveUser(u._id)}
                  className="flex items-center gap-1.5 text-sm bg-forest text-white px-3 py-1.5 rounded-lg hover:bg-forest-dark transition"
                >
                  <Check size={15} />
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leadership management */}
      <div className="bg-white rounded-xl border border-ink/10 p-6 shadow-sm">
        <h2 className="font-display text-lg text-ink mb-4">Leadership</h2>

        <div className="space-y-3 mb-6">
          {leaders.map((l) => (
            <div key={l._id} className="flex items-center justify-between border border-ink/10 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest/10 flex items-center justify-center overflow-hidden shrink-0">
                  {l.photo ? (
                    <img src={l.photo} alt={l.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display text-sm text-forest">{l.fullName?.[0]}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{l.fullName}</p>
                  <p className="text-xs text-gold">{l.position}</p>
                </div>
              </div>
              <button
                onClick={() => deleteLeader(l._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleCreateLeader} className="border-t border-ink/10 pt-5">
          <p className="text-sm font-medium text-ink mb-3 flex items-center gap-1.5">
            <Plus size={16} /> Add a leader
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Full name"
              value={newLeader.fullName}
              onChange={(e) => setNewLeader({ ...newLeader, fullName: e.target.value })}
              required
              className="border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
            <input
              type="text"
              placeholder="Position"
              value={newLeader.position}
              onChange={(e) => setNewLeader({ ...newLeader, position: e.target.value })}
              required
              className="border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={newLeader.phoneNumber}
              onChange={(e) => setNewLeader({ ...newLeader, phoneNumber: e.target.value })}
              className="border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
            <input
              type="text"
              placeholder="WhatsApp number"
              value={newLeader.whatsapp}
              onChange={(e) => setNewLeader({ ...newLeader, whatsapp: e.target.value })}
              className="border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
            <input
              type="email"
              placeholder="Email"
              value={newLeader.email}
              onChange={(e) => setNewLeader({ ...newLeader, email: e.target.value })}
              className="border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/40 sm:col-span-2"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/60 border border-dashed border-ink/20 rounded-lg px-3 py-2.5 cursor-pointer hover:border-forest/50 transition mb-4 w-full">
            <Upload size={16} />
            {newLeaderFile ? newLeaderFile.name : 'Choose a photo (optional)'}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewLeaderFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            disabled={creating}
            className="bg-forest text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-forest-dark transition disabled:opacity-50"
          >
            {creating ? 'Adding…' : 'Add leader'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Admin;
