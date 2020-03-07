import React from 'react';
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
    return (alerts !== null && alerts.length > 0 && alerts.map(alert => {
        return <div key={alert.id}>
            {alert.msg}
        </div>
    }))

}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
