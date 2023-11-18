import React, { useEffect, useState } from "react";
import "./user-list.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Home/searchbar/SearchBar";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../backend/firebase-config";
const UserList = ({ userList }) => {
  const [searchUserName, setSearchUserName] = useState("");
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userList) {
      setUsers(userList);
    }
  }, [userList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchUserName) {
      return setUsers(userList);
    }
    console.log(searchUserName.trim().toLowerCase());
    const filteredUsers = userList?.filter((user) =>
      user.username
        .trim()
        .toLowerCase()
        .includes(searchUserName.trim().toLowerCase())
    );
    console.log(filteredUsers);
    setUsers(filteredUsers);
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, "user-details", userId));
    setUsers((prev) => prev.filter((user) => user.uid !== userId));
  };

  return (
    <div className="user-container">
      <h2>Unispy Users </h2>
      <SearchBar
        value={searchUserName}
        handleSearchKey={(e) => setSearchUserName(e.target.value)}
        formSubmit={handleSubmit}
      />
      <div className="userlist">
        {users &&
          users.map((user) => (
            <div className="single-user" key={user.uid}>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <div className="action">
                <button
                  className="view"
                  onClick={() => navigate(`/admin/user-blogs/${user.uid}`)}
                >
                  View
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteUser(user.uid)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
