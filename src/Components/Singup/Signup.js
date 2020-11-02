import React, { useState } from "react";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, SetConfPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfPassword = (e) => {
    SetConfPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          onChange={handleChangeUsername}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChangePassword}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confpassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confpassword"
          onChange={handleChangeConfPassword}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
export default Signup;
