import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
    // ham de khai bao state
    constructor(props) {
        super(props);
    }

    render() {
        //JSX
        // ham return render ra 1 khối
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn-login">Login</button>
                        </div>
                        <div className="col-12 forgot-password">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-5">
                            <span>Or sign in with:</span>
                        </div>
                        <div className="col-12 login-social">
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Redux
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
