// import React from "react";
import { FaEnvelope } from "react-icons/fa";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleLogo from "../assets/google_logo.png";
import AppleLogo from "../assets/logo_apple.jpg";
import InsideLogo from "../assets/logo.png";
import React, { useEffect, useState } from "react";

const FormContainer = () => {
  const [users, setUsers] = useState([]);

  //estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Estado para guardar token de autenticación
  const [token, setToken] = useState("");

  // Funcion para hacer LogIn en la API
  const logIn = () => {
    console.log(email);
    console.log(password);

    fetch("http://localhost:3000/api/v1/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        setToken(data.data.token);
      })
      .catch((error) => {
        console.error("Error al hacer login:", error);
      });
  };


  useEffect(() => {
    // Llama a la API para obtener usuarios
    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        setUsers(data); // Almacena los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Log In</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="form-email" className="form-label">E-mail</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      id="form-email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="form-password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="form-password"
                    placeholder="***********"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-primary" onClick={logIn}>Log In</button>
                </div>
              </form>
              <div className="text-center">
                <p className="mt-4">
                  Have an account? <a href="#">Sign In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {users.length > 0 && (
            <div className="card">
              <div className="card-header text-center">
                <h2>LISTA DE USARIOS</h2>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
