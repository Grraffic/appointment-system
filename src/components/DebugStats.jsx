import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DebugStats = () => {
  const [stats, setStats] = useState(null);
  const [debugData, setDebugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/stats`);
      setStats(response.data);
      console.log('Dashboard Stats:', response.data);
    } catch (err) {
      setError(`Stats Error: ${err.message}`);
      console.error('Stats fetch error:', err);
    }
    setLoading(false);
  };

  const fetchDebugData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/debug-appointments`);
      setDebugData(response.data);
      console.log('Debug Data:', response.data);
    } catch (err) {
      setError(`Debug Error: ${err.message}`);
      console.error('Debug fetch error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    fetchDebugData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">🔧 DEBUG: Morning/Afternoon Stats</h3>
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={fetchStats}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Refresh Stats
        </button>
        <button 
          onClick={fetchDebugData}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          Refresh Debug Data
        </button>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

      {stats && (
        <div className="mb-6">
          <h4 className="font-bold text-lg mb-2">📊 Current Stats:</h4>
          <div className="bg-gray-100 p-4 rounded">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-semibold">Overall Counts:</h5>
                <ul className="text-sm">
                  <li>Total: {stats.total}</li>
                  <li>Approved: {stats.APPROVED}</li>
                  <li>Pending: {stats.PENDING}</li>
                  <li>Completed: {stats.COMPLETED}</li>
                  <li>Rejected: {stats.REJECTED}</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-green-600">🌅 Morning Counts:</h5>
                <ul className="text-sm">
                  <li>Approved: {stats.morning?.APPROVED || 0}</li>
                  <li>Pending: {stats.morning?.PENDING || 0}</li>
                  <li>Completed: {stats.morning?.COMPLETED || 0}</li>
                  <li>Rejected: {stats.morning?.REJECTED || 0}</li>
                </ul>
                
                <h5 className="font-semibold text-orange-600 mt-2">🌇 Afternoon Counts:</h5>
                <ul className="text-sm">
                  <li>Approved: {stats.afternoon?.APPROVED || 0}</li>
                  <li>Pending: {stats.afternoon?.PENDING || 0}</li>
                  <li>Completed: {stats.afternoon?.COMPLETED || 0}</li>
                  <li>Rejected: {stats.afternoon?.REJECTED || 0}</li>
                </ul>
              </div>
            </div>

            {stats.timeSlots && Object.keys(stats.timeSlots).length > 0 && (
              <div>
                <h5 className="font-semibold mb-2">⏰ Time Slots Breakdown:</h5>
                <div className="text-sm">
                  {Object.entries(stats.timeSlots).map(([timeSlot, counts]) => (
                    <div key={timeSlot} className="mb-2 p-2 bg-white rounded border">
                      <strong>"{timeSlot}":</strong>
                      <span className="ml-2">
                        Total: {counts.total}, 
                        Approved: {counts.APPROVED}, 
                        Pending: {counts.PENDING}, 
                        Completed: {counts.COMPLETED}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {debugData && (
        <div>
          <h4 className="font-bold text-lg mb-2">🔍 Sample Appointments:</h4>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">Total appointments in database: <strong>{debugData.total}</strong></p>
            {debugData.sample && debugData.sample.length > 0 ? (
              <div className="text-sm">
                {debugData.sample.map((appointment, index) => (
                  <div key={index} className="mb-2 p-2 bg-white rounded border">
                    <div><strong>Transaction:</strong> {appointment.transactionNumber}</div>
                    <div><strong>Status:</strong> {appointment.status}</div>
                    <div><strong>Time Slot:</strong> "{appointment.timeSlot}"</div>
                    <div><strong>Email:</strong> {appointment.emailAddress}</div>
                    <div><strong>Date:</strong> {appointment.appointmentDate}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600">No appointments found in database!</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-100 rounded">
        <h5 className="font-semibold text-yellow-800">💡 Debugging Tips:</h5>
        <ul className="text-sm text-yellow-700 mt-1">
          <li>• Check if appointments have time slots with "AM" or "PM"</li>
          <li>• Morning should detect: "AM" or "MORNING" in time slot</li>
          <li>• Afternoon should detect: "PM" or "AFTERNOON" in time slot</li>
          <li>• If no appointments show, create a test appointment first</li>
        </ul>
      </div>
    </div>
  );
};

export default DebugStats;
