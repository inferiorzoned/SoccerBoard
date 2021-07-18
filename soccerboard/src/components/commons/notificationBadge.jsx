import React, { Component } from "react";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
/*
input:
    notiCount
    onNotiClick
*/
const NotificationBadge = (props) => {
  const { notiCount, onNotiClick } = props;
  return (
    <Badge
      color="primary"
      badgeContent={notiCount}
      onClick={() => onNotiClick()}
    >
      <NotificationsNoneIcon className="notif-badge" fontSize="large" />
    </Badge>
  );
};

export default NotificationBadge;
