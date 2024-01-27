import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/account/login/login";
import UserList from "../../pages/user/userList/userList";
import AddUser from "../../pages/user/addUser/addUser";
import EditUser from "../../pages/user/editUser/editUser";
import UserProfile from "../../pages/user/userProfile/userProfile";

export default function Router() {
  return (
    <>
      <Routes>
        <Route>
            <Route path="/userList" element={<UserList />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/userProfile" element={<UserProfile />} />
        </Route>

            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}