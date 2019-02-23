import React from "react";
import Collapsible from "react-collapsible";
import RandomGenerator from "./helpers/randomGenerator";

// Destructuring
const TflItem = ({ from, to, singleJourney }) => {
  // console.log(singleJourney);
  // console.log(singleJourney.legs);

  const totalDuration = singleJourney.duration;
  let startingJourney = singleJourney.startDateTime;

  startingJourney = startingJourney.replace(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2})/g,
    "$3.$2.$1 at $4"
  );

  // console.log(startingJourney);

  // ================================================================

  const journey = singleJourney.legs.map((item, index) => {
    // console.log(item.instruction.summary);
    // console.log(item.arrivalPoint);
    return (
      <div key={RandomGenerator()} className="container">
        <div className="row">
          <div className="col instruction">
            <div className="instruction-title">
              {item.instruction.summary}
              <span className="minutes">{item.duration} min</span>
            </div>
            Until you arrive at {item.arrivalPoint.commonName}
          </div>
        </div>
      </div>
    );
  });

  // ================================================================

  // Ther's another array inside singleJourney.legs[0].instruction called steps - steps[0, 1, 2]
  // hence we need a nested map to loop through these nested Array.
  const detailedJourney = singleJourney.legs.map(subArray => {
    return subArray.instruction.steps.map(detail => {
      return (
        <li key={RandomGenerator()}>
          {detail.descriptionHeading} {detail.description}
        </li>
      );
    });
  });

  return (
    <>
      <div className="step">
        <div className="journey-header">
          <strong>From:</strong> {from}
          <br />
          <strong>To:</strong> {to}
          <br />
          <strong>Leaving:</strong> {startingJourney}
          <br />
          <strong>Total journey time:</strong> {totalDuration} minutes
        </div>
        {journey}
      </div>
      <Collapsible
        className="Collapsible-title"
        trigger="Click here to see more details"
      >
        <div>{detailedJourney}</div>
      </Collapsible>
    </>
  );
};

export default TflItem;
