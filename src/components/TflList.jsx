import React from "react";
import TflItem from "./TflItem";
import Collapsible from "react-collapsible";
import RandomGenerator from "./helpers/randomGenerator";

// Destructuring
const TflList = ({ from, to, journeys }) => {
  const journeyList = journeys.map((journey, index) => {
    // console.log(journeyList);
    // console.log(journey);
    return (
      <Collapsible
        className="Collapsible-title"
        trigger={`Option ${index + 1}`}
        key={RandomGenerator()}
      >
        {/* We pass journey array to TflItem
        each array member contains a seperate journey option.
        Inside TflItem.jsx, each array member get rendered
        And finally get displayed here via TflItem */}
        <TflItem singleJourney={journey} from={from} to={to} />
      </Collapsible>
    );
  });

  return <div>{journeyList}</div>;
};

export default TflList;
