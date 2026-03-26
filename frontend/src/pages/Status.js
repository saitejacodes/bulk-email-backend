import React, { useState, useEffect } from "react";
import { fetchEmails } from "../api";

function Status() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetchEmails().then(setEmails).catch(console.error);
        const interval = setInterval(() => {
            fetchEmails().then(setEmails).catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="status">
            <h1>Email History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((item) => (
                        <tr key={item._id}>
                            <td>{item.email}</td>
                            <td>
                                <span className={`status-badge ${item.status}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                    {emails.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>No logs found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Status;
