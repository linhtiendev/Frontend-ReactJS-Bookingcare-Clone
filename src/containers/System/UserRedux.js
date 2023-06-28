import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        return (
            <React.Fragment>
                <div className="user-redux-container">
                    <div className="title">User Redux LITI</div>;
                    <div className="user-redux-body">add new user</div>;
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
