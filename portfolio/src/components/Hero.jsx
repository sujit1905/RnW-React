import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Hero.css";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
];

function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((index + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };


const scrollToContact = () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
};


  return (
    <section
      id="hero"
      className="hero-section d-flex align-items-center text-center"
    >
      <div className="overlay"></div>

      <div className="container position-relative text-white">
        <p className="fs-5 mb-2">Welcome</p>

        <h1 className="display-4 fw-bold">
          I'm <span className="typing-text">{text}</span>
        </h1>

        <button
          className="hire-button px-4 py-2 mt-3 rounded-pill"
          onClick={scrollToContact}
        >
          Hire Me
        </button>

        {/* DOWN ARROW */}
        <div className="down-arrow" onClick={scrollToAbout}>
          <FaChevronDown />
        </div>
      </div>
    </section>
  );
}

export default Hero;
