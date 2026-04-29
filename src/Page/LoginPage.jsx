import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import '../Style/LoginPage.css'
import Button from '../Component/Button'

const LoginPage = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const result = login(name, password);

    if (result.success) {
      navigate("/landing");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='login_Cont'>
      <section className='login_Body'>
        <div className='login_Text'>
          <h1 className='login_Title'>Log in</h1>

          <label className="login_Name">
            <span>Fullname</span>
            <input
              type="text"
              placeholder='Enter Fullname'
              className='name_Input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="login_Name">
            <span>Password</span>
            <input
              type="password"
              placeholder='Enter your password'
              className='name_Input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className='forgot_Cont'>
            <span className='login_Forgot'>forgot password</span>
          </div>

          <article className='btn_Cont'>
            <Button name="Login" className="login_Btn" onClick={handleLogin}/>
          </article>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;