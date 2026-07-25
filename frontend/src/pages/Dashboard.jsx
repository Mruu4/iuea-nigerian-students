import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-green-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <p>Welcome, {user?.fullName || 'Member'} 👋</p>
        <p className="text-sm text-gray-500 mt-1">Role: {user?.role}</p>
      </div>
    </div>
  );
}

export default Dashboard;
