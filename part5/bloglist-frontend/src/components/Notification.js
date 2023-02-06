import React from "react";
import styles from "../styles/Notification.module.css";

const Notification = ({ type }) => {
  if (type === "success") {
    return (
      <div className={styles.success}>
        <p>a new blog was added</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className={styles.error}>
        <p>wrong username or password</p>
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
