import { CATEGORIES } from "../lib/formOptions";

export default function CategorySelector({ category, error, onCategoryChange }) {
  return (
    <>
      <h2 className="form-heading">What do you need for your event?</h2>
      <p className="form-description">Choose the type of professional support you&apos;re looking for.</p>
      <div className="category-grid" role="radiogroup" aria-label="Requirement category" aria-describedby={error ? "category-error" : undefined}>
        {CATEGORIES.map((option) => {
          const selected = category === option.value;
          return (
            <button type="button" className={`category-card ${selected ? "selected" : ""}`} onClick={() => onCategoryChange(option.value)} role="radio" aria-checked={selected} key={option.value}>
              <span className="category-icon" aria-hidden="true">{option.icon}</span>
              {selected && <span className="selected-check" aria-hidden="true">✓</span>}
              <h3>{option.label}</h3>
              <p>{option.description}</p>
            </button>
          );
        })}
      </div>
      {error && <p id="category-error" className="field-error" role="alert">{error}</p>}
    </>
  );
}
