export default function FormField({ label, inputId, required = false, error, hint, children, className = "" }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field-label" htmlFor={inputId}>
          {label} {required && <span className="required" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="hint">{hint}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}
