import React from "react";
import "./styles.css";
import FormContainer from "./components/FormContainer";
import ImgContainer from "./components/ImgContainer";

const App = () => {
  return (
    <div className="form-container">
      <FormContainer />
      <ImgContainer />
    </div>
  );
};

export default App;

