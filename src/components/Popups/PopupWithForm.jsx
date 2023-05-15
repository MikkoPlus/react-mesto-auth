import Form from "../SingleComponent/Form";
import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onClose,
  onSubmit,
  inputNames,
  inputValues,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="form">
      <Form
        name={name}
        title={title}
        formTitleClass="form-title_type_popup"
        handleSubmit={onSubmit}
        btnText={btnText}
        inputNames={inputNames}
        inputValues={inputValues}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
