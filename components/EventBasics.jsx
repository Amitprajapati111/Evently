import FormField from "./FormField";
import { EVENT_TYPES } from "../lib/formOptions";

export default function EventBasics({ formData, errors, onChange }) {
  return (
    <>
      <h2 className="form-heading">Start with the event details</h2>
      <p className="form-description">A few essentials help professionals understand your event at a glance.</p>
      <div className="field-grid">
        <FormField label="Event name" inputId="eventName" required error={errors.eventName} className="full">
          <input id="eventName" name="eventName" className="input" aria-invalid={Boolean(errors.eventName)} value={formData.eventName} onChange={onChange} placeholder="e.g. College Annual Fest 2026" maxLength="100" autoComplete="off" />
        </FormField>
        <FormField label="Event type" inputId="eventType" required error={errors.eventType}>
          <select id="eventType" name="eventType" className="select" aria-invalid={Boolean(errors.eventType)} value={formData.eventType} onChange={onChange}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((type) => <option value={type} key={type}>{type}</option>)}
          </select>
        </FormField>
        <FormField label="Location" inputId="location" required error={errors.location}>
          <input id="location" name="location" className="input" aria-invalid={Boolean(errors.location)} value={formData.location} onChange={onChange} placeholder="e.g. Greater Noida, Uttar Pradesh" autoComplete="address-level2" />
        </FormField>
        <FormField label="Start date" inputId="startDate" required error={errors.startDate}>
          <input id="startDate" name="startDate" type="date" className="input" aria-invalid={Boolean(errors.startDate)} value={formData.startDate} onChange={onChange} />
        </FormField>
        <FormField label="End date" inputId="endDate" required error={errors.endDate} hint="For a one-day event, use the same date.">
          <input id="endDate" name="endDate" type="date" className="input" aria-invalid={Boolean(errors.endDate)} value={formData.endDate} onChange={onChange} min={formData.startDate || undefined} />
        </FormField>
        <FormField label="Venue" inputId="venue" hint="Optional">
          <input id="venue" name="venue" className="input" value={formData.venue} onChange={onChange} placeholder="e.g. NIET Auditorium" autoComplete="off" />
        </FormField>
      </div>
    </>
  );
}
