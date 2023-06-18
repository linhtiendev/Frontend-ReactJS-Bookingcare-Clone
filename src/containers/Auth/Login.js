import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
    // ham de khai bao state
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            // Biến đặt là false để không hiện password
            isShowPassword: false,
            errMessage: "",
        };
    }
    // Biến state thực chất là 1 object
    // state sinh ra để kiểm soát giá trị của các biến trong cponent đang sd
    handleOnChangeUsername = (event) => {
        // Hàm cập nhật lại biến State
        this.setState({
            username: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        // Hàm cập nhật lại biến State
        this.setState({
            password: event.target.value,
        });
    };
    // Hàm lấy giá trị của username và password
    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        // console.log(
        //     "Username: ",
        //     this.state.username,
        //     "Password: ",
        //     this.state.password
        // );
        // console.log("all state", this.state);
        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login succeeds");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    // Hàm thay đổi giá trị của password
    handleShowHidePassword = () => {
        // Dấu ! sẽ lấy giá trị ngược lại của biến hiện tại (isShowPassword: false)
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
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
                                // Đặt giá trị cho input
                                value={this.state.username}
                                // Sự kiện Onchange
                                // biến event là event của html đang có
                                onChange={(event) => {
                                    this.handleOnChangeUsername(event);
                                }}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    //check điều kiện show password
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.handleOnChangePassword(event);
                                    }}
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "fas fa-eye"
                                                : "fas fa-eye-slash"
                                        }
                                    ></i>
                                </span>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.errMessage}
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                // Sự kiện onClick
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
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
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
