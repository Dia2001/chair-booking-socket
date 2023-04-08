import React from 'react';
import "../styles/header.scss";

function Header() {
  return (
    <header>
    <nav className="navbar">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Trang chủ</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Chương trình khuyến mãi</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Danh sách điểm</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Tin tức</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Tra cứu vé</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Du lịch</a>
      </li>
    </ul>
  </nav>
  </header>
  );
}

export default Header;