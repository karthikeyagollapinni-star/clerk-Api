import { useState, useEffect } from 'react'


import LogTable from './components/LogTable';

function App() {
  const [view, setView] = useState('users');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:9090/api';

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'users') fetchData('users');
    else if (view === 'sessions') fetchData('logs/sessions');
    else if (view === 'events') fetchData('logs/events');
  }, [view]);

  return (
    <div className="container">
      <nav className="sidebar">
        <h2>Clerk Viewer</h2>
        <button className={view === 'users' ? 'active' : ''} onClick={() => setView('users')}>Users</button>
        <button className={view === 'sessions' ? 'active' : ''} onClick={() => setView('sessions')}>Session Logs</button>
        <button className={view === 'events' ? 'active' : ''} onClick={() => setView('events')}>Event Logs</button>
      </nav>
      <main className="content">
        <header>
          <h1>{view === 'users' ? 'Registered Users' : view === 'sessions' ? 'Active Sessions' : 'Audit Logs'}</h1>
        </header>
        <div className="data-display">
          {loading && <div className="loader">Loading...</div>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && data && (
            <pre className="json-view">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
