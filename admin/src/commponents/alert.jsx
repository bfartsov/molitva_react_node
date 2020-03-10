import React from 'react';
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
    return (alerts !== null && alerts.length > 0 && alerts.map(alert => {
        return <section id="main-content">
            <section className="wrapper">
                
                <div className="row mt">
                    <div className="col-lg-12">
                        <div className="content-panel">
                   
                        

                                <div key={alert.id}>
                                    {alert.msg}
                                </div>
                          
                        </div>
                    </div>
                </div>
            </section>
        </section>




    }))

}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
