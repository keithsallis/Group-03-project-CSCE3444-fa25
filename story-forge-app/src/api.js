const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

export async function generateStory(payload) {
  const res = await fetch(`${API_BASE}/generate_story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || errData.error || `HTTP ${res.status}`);
  }

  return res.json();
}
