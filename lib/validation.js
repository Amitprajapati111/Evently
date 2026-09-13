const hasPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
const hasNonNegativeNumber = (value) => value === "" || value === undefined || (Number.isFinite(Number(value)) && Number(value) >= 0);

function validateAdditionalRequirements(details, errors) {
  if ((details.additionalRequirements || "").length > 1000) {
    errors.additionalRequirements = "Please keep additional requirements to 1,000 characters or fewer.";
  }
}

export function validateStep(step, formData) {
  const errors = {};
  const details = formData.categoryDetails || {};

  if (step === 1) {
    const name = formData.eventName.trim();
    if (!name) errors.eventName = "Event name is required.";
    else if (name.length < 3) errors.eventName = "Event name must be at least 3 characters.";
    else if (name.length > 100) errors.eventName = "Event name must be 100 characters or fewer.";
    if (!formData.eventType) errors.eventType = "Please select an event type.";
    if (!formData.startDate) errors.startDate = "Start date is required.";
    if (!formData.endDate) errors.endDate = "End date is required.";
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      errors.endDate = "End date cannot be before the start date.";
    }
    if (!formData.location.trim()) errors.location = "Location is required.";
  }

  if (step === 2 && !formData.category) errors.category = "Please select a requirement category.";

  if (step === 3) {
    if (formData.category === "planner") {
      if (!details.planningType) errors.planningType = "Please choose a planning type.";
      if (!hasPositiveNumber(details.guestCount)) errors.guestCount = "Expected guest count must be greater than 0.";
      if (!hasNonNegativeNumber(details.budget)) errors.budget = "Budget cannot be negative.";
      if (!Array.isArray(details.services) || details.services.length === 0) errors.services = "Select at least one service.";
    }
    if (formData.category === "performer") {
      if (!details.performerType) errors.performerType = "Please select a performer type.";
      if (!hasPositiveNumber(details.numberOfPerformers)) errors.numberOfPerformers = "Number of performers must be greater than 0.";
      if (!hasPositiveNumber(details.performanceDuration)) errors.performanceDuration = "Duration must be greater than 0 minutes.";
      if (!hasNonNegativeNumber(details.budgetMin)) errors.budgetMin = "Minimum budget cannot be negative.";
      if (!hasNonNegativeNumber(details.budgetMax)) errors.budgetMax = "Maximum budget cannot be negative.";
      if (details.budgetMin !== "" && details.budgetMax !== "" && Number(details.budgetMax) < Number(details.budgetMin)) {
        errors.budgetMax = "Maximum budget cannot be lower than minimum budget.";
      }
    }
    if (formData.category === "crew") {
      if (!Array.isArray(details.crewTypes) || details.crewTypes.length === 0) errors.crewTypes = "Select at least one crew type.";
      if (!hasPositiveNumber(details.numberOfCrewMembers)) errors.numberOfCrewMembers = "Number of crew members must be greater than 0.";
      if (!details.startTime) errors.startTime = "Start time is required.";
      if (!details.endTime) errors.endTime = "End time is required.";
      if (details.startTime && details.endTime && details.endTime <= details.startTime) errors.endTime = "End time must be after the start time.";
    }
    validateAdditionalRequirements(details, errors);
  }

  return errors;
}

export function validateCompleteForm(formData) {
  return [1, 2, 3].reduce((allErrors, step) => ({ ...allErrors, ...validateStep(step, formData) }), {});
}
