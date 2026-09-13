import FormField from "./FormField";
import { PLANNING_TYPES, PLANNER_SERVICES } from "../lib/formOptions";

export default function PlannerFields({ details, errors, onDetailChange, onArrayToggle }) {
  const services = details.services || [];
  return (
    <div className="field-grid">
      <FormField label="Planning type" inputId="planningType" required error={errors.planningType}>
        <select id="planningType" name="planningType" className="select" aria-invalid={Boolean(errors.planningType)} value={details.planningType || ""} onChange={onDetailChange}>
          <option value="">Select planning type</option>
          {PLANNING_TYPES.map((type) => <option value={type} key={type}>{type}</option>)}
        </select>
      </FormField>
      <FormField label="Expected guest count" inputId="guestCount" required error={errors.guestCount}>
        <input id="guestCount" name="guestCount" type="number" min="1" step="1" className="input" aria-invalid={Boolean(errors.guestCount)} value={details.guestCount || ""} onChange={onDetailChange} placeholder="e.g. 250" />
      </FormField>
      <FormField label="Estimated budget" inputId="budget" error={errors.budget} hint="Optional, in INR">
        <input id="budget" name="budget" type="number" min="0" step="1" className="input" aria-invalid={Boolean(errors.budget)} value={details.budget || ""} onChange={onDetailChange} placeholder="e.g. 100000" />
      </FormField>
      <div aria-hidden="true" />
      <div className="choice-section field full">
        <span className="section-label">Services required <span className="required">*</span></span>
        <div className="check-grid" role="group" aria-describedby={errors.services ? "services-error" : undefined}>
          {PLANNER_SERVICES.map((service) => (
            <label className="check-label" key={service}>
              <input type="checkbox" checked={services.includes(service)} onChange={() => onArrayToggle("services", service)} />
              {service}
            </label>
          ))}
        </div>
        {errors.services && <p id="services-error" className="field-error" role="alert">{errors.services}</p>}
      </div>
      <FormField label="Additional requirements" inputId="additionalRequirements" error={errors.additionalRequirements} className="full">
        <textarea id="additionalRequirements" name="additionalRequirements" className="textarea" aria-invalid={Boolean(errors.additionalRequirements)} value={details.additionalRequirements || ""} onChange={onDetailChange} maxLength="1000" placeholder="Share any other details that will help the planner prepare." />
        <p className="character-count">{(details.additionalRequirements || "").length}/1000</p>
      </FormField>
    </div>
  );
}
