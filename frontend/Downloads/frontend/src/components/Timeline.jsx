import React from "react";
import "./Timeline.css";

const Timeline = ({ currentStep = 0 }) => {
  const steps = [
    {
      title: "Submitted",
      description: "Problem submitted",
    },
    {
      title: "Under Review",
      description: "Problem is being reviewed",
    },
    {
      title: "Accepted",
      description: "Challenge accepted",
    },
    {
      title: "In Progress",
      description: "Solution is being developed",
    },
    {
      title: "Completed",
      description: "Solution implemented",
    },
  ];

  return (
    <div className="timeline-container">
      <h2 className="timeline-heading">Project Timeline</h2>

      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-step" key={index}>
            
            <div
              className={`timeline-circle ${
                index <= currentStep ? "completed" : ""
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`timeline-line ${
                  index < currentStep ? "completed-line" : ""
                }`}
              ></div>
            )}

            <div className="timeline-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;