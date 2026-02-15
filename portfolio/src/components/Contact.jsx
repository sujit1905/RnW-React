import "./Contact.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact-section text-white">
      <div className="container">
        {/* TITLE */}
        <div className="section-header text-center">
          <h2 className="section-main-title">Get in Touch</h2>
          <span className="section-bg-title">CONTACT</span>
        </div>

        <div className="row">
          {/* LEFT INFO */}
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3">ADDRESS</h5>
            <p>
              B/26, Samarpan Park,
              <br />
              Chavdapura, Jitodia Road
              <br />
              Anand
            </p>

            <ul className="contact-list">
              <li>
                <FaPhoneAlt /> +91 7862082896
              </li>
              <li className="highlight">mecwansujit@gmail.com</li>
            </ul>

            <h5 className="mt-4">FOLLOW ME</h5>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/sujit-mecwan-609734245/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/sujit1905"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-8">
            <h5 className="mb-3">SEND US A NOTE</h5>

            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email"
                  />
                </div>

                <div className="col-12">
                  <textarea
                    rows="5"
                    className="form-control custom-input"
                    placeholder="Tell us more about your needs......"
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-4">
                  <button className="btn btn-success rounded-pill px-5 py-2">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
