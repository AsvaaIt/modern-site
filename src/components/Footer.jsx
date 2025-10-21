import React from "react";
import "../components/Footer.css";


import { FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer" style={styles.footer}>
      <p>© 2025 ASVAA IT Services & Solutions | Crafted with 💙 and Innovation.</p>

      <div style={styles.socialIcons}>
        <a
          href="https://www.linkedin.com/company/asvaa-it-solutions"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconLink}
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href="https://twitter.com/asvaa_it"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconLink}
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#0b0c10",
    color: "#fff",
  },
  socialIcons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  iconLink: {
    color: "#fff",
    textDecoration: "none",
  },
};
