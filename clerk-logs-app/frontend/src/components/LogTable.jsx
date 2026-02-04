import React from 'react';

const LogTable = ({ data, type }) => {
    if (!data || data.length === 0) {
        return <div className="no-data">No data found</div>;
    }

    // Helper to safely access nested properties
    const getVal = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

    const renderUsersTable = () => (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Last Active</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user) => (
                    <tr key={user.id}>
                        <td className="mono">{user.id?.substring(0, 15)}...</td>
                        <td>
                            <div className="user-cell">
                                <img src={user.image_url} alt="profile" className="avatar" />
                                <span>{user.first_name || 'N/A'} {user.last_name || ''}</span>
                            </div>
                        </td>
                        <td>{user.email_addresses?.[0]?.email_address || 'N/A'}</td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>{new Date(user.last_sign_in_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderSessionsTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Session ID</th>
                    <th>User ID</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>Expires At</th>
                </tr>
            </thead>
            <tbody>
                {data.map((session) => (
                    <tr key={session.id}>
                        <td className="mono">{session.id}</td>
                        <td className="mono">{session.user_id}</td>
                        <td>
                            <span className={`status-badge ${session.status}`}>
                                {session.status}
                            </span>
                        </td>
                        <td>{new Date(session.last_active_at).toLocaleString()}</td>
                        <td>{new Date(session.expire_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderEventsTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Event ID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>User ID</th>
                    <th>Session ID</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {data.map((log) => (
                    <tr key={log.id}>
                        <td className="mono">{log.id}</td>
                        <td>{log.type}</td>
                        <td>{log.status}</td>
                        <td className="mono">{log.user_id}</td>
                        <td className="mono">{log.session_id}</td>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    if (type === 'users') return renderUsersTable();
    if (type === 'sessions') return renderSessionsTable();
    if (type === 'events') return renderEventsTable();

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default LogTable;
