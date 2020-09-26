import React from "react";
import {connect} from 'react-redux';

class Loading extends React.Component {
    render() {
        if (this.props.loading) {
            return (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else {
            return <div/>
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.account.loading
    }
};

export default connect(mapStateToProps, {})(Loading);
