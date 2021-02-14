import React from "react";
import { Modal } from "react-responsive-modal";
import LoginComponent from "./LoginComponent";

const LoginModal = ({ onClose, open }) => (
  <Modal onClose={onClose} open={open}>
    <LoginComponent />
  </Modal>
);

export default LoginModal;
