import React, { useState, useEffect } from "react";
import { fetchStats } from "../api";

function Dashboard() {
    const [stats, setStats] = useState({ total: 0, sent: 0, pending: 0, failed: 0 });

    useEffect(() => {
        fetchStats().then(setStats).catch(console.error);
        const interval = setInterval(() => {
            fetchStats().then(setStats).catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Emails</h3>
                    <p>{stats.total}</p>
                </div>
                <div className="stat-card sent">
                    <h3>Sent</h3>
                    <p>{stats.sent}</p>
                </div>
                <div className="stat-card pending">
                    <h3>Pending</h3>
                    <p>{stats.pending}</p>
                </div>
                <div className="stat-card failed">
                    <h3>Failed</h3>
                    <p>{stats.failed}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
