const steps = ["Event Basics", "Category", "Requirements", "Review"];

export default function StepIndicator({ currentStep }) {
  return (
    <nav className="stepper" aria-label="Requirement form progress">
      {steps.map((label, index) => {
        const step = index + 1;
        const state = step < currentStep ? "complete" : step === currentStep ? "active" : "";
        return (
          <div className={`step ${state}`} key={label} aria-current={step === currentStep ? "step" : undefined}>
            <span className="step-bubble">{step < currentStep ? "✓" : step}</span>
            <span className="step-label">{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
