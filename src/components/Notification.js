import 'react-notifications/lib/notifications.css';
import React from 'react';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import SharedConstant from '../constants/shared-constant';
import {connect} from 'react-redux';
import {reset} from '../actions'

class Notification extends React.Component {

    createNotification = (type, message, title) => {
        switch (type) {
            case SharedConstant.info:
                NotificationManager.info(message, title);
                break;
            case SharedConstant.success:
                NotificationManager.success(message, title);
                break;
            case SharedConstant.warning:
                NotificationManager.warning(message, title);
                break;
            case SharedConstant.error:
                NotificationManager.error(message, title);
                break;
            default:
                return;
        }
    };

    componentDidUpdate() {
        if (this.props.display) {
            this.createNotification(this.props.type, this.props.message, this.props.title || null);
        }
    }

    render() {
        return (
            <div>
                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        display: state.notification.display,
        message: state.notification.message,
        title: state.notification.title,
        type: state.notification.type
    }
};
export default connect(mapStateToProps, {reset})(Notification);
