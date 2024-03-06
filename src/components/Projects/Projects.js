import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import keep from "../../Assets/Projects/keep.jpg";
import blog from "../../Assets/Projects/blog.png";
// import editor from "../../Assets/Projects/codeEditor.png";
import Duplexa from "../../Assets/Projects/Duplexa.png";
// import suicide from "../../Assets/Projects/suicide.png";
// import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Duplexa}
              isBlog={false}
              title="Data Redundancy Removal Algorithm"
              description="Duplexa, powered by React, combines a Python backend and React frontend to streamline data redundancy removal. This web app optimizes storage, enhances data integrity, and provides a user-friendly interface for efficient data management. Simplify redundancy challenges with Duplexa."
              ghLink="https://github.com/AnishMane/Duplexa.git"
              //demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={keep}
              isBlog={false}
              title="Google Keep Replica"
              description="This project is a replica of Google Keep, a note-taking application developed by Google. It provides similar functionalities for creating, editing, and organizing notes in a user-friendly interface."
              ghLink="https://github.com/AnishMane/Google-Keep-Replica-Project.git"
              //demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blog}
              isBlog={false}
              title="Blog API"
              description="Created a Blog API and used it to power my website, making it easy to publish and manage blog content."
              ghLink="https://github.com/AnishMane/Blog-API-Project.git"
              //demoLink=""              
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
