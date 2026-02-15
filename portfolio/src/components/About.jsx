import { useEffect, useRef, useState } from "react";
import "./About.css";

function About() {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const counters = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 250, suffix: "+", label: "Happy Clients" },
    { value: 650, suffix: "+", label: "Projects Done" },
    { value: 38, suffix: "", label: "Get Awards" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section text-white">
      <div className="container">
        {/* TITLE */}
        <div className="section-header text-center">
          <h2 className="section-main-title">Know Me More</h2>
          <span className="section-bg-title">ABOUT ME</span>
        </div>

        {/* CONTENT */}
        <div className="row about-middle">
          {/* LEFT */}
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h3>
              I'm <span className="highlight">Sujit Mecwan</span>, a Web
              Developer
            </h3>

            <p>
              I design and develop modern, responsive web applications that
              deliver real value. I focus on clean code, performance, and
              user-friendly experiences.
            </p>

            <p>
              My goal is to turn ideas into scalable and impactful digital
              solutions while meeting client requirements on time.
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-lg-5">
            <div className="about-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">Sujit Mecwan</span>
              </div>

              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value highlight">
                  mecwansujit@gmail.com
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">21</span>
              </div>

              <div className="info-item">
                <span className="info-label">From:</span>
                <span className="info-value">Anand, Gujarat</span>
              </div>

              <a
                href="/Sujit_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success rounded-pill px-4 mt-4"
              >
                View CV
              </a>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div ref={statsRef} className="row text-center stats mt-5">
          {counters.map((item, index) => (
            <CounterBox
              key={index}
              target={item.value}
              suffix={item.suffix}
              label={item.label}
              start={startCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;

/* COUNTER COMPONENT */
function CounterBox({ target, suffix, label, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 1500;
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(startValue));
      }
    }, 20);

    return () => clearInterval(counter);
  }, [start, target]);

  return (
    <div className="col-md-3">
      <h2>
        {count}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}
