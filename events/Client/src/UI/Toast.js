/* 
    Based on react-tostify: https://github.com/fkhadra/react-toastify
*/

import { toast } from "react-toastify";

export const configureNotifications = () => {
  toast.configure({
    position: "bottom-right",
    style: { opacity: "0.7" }
  });
};

export const notifyError = ({ message, autoClose = false }) => {
  if (!message) return;
  toast.error(message, { autoClose });
};

export const notifySuccess = ({ message, autoClose = false }) => {
  if (!message) return;
  toast.success(message, { autoClose });
};

export const notifyInfo = ({ message, autoClose = false }) => {
  toast.info(message, {
    autoClose
  });
};
