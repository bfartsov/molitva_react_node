import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      return (
        <div className={`alert bg-${alert.alertType}`} key={alert.id}>
          {alert.msg}
        </div>
      );
    })
  );
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
