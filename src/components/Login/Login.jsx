import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../Sign/Sign";
import * as mestoAuth from "../../utils/mestoAuth.js";

function Login({
  handleSetEmail,
  handleChangeLoggedInState,
  changeAccessStatus,
  changeTooltipVisability,
}) {
  const navigate = useNavigate();

  const checkToken = (token) => {
    mestoAuth
      .checkTokenValidity(token)
      .then(({ data }) => {
        handleSetEmail(data.email);
        handleChangeLoggedInState(true);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (obj) => {
    mestoAuth
      .login(obj)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          checkToken(data.token);
        }
      })
      .catch((err) => {
        changeAccessStatus(false);
        changeTooltipVisability(true);
      })
      .finally(() => {
        setTimeout(() => {
          changeTooltipVisability(false);
        }, 1000);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    checkToken(jwt);
    // eslint-disable-next-line
  }, []);

  return (
    <Sign
      name="login"
      title="Вход"
      btnText="Войти"
      handleSubmit={handleLogin}
    />
  );
}
export default Login;
