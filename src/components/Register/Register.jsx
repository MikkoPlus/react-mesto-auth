import Sign from "../Sign/Sign";
import { Link, useNavigate } from "react-router-dom";
import * as mestoAuth from "../../utils/mestoAuth.js";

function Register({ changeAccessStatus, changeTooltipVisability }) {
  const navigate = useNavigate();

  const handleRegister = (formValuesObj) => {
    mestoAuth
      .register(formValuesObj)
      .then((res) => {
        changeAccessStatus(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
        console.log(res);
        return res;
      })
      .catch((err) => {
        changeAccessStatus(false);
      })
      .finally(() => {
        changeTooltipVisability(true);
        setTimeout(() => {
          changeTooltipVisability(false);
        }, 2000);
      });
  };

  return (
    <Sign
      name="register"
      title="Регистрация"
      btnText="Зарегистрироваться"
      handleSubmit={handleRegister}
    >
      <div className="sign__replace-wrapper">
        <p className="sign__replace-text">Уже зарегистриврованны? </p>
        <Link to="/sign-in" className="sign__replace-text sign__replace-link">
          Войти
        </Link>
      </div>
    </Sign>
  );
}
export default Register;
