import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="section-share section-about">
                    <div className="section-about-header">
                        Truyền thông nói về BookingCare
                    </div>
                    <div className="section-about-content">
                        <div className="content-left">
                            <iframe
                                width="90%"
                                height="300"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="content-right">
                            <p>
                                CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG
                                ĐẶT LỊCH KHÁM TRỰC TUYẾN
                            </p>
                            <p>
                                CÀ PHÊ KHỞI NGHIỆP VTV1 Chương trình được phát
                                sóng lúc 6h55 ngày 14/11/2018 trên VTV1
                            </p>
                            <div class="content-right-blog">
                                <div className="blog-left"></div>
                                <div className="blog-right"></div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
