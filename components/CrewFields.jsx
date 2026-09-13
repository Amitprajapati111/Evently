import FormField from "./FormField";
import { CREW_TYPES, EQUIPMENT } from "../lib/formOptions";

export default function CrewFields({ details, errors, onDetailChange, onArrayToggle }) {
  const crewTypes = details.crewTypes || [];
  const equipmentRequired = details.equipmentRequired || [];
  return (
    <div className="field-grid">
      <div className="choice-section field full">
        <span className="section-label">Crew type <span className="required">*</span></span>
        <div className="check-grid" role="group" aria-describedby={errors.crewTypes ? "crew-types-error" : undefined}>
          {CREW_TYPES.map((type) => (
            <label className="check-label" key={type}>
              <input type="checkbox" checked={crewTypes.includes(type)} onChange={() => onArrayToggle("crewTypes", type)} />
              {type}
            </label>
          ))}
        </div>
        {errors.crewTypes && <p id="crew-types-error" className="field-error" role="alert">{errors.crewTypes}</p>}
      </div>
      <FormField label="Number of crew members" inputId="numberOfCrewMembers" required error={errors.numberOfCrewMembers}>
        <input id="numberOfCrewMembers" name="numberOfCrewMembers" type="number" min="1" step="1" className="input" aria-invalid={Boolean(errors.numberOfCrewMembers)} value={details.numberOfCrewMembers || ""} onChange={onDetailChange} placeholder="e.g. 3" />
      </FormField>
      <div aria-hidden="true" />
      <FormField label="Working start time" inputId="startTime" required error={errors.startTime}>
        <input id="startTime" name="startTime" type="time" className="input" aria-invalid={Boolean(errors.startTime)} value={details.startTime || ""} onChange={onDetailChange} />
      </FormField>
      <FormField label="Working end time" inputId="endTime" required error={errors.endTime}>
        <input id="endTime" name="endTime" type="time" className="input" aria-invalid={Boolean(errors.endTime)} value={details.endTime || ""} onChange={onDetailChange} />
      </FormField>
      <div className="choice-section field full">
        <span className="section-label">Equipment required <span className="hint">(optional)</span></span>
        <div className="check-grid" role="group">
          {EQUIPMENT.map((item) => (
            <label className="check-label" key={item}>
              <input type="checkbox" checked={equipmentRequired.includes(item)} onChange={() => onArrayToggle("equipmentRequired", item)} />
              {item}
            </label>
          ))}
        </div>
      </div>
      <FormField label="Additional requirements" inputId="additionalRequirements" error={errors.additionalRequirements} className="full">
        <textarea id="additionalRequirements" name="additionalRequirements" className="textarea" aria-invalid={Boolean(errors.additionalRequirements)} value={details.additionalRequirements || ""} onChange={onDetailChange} maxLength="1000" placeholder="Share any access, shift, or setup details the crew should know." />
        <p className="character-count">{(details.additionalRequirements || "").length}/1000</p>
      </FormField>
    </div>
  );
}
