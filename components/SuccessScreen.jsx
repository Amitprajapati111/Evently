import { categoryLabel, formatEventDate } from "../lib/formState";

export default function SuccessScreen({ formData, onReset }) {
  return (
    <div className="success-card" role="status">
      <div className="success-icon" aria-hidden="true">✓</div>
      <h2>Requirement Submitted Successfully</h2>
      <p>Your event requirement has been submitted successfully. Our team can now use these details to find the right professionals.</p>
      <div className="success-summary" aria-label="Submitted requirement summary">
        <div><span>Event name</span><strong>{formData.eventName}</strong></div>
        <div><span>Category</span><strong>{categoryLabel(formData.category)}</strong></div>
        <div><span>Event date</span><strong>{formatEventDate(formData.startDate, formData.endDate)}</strong></div>
      </div>
      <button type="button" className="button button-primary" onClick={onReset}>Create Another Requirement</button>
    </div>
  );
}
