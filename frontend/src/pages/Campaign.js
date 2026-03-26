import React, { useState } from "react";
import { sendEmails } from "../api";

function Campaign() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a CSV file");
            return;
        }
        setStatus("Sending...");
        try {
            const formData = new FormData();
            formData.append("subject", subject);
            formData.append("message", message);
            formData.append("csv", file);

            await sendEmails(formData);
            setStatus("Emails queued successfully!");
            setSubject("");
            setMessage("");
            setFile(null);
            // Reset file input manually
            e.target.reset();
        } catch (err) {
            setStatus("Error: " + err.message);
        }
    };

    return (
        <div className="campaign">
            <h1>Send Email</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="Email Subject"
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Email Content"
                        rows="5"
                    />
                </div>
                <div className="form-group">
                    <label>CSV File (One email per line)</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="send-btn">Send</button>
            </form>
            {status && <p className="status-msg">{status}</p>}
        </div>
    );
}

export default Campaign;
