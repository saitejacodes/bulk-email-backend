const API_URL = import.meta.env.VITE_API_URL || "https://email-service-pd5h.onrender.com";

export async function sendEmails(formData) {
  const res = await fetch(`${API_URL}/send`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to send emails");
  }
  return res.json();
}

export async function fetchEmails() {
  const res = await fetch(`${API_URL}/emails`);
  if (!res.ok) throw new Error("Failed to fetch emails");
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
