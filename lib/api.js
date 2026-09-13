const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createRequirement(data) {
  const response = await fetch(`${API_URL}/api/requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.success) throw new Error(payload.message || "Unable to submit your requirement.");
  return payload;
}
