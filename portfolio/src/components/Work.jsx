import "./Work.css";
import fastrack from "../assets/image1.png";
import bank from "../assets/image2.png";
import agency from "../assets/image3.png";
import portfolio from "../assets/image.png";

const projects = [
  {
    title: "Fastrack Clone Website",
    image: fastrack,
    code: "https://github.com/sujit1905/Rnw_htmlCssCC-/tree/main/Bootstrap/fastrack",
    live: "https://fastrackclone.sujitmecwan.com",
  },
  {
    title: "Bank Interface Website",
    image: bank,
    code: "https://github.com/sujit1905/react-bank-web",
    live: "https://bank.sujitmecwan.com",
  },
  {
    title: "Agency Website",
    image: agency,
    code: "https://github.com/sujit1905/agency-web-htmlcss",
    live: "https://agency.sujitmecwan.com",
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    code: "https://github.com/sujit1905/NEXT_portfolio/tree/main/portfolio-2.0-main",
    live: "https://sujitmecwan.com",
  },
];

function Work() {
  return (
    <section id="work" className="work-section text-white">
      <div className="container">
        {/* TITLE */}
        <div className="section-header text-center">
          <h2 className="section-main-title">My Work</h2>
          <span className="section-bg-title">PROJECTS</span>
        </div>

        {/* PROJECT GRID */}
        <div className="row g-4">
          {projects.map((project, index) => (
            <div className="col-md-6" key={index}>
              <div className="work-card">
                <img src={project.image} alt={project.title} />

                <div className="work-overlay">
                  <h5>{project.title}</h5>

                  <div className="work-buttons">
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light btn-sm"
                    >
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      Live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
