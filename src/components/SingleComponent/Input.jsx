import { useEffect, useState } from "react";

function Input({
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  isPopupOpen,
  inputClass,
}) {
  const [isValid, setIsValid] = useState(false);
  const [validMessage, setValidMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const inputClassName = inputClass
    ? `form__input ${inputClass}`
    : "form__input";

  function handleInputChange(e) {
    setIsValid(e.target.validity.valid);
    setValidMessage(e.target.validationMessage);
  }

  useEffect(() => {
    setIsDirty(false);
  }, [isPopupOpen]);

  return (
    <>
      <input
        required
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e)}
        onInput={handleInputChange}
        onBlur={() => setIsDirty(true)}
      />
      {isDirty && !isValid && (
        <span id={`input-error`} className="form__input-text-error">
          {validMessage}
        </span>
      )}
    </>
  );
}

export default Input;
