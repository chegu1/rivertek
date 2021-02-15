import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UsersListTable = () => {
  const [userList, setUsersList] = useState([]);

  // const { name, email, password, buttonText } = values;

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/api/userslist`,
    })
      .then((res) => {
        setUsersList(res.data.getUsersList);
      })
      .catch((error) => {
        // setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
  }, [userList]);

  const removeUser = (id) => {
    console.log(id);
    axios({
      method: "DELETE",
      url: `http://localhost:5000/api/${id}`,
    })
      .then((res) => {
        console.log(res, "user", userList);
        toast.success(res.data.message);

        // setUsersList(res.data.getUsersList);
      })
      .catch((error) => {
        // setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
  };

  const acceptUser = (id) => {
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/${id}`,
      data: {},
    })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        // console.log(error.response.data, "signup");
        // setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
    console.log(id);
  };
  return (
    <>
      <ToastContainer />
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  disabled={user.isVerified}
                  onClick={() => acceptUser(user._id)}
                >
                  Accept
                </button>
                <button onClick={() => removeUser(user._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersListTable;
