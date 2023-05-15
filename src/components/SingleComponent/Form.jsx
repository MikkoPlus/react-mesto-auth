import { useRef, useEffect, useState, useContext } from "react";
import { ApiRequestLoadingContext } from "../../contexts/ApiRequestLoadingContext";
import Spinner from "../SingleComponent/Spinner";

function Form({
  name,
  title,
  children,
  handleSubmit,
  inputNames,
  inputValues,
  btnText,
  titleClass,
  btnClass,
}) {
  const isLoading = useContext(ApiRequestLoadingContext);
  const [isFormValid, setIsFormValid] = useState(false);

  const btnClassName = btnClass ? `form__btn ${btnClass}` : "form__btn";

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    handleSubmit();
  };

  const formRef = useRef();

  function checkInputValidity(inputName) {
    return formRef.current.elements[inputName].validity.valid;
  }

  useEffect(
    () => {
      if (inputNames) {
        setIsFormValid(
          inputNames.every((inputName) => checkInputValidity(inputName))
        );
      } else {
        setIsFormValid(true);
      }
    },
    // eslint-disable-next-line
    inputValues ? [...inputValues] : []
  );

  return (
    <>
      <h4 className={`form-title ${titleClass}`}>{title}</h4>
      <form
        ref={formRef}
        noValidate="noValidate"
        className={`form ${isLoading ? "form_is-loading" : ""}`}
        id={`${name}-form`}
        name={name}
        onSubmit={handleSubmitForm}
      >
        <Spinner isLoading={isLoading} />
        {children}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`${btnClassName} ${
            !isFormValid || isLoading ? "form__btn_disabled" : ""
          }`}
        >
          {btnText}
        </button>
      </form>
    </>
  );
}

export default Form;
