import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { after } from "lodash";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    //Khai báo theo chuẩn React
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    // Goi API
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                // fire event -> clear modal
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        console.log("check edit user", user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({ isOpenModalEditUser: false });
                this.getAllUsersFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    };
    /**
     * Life cycle (vòng đời)
    run component:
    1. Run constructer -> init state (biến muốn dùng)
    2. Did mount (set state. Khi muốn gán giá trị trong biến state thì dùng) / born / unmout
    - gọi API, set state
    - state có nhiệm vụ lưu trữ các giá trị của các biến
    3. Render / re-reder
    - dùng state trong render sẽ render cho cta thấy
     */

    //

    render() {
        let arrUsers = this.state.arrUsers;
        // properties ; nested
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title text-center">Manage Users</div>
                <div>
                    <button
                        className="btn-add-user btn btn-primary px-3 mx-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add new users
                        <i className="fas fa-user-plus"></i>
                    </button>
                </div>
                <div className="user-table mt-3 mx-3">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
