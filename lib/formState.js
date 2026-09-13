export const initialFormData = {
  eventName: "",
  eventType: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",
  categoryDetails: {},
};

export function categoryLabel(category) {
  return { planner: "Event Planner", performer: "Performer", crew: "Crew" }[category] || "Requirement";
}

export function formatEventDate(startDate, endDate) {
  if (!startDate) return "—";
  const options = { day: "numeric", month: "short", year: "numeric" };
  const start = new Date(`${startDate}T00:00:00`).toLocaleDateString("en-IN", options);
  const end = new Date(`${(endDate || startDate)}T00:00:00`).toLocaleDateString("en-IN", options);
  return start === end ? start : `${start} – ${end}`;
}
