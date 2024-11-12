// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../Components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col className="text-center">
            <div className="footer-logo">
              <h2>Recipe Finder</h2>
            </div>
            <ul className="footer-links list-inline">
              <li className="list-inline-item">
                <a href="#home">Home</a>
              </li>
              <li className="list-inline-item">
                <a href="#favorites">Favorites</a>
              </li>
              <li className="list-inline-item">
                <a href="#about">About</a>
              </li>
              <li className="list-inline-item">
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <div className="social-icons">
              <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; 2024 Recipe Finder. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
