import React from "react";
import styles from "../styles/Notification.module.css";

const Notification = ({ type, title, author }) => {
  if (type === "success") {
    return (
      <div className={styles.success}>
        <p>
          a new blog {title} by {author} added
        </p>
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
};

export default Notification;
