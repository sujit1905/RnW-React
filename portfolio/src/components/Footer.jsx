import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        {/* LEFT */}
        <div className="footer-left">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="highlight">Sujit</span>. All Rights Reserved.
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <a href="#">Terms & Policy</a>
          <span className="divider">|</span>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
