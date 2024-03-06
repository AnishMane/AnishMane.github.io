import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Anish </span>
            from <span className="purple"> Maharashtra, India.</span>
            <br />
            I am currently pursuing my Bachelor's Degree.
            <br />
            {/* I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
            Mesra. */}
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Video Editing
            </li>
            <li className="about-activity">
              <ImPointRight /> Sleeping
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Thinking about doing the thing is not doing the thing ! "{" "}
          </p>
          <footer className="blockquote-footer">Anish</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
