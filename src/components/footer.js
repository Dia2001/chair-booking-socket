import React from 'react';
import "../styles/footer.scss";
import chplay from '../assets/images/chplay.png'; 
import appstore from '../assets/images/appstore.png'; 
const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer__left">
          <h3 className="footer__title">CÔNG TY TNHH KINH DOANH VẬN TẢI SƠN TÙNG</h3>
          <p className="footer__address">VP Quy Nhơn: 234 Tây Sơn, Phường Nguyễn Văn Cừ, TP. Quy Nhơn, Bình Định</p>
          <p className="footer__email">Email: xeclcsontung@gmail.com</p>
          <p className="footer__hotline">Tổng đài: 1900.55.55.23 - 1900.96.96.71</p>
        </div>
        <div className="footer__center">
          <h3 className="footer__title">Tải ngay ứng dụng để đặt chuyến dễ dàng nhất!</h3>
          <img src={appstore} alt="Download on the App Store" className="footer__app-store"/>
          
          <img src={chplay} alt="Get it on Google Play" className="footer__google-play"/>
        </div>
        <div className="footer__right">
          <h3 className="footer__title">Chính sách hủy vé</h3>
          <p className="footer__policy">Các hình thức thanh toán</p>
          <a href="#" className="footer__facebook">Facebook</a>
        </div>
      </footer>
    );
  };

export default Footer;