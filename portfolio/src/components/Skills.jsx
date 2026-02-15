import htmlIcon from "../assets/icons8-html-5.svg";
import cssIcon from "../assets/icons8-css3.svg";
import jsIcon from "../assets/icons8-javascript.svg";
import reactIcon from "../assets/icons8-react-native.svg";
import bootstrapIcon from "../assets/icons8-bootstrap.svg";
import nodeIcon from "../assets/icons8-nodejs.svg";
import mongoIcon from "../assets/icons8-mongodb.svg";
import gitIcon from "../assets/icons8-git.svg";

import "./Skills.css";

const skills = [
  { name: "HTML5", icon: htmlIcon },
  { name: "CSS3", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "MongoDB", icon: mongoIcon },
  { name: "Git", icon: gitIcon },
];

function Skills() {
  return (
    <section id="skills" className="skills-section text-white">
      <div className="container">
        {/* TITLE */}
        <div className="section-header text-center">
          <h2 className="section-main-title">My Skills</h2>
          <span className="section-bg-title">SKILLS</span>
        </div>

        {/* SLIDER */}
        <div className="skills-slider pt-5">
          <div className="skills-track">
            {[...skills, ...skills].map((skill, index) => (
              <div className="skill-card" key={index}>
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
