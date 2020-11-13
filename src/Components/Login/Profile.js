import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { Modal } from "react-bootstrap";

function Profile(props) {
  const history = useHistory();
  //get accessToken and fetch user data
  // console.log(localStorage.getItem("accessToken"));
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState({});
  const [editedName, setEditedName] = useState("");
  const [notification, setNotification] = useState();
  const [changePasswordNotification, setChangePasswordNotification] = useState(
    ""
  );
  const [changepasswordMoDalHide, setChangePasswordModalHide] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassowrd] = useState("");
  const updateProfile = async () => {
    const respone = await fetch("http://localhost:3000/users/update", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({ fullname: editedName }),
    });
    const data = await respone.json();
    setNotification(data.message);
  };
  const changePassword = async () => {
    const response = await fetch("http://localhost:3000/users/changepassword", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        confPassword: confNewPassword,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      alert(data.message);
      setChangePasswordNotification("");
      setChangePasswordModalHide(false);
    } else {
      const data = await response.json();
      setChangePasswordNotification(data.message);
    }
  };
  const getProfile = async () => {
    const response = await fetch("http://localhost:3000/users/profile", {
      method: "GET",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
    });
    if (response.status === 401) {
      const data = await response.json();
      setNotification(data.message);
    }
    if (response.status === 200) {
      const data = await response.json();
      setUser(data);
      data.fullname === null
        ? setEditedName("null")
        : setEditedName(data.fullname);
    }
  };
  const handleBack = () => {
    if (!localStorage.getItem("accessToken")) {
      console.log("Nothing to show here!");
      setNotification("Vui lòng đăng nhập!");
      handleBackToLogin();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(editedName);
    updateProfile();
  };
  const handleBackToLogin = () => {
    history.push("/login");
  };
  const handleChangePassword = () => {
    changePassword();
  };
  useEffect(() => {
    handleBack();
    getProfile();
  }, []);
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="header">Thông tin tài khoản</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="fullname">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <strong style={{ fontSize: "24px" }}>{user.username}</strong>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <small
              style={{ cursor: "pointer" }}
              onClick={() => {
                setChangePasswordModalHide(true);
              }}
            >
              Đổi mật khẩu
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="registerDate">Ngày tạo</label>
            <strong style={{ fontSize: "24px" }}>{user.createdDate}</strong>
          </div>
          <p className="notification">{notification}</p>
          <hr />
          <button
            type="submit"
            className="btn btn-warning btn-lg btn-block"
            style={{ marginTop: "1rem" }}
          >
            Cập nhật
          </button>
          <hr />
        </form>
      </div>
      <div>
        <Modal
          show={changepasswordMoDalHide}
          onHide={() => setChangePasswordModalHide(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Đổi mật khẩu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label htmlFor="newPasswowrd">Mật khẩu mới</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confNewPasswowrd">Nhập lại mật khẩu mới</label>
                <input
                  type="password"
                  className="form-control"
                  id="confNewPassword"
                  name="confNewPassword"
                  value={confNewPassword}
                  onChange={(e) => setConfNewPassowrd(e.target.value)}
                  required
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <p className="notification">{changePasswordNotification}</p>
            <button
              className="btn btn-primary float-left"
              onClick={handleChangePassword}
            >
              Xác nhận
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
