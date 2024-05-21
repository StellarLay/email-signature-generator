import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

import "./signatureForm.scss";

const SignatureForm = (props) => {
  const { setData } = props;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    position: "",
    phone: "",
    email: "",
    photoUrl: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setData(formData);
  }, [formData, setData]);

  return (
    <div className="main-form">
      <h1>Генерация подписи</h1>
      <form className="signature-form" onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          placeholder="Имя"
          name="firstname"
          onChange={(e) => changeHandler(e)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="lastname"
          onChange={(e) => changeHandler(e)}
        />
        <input
          type="text"
          placeholder="Должность"
          name="position"
          onChange={(e) => changeHandler(e)}
        />
        <InputMask
          //mask="+7-999-999-99-99"
          placeholder="Телефон"
          name="phone"
          onChange={(e) => changeHandler(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => changeHandler(e)}
        />
        <input
          type="text"
          placeholder="url фотографии"
          name="photoUrl"
          onChange={(e) => changeHandler(e)}
        />
      </form>
    </div>
  );
};

SignatureForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  position: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  photoUrl: PropTypes.string,
  setData: PropTypes.func,
};

export default SignatureForm;
