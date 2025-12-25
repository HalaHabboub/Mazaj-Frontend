import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">Mazaj</div>
                <div className="footer-moto">Let AI Curate Your Party.</div>

                <div className="footer-copyright">
                    © {currentYear} Mazaj. Built by{' '}
                    <a
                        href="https://www.linkedin.com/in/hala-habboub-3a5b811b8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Hala Habboub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;