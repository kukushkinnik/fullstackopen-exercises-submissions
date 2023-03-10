import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Notification.module.css";

const Notification = ({ type }) => {
  const notification = useSelector(state => state.notification);

  if (type === "success") {
    return (
      <div className={styles.success}>
        <p>{notification}</p>
      </div>
    );
  }

  if (type === "deleted successfully") {
    return (
      <div className={styles.success}>
        <p>{notification}</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className={styles.error}>
        <p>{notification}</p>
      </div>
    );
  }

  if (type === "error deleting") {
    return (
      <div className={styles.error}>
        <p>Can not delete blog</p>
      </div>
    );
  }
};

export default Notification;
