import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'alert alert-success';
      case 'error':
        return 'alert alert-danger';
      default:
        return '';
    }
  };

  return (
    <div className={getClassName()} role="alert">
      {message}
    </div>
  );
};

export default Notification;
