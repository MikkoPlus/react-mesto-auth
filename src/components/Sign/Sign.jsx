import Form from "../SingleComponent/Form";
import Input from "../SingleComponent/Input";
import { useState, useEffect } from "react";

function Sign({ name, title, btnText, handleSubmit, children }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const { email, password } = formValue;

  const onInputChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormValue({
      email: email,
      password: password,
    });
  }, [email, password]);

  return (
    <div className="sign">
      <Form
        name={name}
        title={title}
        titleClass="form-title_type_sign"
        handleSubmit={() => handleSubmit(formValue)}
        btnText={btnText}
        btnClass="form__btn_type_sign"
        inputNames={["email", "password"]}
        inputValues={[email, password]}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onInputChange(e)}
          inputClass="form__input_type_sign"
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={(e) => onInputChange(e)}
          inputClass="form__input_type_sign"
        />
      </Form>
      {children}
    </div>
  );
}

export default Sign;
