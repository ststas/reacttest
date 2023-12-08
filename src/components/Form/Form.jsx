/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// СХЕМА ВАЛИДАЦИИ (ВЫНОСИТСЯ В ОТДЕЛЬНЫЙ ФАЙЛ)
const schema = yup.object({
  email: yup.string().required().matches(/^\S+@\S+\.[a-zA-Z]{2,}$/, "Пожалуйста введите корректный email."),
  password: yup.string().required().matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/,
    "Пароль должен содержать от 8 до 15 символов, включая заглавную, прописную букву и число."
  ),

}).required();

export default function Form() {
  const { register, handleSubmit, resetField, formState: { isValid, errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  // СТЕЙТ ДЛЯ ИЗМЕНЕНИЯ ВИДИМОСТИ ПОЛЯ PASSWORD
  const [passwordType, setPasswordType] = useState("password")
  // СТЕЙТ ДЛЯ ИЗМЕНЕНИЯ ИКОНКИ В ПОЛЕ PASSWORD
  const [eyeType, setEyeType] = useState("fa-eye-slash")

  function onSubmit (data) {
    console.log(data)
  };

  function handlePasswordType() {
    // eslint-disable-next-line no-unused-expressions
    passwordType === "password" ? setPasswordType("text") : setPasswordType("password")
  }

  function handleEyeType() {
    // eslint-disable-next-line no-unused-expressions
    eyeType === "fa-eye-slash" ? setEyeType("fa-eye") : setEyeType("fa-eye-slash")
  }

  function handleEyeClick() {
    handlePasswordType()
    handleEyeType()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field">
        {/* ИНПУТ */}
        <label className="label" htmlFor="email">Электронная почта
          <div className="control has-icons-right has-icons-left">
            <input {...register("email")}
              className="input"
              type="email"
              placeholder="Введите почту"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"/>
            </span>
            <span className="icon icon__clickable is-small is-right" onClick={()=>resetField("email")}>
              <i className="fa-solid fa-xmark" />
            </span>
          </div>
        </label>
        {/* ТЕКСТ ОШИБКИ */}
        <p className="error-text">{errors.email?.message}</p>
      </div>
      <div className="field">
        {/* ИНПУТ */}
        <label className="label" htmlFor="password">Пароль
          <div className="control has-icons-right has-icons-left">
            <input {...register("password")}
              className="input"
              type={passwordType}
              placeholder="Введите пароль"/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"/>
            </span>
            <span className="icon icon__clickable is-small is-right" onClick={handleEyeClick}>
              <i className={`fa-solid ${eyeType}`} />
            </span>
          </div>
        </label>
        {/* ТЕКСТ ОШИБКИ */}
        <p className="error-text">{errors.password?.message}</p>
      </div>
      <input type="submit" disabled={!isValid} className="button is-primary is-fullwidth"/>

    </form>
  )
}
