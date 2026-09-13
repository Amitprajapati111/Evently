import { categoryLabel, formatEventDate } from "../lib/formState";

function DisplayRows({ rows }) {
  return (
    <dl className="review-list">
      {rows.map(([label, value]) => (
        <div className="review-row" key={label}>
          <dt>{label}</dt>
          <dd>{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function joinValues(values) {
  return values?.length ? values.join(", ") : "Not specified";
}

function formatBudget(value) {
  return value === "" || value === undefined ? "Not specified" : `₹${Number(value).toLocaleString("en-IN")}`;
}

function requirementRows(category, details) {
  if (category === "planner") return [
    ["Planning type", details.planningType],
    ["Expected guest count", details.guestCount],
    ["Estimated budget", formatBudget(details.budget)],
    ["Services required", joinValues(details.services)],
    ["Additional requirements", details.additionalRequirements || "Not specified"],
  ];
  if (category === "performer") return [
    ["Performer type", details.performerType],
    ["Number of performers", details.numberOfPerformers],
    ["Performance duration", details.performanceDuration ? `${details.performanceDuration} minutes` : ""],
    ["Genre / style", details.genre || "Not specified"],
    ["Budget range", details.budgetMin || details.budgetMax ? `${formatBudget(details.budgetMin)} – ${formatBudget(details.budgetMax)}` : "Not specified"],
    ["Technical requirements", joinValues(details.technicalRequirements)],
    ["Additional requirements", details.additionalRequirements || "Not specified"],
  ];
  return [
    ["Crew types", joinValues(details.crewTypes)],
    ["Number of crew members", details.numberOfCrewMembers],
    ["Working hours", details.startTime && details.endTime ? `${details.startTime} – ${details.endTime}` : ""],
    ["Equipment required", joinValues(details.equipmentRequired)],
    ["Additional requirements", details.additionalRequirements || "Not specified"],
  ];
}

export default function ReviewStep({ formData }) {
  const details = formData.categoryDetails || {};
  const categoryName = categoryLabel(formData.category) || "Requirement";

  return (
    <>
      <h2 className="form-heading">Review your requirement</h2>
      <p className="form-description">Please check everything below before submitting. You can go back to make any changes.</p>
      <section className="review-section" aria-labelledby="event-details-title">
        <h3 id="event-details-title" className="review-title">EVENT DETAILS</h3>
        <DisplayRows rows={[
          ["Event name", formData.eventName],
          ["Event type", formData.eventType],
          ["Event date", formatEventDate(formData.startDate, formData.endDate)],
          ["Location", formData.location],
          ["Venue", formData.venue || "Not specified"],
        ]} />
      </section>
      <section className="review-section" aria-labelledby="requirement-details-title">
        <h3 id="requirement-details-title" className="review-title">REQUIREMENT · {categoryName.toUpperCase()}</h3>
        <DisplayRows rows={requirementRows(formData.category, details)} />
      </section>
    </>
  );
}
