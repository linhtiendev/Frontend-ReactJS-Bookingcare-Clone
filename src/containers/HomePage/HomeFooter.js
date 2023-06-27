import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="section-homefooter">
                    <p>
                        &copy; 2023 Lê Linh Tiến. More information, visit my
                        Github
                        <a
                            target="_blank"
                            href="https://github.com/linhtiendev"
                        >
                            &#8594; Click here &#8592;
                        </a>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
