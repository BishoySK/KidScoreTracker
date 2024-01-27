import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { getUserData } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function UserProfile(){

  const [user,setUser] = useState({});

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(()=>{
    getUserData()
    .then((data) => {
      if (data) {
        setUser(data.data);
      }
    })
    .catch((err) => console.log(err));
  },[])

    return(
        <>
        <div className="m-3 text-end">
          <button className="btn btn-danger" onClick={logOut} >
            Log Out
          </button>
        </div>
        <div className="m-5"> 
            <h3 className="text-center mb-4 userProfile-wc">Welcome :  
            <span className="userProfile-name fw-bold">{user.userName}</span></h3>
            <div className="d-flex justify-content-center align-items-center">
            <Card
              key={"secondary"}
              text={"white"}
              style={{ width: '18rem' }}
              className="mb-2 userProfile-card-bg"
            >
              <Card.Header className="text-end fw-bolder fs-5">بياناتك</Card.Header>
              <Card.Body>
                <div className="row flex-row-reverse text-center mb-3">
                  <div className="col">النقاط</div>
                  <div className="col">{user.count}</div>
                </div>
                <div className="row flex-row-reverse text-center">
                  <div className="col">رقم التليفون</div>
                  <div className="col">{user.phone}</div>
                </div>
              </Card.Body>
            </Card>
            </div>
        </div>
      
        </>
    );
};