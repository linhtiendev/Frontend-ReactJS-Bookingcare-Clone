import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        return (
            <React.Fragment>
                <div className="user-redux-container">
                    <div className="title">User Redux LITI</div>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 my-4">
                                    <div className="col-12">
                                        {isGetGender === true
                                            ? "Loading gender"
                                            : ""}
                                    </div>
                                    <FormattedMessage id="manage-user.add" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="Password"
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.first-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.last-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phonenumber" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                    />
                                </div>
                                <div className="col-9">
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select className="form-control">
                                        {genders &&
                                            genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language ===
                                                        LANGUAGES.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    <select className="form-control">
                                        {positions &&
                                            positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language ===
                                                        LANGUAGES.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.roleid" />
                                    </label>
                                    <select className="form-control">
                                        {roles &&
                                            roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language ===
                                                        LANGUAGES.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.image" />
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            id="previewImg"
                                            type="file"
                                            hidden
                                            onChange={(event) =>
                                                this.handleOnchangeImage(event)
                                            }
                                        />
                                        <label
                                            className="upload-img"
                                            htmlFor="previewImg"
                                        >
                                            Tải ảnh
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewImgURL})`,
                                            }}
                                            onClick={() =>
                                                this.openPreviewImage()
                                            }
                                        ></div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-primary">
                                        <FormattedMessage id="manage-user.save" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() =>
                                this.setState({ isOpen: false })
                            }
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
