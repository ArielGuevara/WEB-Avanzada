// import React from "react";
import { FaEnvelope } from "react-icons/fa";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleLogo from "../assets/google_logo.png";
import AppleLogo from "../assets/logo_apple.jpg";
import InsideLogo from "../assets/logo.png";
import React, { useEffect, useState } from "react"; 

const FormContainer = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Llama a la API para obtener usuarios
    fetch("http://localhost:3000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Almacena los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);
  return (
    <div className="form-container__left">
      <div className="form-container__header">
        <img
          src={InsideLogo}
          alt="InsideBox"
          width="64px"
          height="78px"
          className="logo-enterprise"
        />
        <h1>InsideBox</h1>
      </div>
      <div className="form-container__header header2">
        <h3 className="firsth3">Start your Journey</h3>
        <h2>Sign Up to InsideBox</h2>
      </div>

      <form action="#">
        <fieldset className="form-container__fieldset">
          <legend>E-mail</legend>
          <input
            type="email"
            id="form-email"
            placeholder="example@gmail.com"
          />
          <FaEnvelope className="icon" />
        </fieldset>

        <fieldset className="form-container__fieldset">
          <legend>Password</legend>
          <input
            type="password"
            id="form-password"
            placeholder="***********"
          />
        </fieldset>

        <div>
          <h1>Lista de Usuarios</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li> // Ajusta según tu estructura de datos
            ))}
          </ul>
        </div>

        <button className="signup-button">Sign Up</button>

        <fieldset className="form-container__fieldset fieldset-signup">
            <legend className="legend-signup">or sign up with</legend>
            <button className="social__buttons">
                <img src={FacebookIcon} alt="Facebook" width="27px" height="35px" />
            </button>
            <button className="social__buttons">
                <img src={GoogleLogo} alt="Google" width="27px" height="27px" />
            </button>
            <button className="social__buttons">
                <img src={AppleLogo} alt="Apple" width="31px" height="30px" />
            </button>
        </fieldset>

      </form>

      <h3 className="final-signup">
        Have an account? <a href="#">Sign In</a>
      </h3>
    </div>
  );
};

export default FormContainer;
