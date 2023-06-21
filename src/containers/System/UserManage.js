import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
    //Khai báo theo chuẩn React
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    // Goi API
    async componentDidMount() {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }
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
                    test={"hello modal"}
                />
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
                                            <button className="btn-edit">
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn-delete">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
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
