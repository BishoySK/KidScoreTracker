import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../api/adminApi';

function DeleteModal({show,setShow,deleteId,users,setUsers}) {
  const closeModal = () => setShow(false);
  
  
  const deleteChild = () => {
    deleteUser(deleteId)
      .then((data) => {
        if (data) {
         const usersList = [...users].filter((item) => item._id !== deleteId);
          setUsers(usersList);
          setShow(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
       <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button className="btn btn-danger" onClick={deleteChild}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default DeleteModal;