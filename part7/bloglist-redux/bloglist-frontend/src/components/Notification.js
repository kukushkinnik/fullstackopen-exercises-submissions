import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Notification.module.css";

const Notification = ({ type }) => {
  const notifications = useSelector(state => state.notifications);

  if (type === "success") {
    return (
      <div className={styles.success}>
        <p>{notifications.message}</p>
      </div>
    );
  }

  if (type === "deleted successfully") {
    return (
      <div className={styles.success}>
        <p>{notifications.message}</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className={styles.error}>
        <p>{notifications.message}</p>
      </div>
    );
  }

  if (type === "error deleting") {
    return (
      <div className={styles.error}>
        <p>{notifications.message}</p>
      </div>
    );
  }
};

export default Notification;
