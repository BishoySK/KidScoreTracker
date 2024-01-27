import React from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../../api/adminApi";
import { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavBar from "../../../components/navBar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PaginationControl } from "react-bootstrap-pagination-control";
import DeleteModal from "../../../components/modal";

export default function UserList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [delayInterval, setDelayInterval] = useState(null);

  const role = ["Admin", "Child"];

  //modal
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showModal = (userId) => {
    setShow(true);
    setDeleteId(userId);
  };

  const getParamsData = () => {
    const params = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  useEffect(() => {
    getAllUsers(getParamsData())
      .then((data) => {
        if (data) {
          setUsers(data.data);
          setTotalPages(data.totalPages);
        }
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const handleSearchInput = (e) => {
    if (delayInterval) {
      clearInterval(delayInterval);
    }
    const intervalId = setInterval(() => {
      const searchParams = e.target.value;
      setSearchParams({ ...getParamsData(), searchParams });
      clearInterval(intervalId);
    }, 1000);

    setDelayInterval(intervalId);
  };

  const handleEditClick = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  const changeRole = (e) => {
    const role = e.target.innerText;
    const Admin = role === "Admin" ? true : false;
    setSearchParams({ ...getParamsData(), isAdmin: Admin });
  };
  return (
    <>
      <NavBar />
      <h3 className="text-center my-4 border-bottom">المخدومين</h3>
      <div className="d-sm-flex d-block px-3 pb-2 align-items-center justify-content-between">
        <FormControl className="col-12 mb-3 mb-sm-0 col-sm-2">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            value={searchParams.get('isAdmin')==='true'? "Admin" : "Child"}
          >
            {role &&
              role.map((value, index) => (
                <MenuItem onClick={changeRole} key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <div className="d-sm-flex d-block">
          <input
            className="form-control"
            onInput={handleSearchInput}
            type="search"
            placeholder="Search"
            aria-label="Search"
            defaultValue={searchParams.get('searchParams')}
          />
        </div>
      </div>
      <div className="row mx-sm-2 justify-content-center justify-content-sm-start">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="col-10 col-sm-4 mb-3">
              <div
                className="userList-card-bg shadow-sm py-3 px-1
                  border rounded-4"
              >
                <div className="row align-items-center justify-content-center ">
                  <p className="col-5 fw-bold text-center">Name :</p>
                  <p className="col-7">{user.userName}</p>
                </div>
                <div className="row align-items-center justify-content-center">
                  <p className="col-5 fw-bold text-center">Phone :</p>
                  <p className="col-7">{user.phone}</p>
                </div>
                <div className="row align-items-center justify-content-center">
                  <p className="col-5 fw-bold text-center">Points :</p>
                  <p className="col-7">{user.count}</p>
                </div>
                <div className="d-flex align-items-center justify-content-around text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(user._id)}
                  >
                    Edit
                  </button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center fw-bolder" colSpan={5}>
            No Users
          </p>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        { totalPages && (
          <PaginationControl
            page={+searchParams.get('page')}
            between={4}
            total={totalPages}
            limit={20}
            changePage={(page) => {
              setSearchParams({ ...getParamsData(), page: page });
            }}
            ellipsis={0}
            next={false}
          />
        )}
      </div>
      <div>
        <DeleteModal
          show={show}
          setShow={setShow}
          deleteId={deleteId}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </>
  );
}
