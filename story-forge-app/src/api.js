const API_BASE = import.meta.env.VITE_API_URL;

export async function generateStory(payload) {
  const res = await fetch(`${API_BASE}/generate_story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
