import { useEffect, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../slices/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [form, setForm] = useState(true);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [token, setToken] = useState(null);
  const user_token = useSelector((state) => state.auth.credentials.token);
  const updateToken = () => {
    setToken(user_token);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };
  const navigate = useNavigate();
  const submit = async () => {
    const authMethod = form ? login : register;

    try {
      await authMethod({ username, password, email, phone_number }).unwrap();
    } catch (error) {
      console.log(error);
    }
    updateToken();
    if (form) {
      navigate("/");
    } else {
      navigate("/login");
      setForm(!form);
    }
  };
  useEffect(() => {
    {
      form ? navigate("/login") : navigate("/register");
    }
  }, [form]);

  return (
    <>
      {token && form ? (
        <>
          <h1>Successfully Logged In!</h1>
        </>
      ) : token && !form ? (
        <h1>Successfully Registered!</h1>
      ) : (
        <div id="form" onKeyDown={handleKeyDown}>
          {!form ? <h1>Register:</h1> : <h1>Login:</h1>}
          <input
            type={"text"}
            placeholder={"Username..."}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
          {!form && (
            <input
              type={"email"}
              placeholder={"Email..."}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          )}
          <input
            type={"password"}
            placeholder={"Password..."}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          {!form && (
            <>
              <input
                type={"password"}
                placeholder={"Confirm Password..."}
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Phone Number..."
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                className="form-input"
              />
            </>
          )}
          <button onClick={submit} className="form-button">
            Submit
          </button>
          <div>
            {!form ? (
              <p>Already have an account?</p>
            ) : (
              <p>
                <br />
                Need to create a new account?
              </p>
            )}
            <button onClick={() => setForm(!form)} className="form-button">
              {form ? "Register!" : "Login!"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
