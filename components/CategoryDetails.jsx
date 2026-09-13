import PlannerFields from "./PlannerFields";
import PerformerFields from "./PerformerFields";
import CrewFields from "./CrewFields";
import { categoryLabel } from "../lib/formState";

export default function CategoryDetails({ formData, errors, onDetailChange, onArrayToggle }) {
  if (!formData.category) return null;

  const sharedProps = { details: formData.categoryDetails, errors, onDetailChange, onArrayToggle };
  const content = {
    planner: <PlannerFields {...sharedProps} />,
    performer: <PerformerFields {...sharedProps} />,
    crew: <CrewFields {...sharedProps} />,
  }[formData.category];

  return (
    <>
      <h2 className="form-heading">Tell us about the {categoryLabel(formData.category).toLowerCase()} requirement</h2>
      <p className="form-description">These details make it easier to match you with the right event professionals.</p>
      {content}
    </>
  );
}
