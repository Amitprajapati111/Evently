import FormField from "./FormField";
import { PERFORMER_TYPES, TECHNICAL_REQUIREMENTS } from "../lib/formOptions";

export default function PerformerFields({ details, errors, onDetailChange, onArrayToggle }) {
  const technicalRequirements = details.technicalRequirements || [];
  return (
    <div className="field-grid">
      <FormField label="Performer type" inputId="performerType" required error={errors.performerType}>
        <select id="performerType" name="performerType" className="select" aria-invalid={Boolean(errors.performerType)} value={details.performerType || ""} onChange={onDetailChange}>
          <option value="">Select performer type</option>
          {PERFORMER_TYPES.map((type) => <option value={type} key={type}>{type}</option>)}
        </select>
      </FormField>
      <FormField label="Number of performers" inputId="numberOfPerformers" required error={errors.numberOfPerformers}>
        <input id="numberOfPerformers" name="numberOfPerformers" type="number" min="1" step="1" className="input" aria-invalid={Boolean(errors.numberOfPerformers)} value={details.numberOfPerformers ?? 1} onChange={onDetailChange} />
      </FormField>
      <FormField label="Performance duration" inputId="performanceDuration" required error={errors.performanceDuration}>
        <input id="performanceDuration" name="performanceDuration" type="number" min="1" step="1" className="input" aria-invalid={Boolean(errors.performanceDuration)} value={details.performanceDuration || ""} onChange={onDetailChange} placeholder="e.g. 90" />
        <p className="hint">Minutes</p>
      </FormField>
      <FormField label="Genre / style" inputId="genre" hint="Optional">
        <input id="genre" name="genre" className="input" value={details.genre || ""} onChange={onDetailChange} placeholder="e.g. Bollywood, EDM" />
      </FormField>
      <FormField label="Minimum budget" inputId="budgetMin" error={errors.budgetMin} hint="Optional, in INR">
        <input id="budgetMin" name="budgetMin" type="number" min="0" step="1" className="input" aria-invalid={Boolean(errors.budgetMin)} value={details.budgetMin || ""} onChange={onDetailChange} placeholder="e.g. 10000" />
      </FormField>
      <FormField label="Maximum budget" inputId="budgetMax" error={errors.budgetMax} hint="Optional, in INR">
        <input id="budgetMax" name="budgetMax" type="number" min="0" step="1" className="input" aria-invalid={Boolean(errors.budgetMax)} value={details.budgetMax || ""} onChange={onDetailChange} placeholder="e.g. 25000" />
      </FormField>
      <div className="choice-section field full">
        <span className="section-label">Technical requirements <span className="hint">(optional)</span></span>
        <div className="check-grid" role="group">
          {TECHNICAL_REQUIREMENTS.map((requirement) => (
            <label className="check-label" key={requirement}>
              <input type="checkbox" checked={technicalRequirements.includes(requirement)} onChange={() => onArrayToggle("technicalRequirements", requirement)} />
              {requirement}
            </label>
          ))}
        </div>
      </div>
      <FormField label="Additional requirements" inputId="additionalRequirements" error={errors.additionalRequirements} className="full">
        <textarea id="additionalRequirements" name="additionalRequirements" className="textarea" aria-invalid={Boolean(errors.additionalRequirements)} value={details.additionalRequirements || ""} onChange={onDetailChange} maxLength="1000" placeholder="Share artist preferences, timing, or other important details." />
        <p className="character-count">{(details.additionalRequirements || "").length}/1000</p>
      </FormField>
    </div>
  );
}
