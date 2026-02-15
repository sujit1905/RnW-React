import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "skills", "work", "contact"];
      const scrollPos = window.scrollY + 120; // offset for navbar height

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand
          className="fw-bold text-white fs-3"
          onClick={() => scrollToSection("hero")}
          style={{ cursor: "pointer" }}
        >
          Sujit
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto gap-3">
            <Nav.Link
              onClick={() => scrollToSection("hero")}
              className={`nav-item-link ${
                activeSection === "hero" ? "active" : ""
              }`}
            >
              Home
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("about")}
              className={`nav-item-link ${
                activeSection === "about" ? "active" : ""
              }`}
            >
              About
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("skills")}
              className={`nav-item-link ${
                activeSection === "skills" ? "active" : ""
              }`}
            >
              Skills
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("work")}
              className={`nav-item-link ${
                activeSection === "work" ? "active" : ""
              }`}
            >
              Work
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("contact")}
              className={`nav-item-link ${
                activeSection === "contact" ? "active" : ""
              }`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
