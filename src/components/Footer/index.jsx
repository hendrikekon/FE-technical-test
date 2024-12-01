import React from "react";
import './index.css';
import imgfacebook from '../../assets/img/facebook.png';
import imgaddress from '../../assets/img/address.png';
import imgphone from '../../assets/img/phone.png';
import imgmail from '../../assets/img/mail.png';
import imginstagram from '../../assets/img/instagram.png';
import imgtwitter from '../../assets/img/twitter.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>Your one-stop shop for the best products. We aim to deliver quality and satisfaction to our customers.</p>
            </div>
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                <li><a href="/">About</a></li>
                <li><a href="/">Products</a></li>
                <li><a href="/">Contact</a></li>
                <li><a href="/">FAQ</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact Us</h3>
                <p><img src={imgmail} alt="imgmail" className="footer-icon"></img> Email: support@example.com</p>
                <p><img src={imgphone} alt="imgphone" className="footer-icon"></img> Phone: +621 234 567 890</p>
                <p><img src={imgaddress} alt="imgaddress" className="footer-icon"></img> Address: 1234 Street Name, City, Country</p>
            </div>
            <div className="footer-section social-media">
                <h3>Follow Us</h3>
                <a href="https://facebook.com" target="facebook">
                <img src={imgfacebook} alt="imgfacebook" className="footer-icon"></img> Facebook</a>
                <a href="https://twitter.com" target="twitter">
                <img src={imgtwitter} alt="imgtwitter" className="footer-icon"></img> Twitter</a>
                <a href="https://instagram.com" target="instagram">
                <img src={imginstagram} alt="imginstagram" className="footer-icon"></img> Instagram</a>
            </div>
            </div>
            <div className="footer-bottom">
            <p>&copy; 2024 Hendrik. Portofolio.</p>
            </div>
        </footer>
    )
}

export default Footer;