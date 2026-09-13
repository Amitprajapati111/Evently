"use client";

import { useState } from "react";
import { createRequirement } from "../lib/api";
import { initialFormData } from "../lib/formState";
import { validateCompleteForm, validateStep } from "../lib/validation";
import StepIndicator from "./StepIndicator";
import EventBasics from "./EventBasics";
import CategorySelector from "./CategorySelector";
import CategoryDetails from "./CategoryDetails";
import ReviewStep from "./ReviewStep";
import SuccessScreen from "./SuccessScreen";

const freshFormData = () => ({ ...initialFormData, categoryDetails: {} });

export default function RequirementForm() {
  const [formData, setFormData] = useState(freshFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleCategoryChange(category) {
    if (category === formData.category) return;
    const categoryDetails = category === "performer" ? { numberOfPerformers: 1 } : {};
    setFormData((previous) => ({ ...previous, category, categoryDetails }));
    setErrors({});
  }

  function handleDetailChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      categoryDetails: { ...previous.categoryDetails, [name]: value },
    }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleArrayToggle(name, value) {
    setFormData((previous) => {
      const selected = previous.categoryDetails[name] || [];
      const nextValues = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
      return { ...previous, categoryDetails: { ...previous.categoryDetails, [name]: nextValues } };
    });
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleNext(event) {
    event.preventDefault();
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setCurrentStep((step) => step + 1);
  }

  function handleBack(event) {
    event.preventDefault();
    setSubmitError("");
    setCurrentStep((step) => Math.max(1, step - 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    const completeErrors = validateCompleteForm(formData);
    if (Object.keys(completeErrors).length > 0) {
      setErrors(completeErrors);
      const invalidStep = [1, 2, 3].find((step) => Object.keys(validateStep(step, formData)).length > 0);
      setCurrentStep(invalidStep || 1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await createRequirement(formData);
      setSubmitSuccess(true);
    } catch {
      setSubmitError("Something went wrong while submitting your requirement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData(freshFormData());
    setCurrentStep(1);
    setErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
  }

  if (submitSuccess) {
    return <section className="form-card"><SuccessScreen formData={formData} onReset={handleReset} /></section>;
  }

  const stepContent = {
    1: <EventBasics formData={formData} errors={errors} onChange={handleChange} />,
    2: <CategorySelector category={formData.category} error={errors.category} onCategoryChange={handleCategoryChange} />,
    3: <CategoryDetails formData={formData} errors={errors} onDetailChange={handleDetailChange} onArrayToggle={handleArrayToggle} />,
    4: <ReviewStep formData={formData} />,
  }[currentStep];

  return (
    <section className="form-card" aria-label="Post an event requirement">
      <StepIndicator currentStep={currentStep} />
      <form className="form-content" onSubmit={handleSubmit} noValidate>
        {stepContent}
        {submitError && <p className="submit-error" role="alert">{submitError}</p>}
        <div className={`action-row ${currentStep === 1 ? "end" : ""}`}>
          {currentStep > 1 && <button type="button" className="button button-secondary" onClick={handleBack} disabled={isSubmitting}>← Back</button>}
          {currentStep < 4 ? (
            <button type="button" className="button button-primary" onClick={handleNext}>Continue →</button>
          ) : (
            <button type="submit" className="button button-primary" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Requirement"}</button>
          )}
        </div>
      </form>
    </section>
  );
}
