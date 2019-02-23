import React, { Component } from "react";
import axios from "axios";
import Alert from "../Alert";
import TflForm from "../TflForm";
import TflList from "../TflList";

import "./App.scss";

class App extends Component {
  state = {
    journeys: [],
    from: "",
    to: "",
    api_key: null,
    isLoading: false,
    showResult: true,
    error: ""
  };

  // gets fired up by Alert component. api_key comes from Alert component
  saveAPIKey = api_key => {
    this.setState({
      api_key: api_key
    });

    console.log("Key From Input is: ", api_key);
  };

  // get fired up by API request. If isLoading is true, a loader animation shows
  handleIsLoading = () => {
    this.setState({
      isLoading: true,
      showResult: false
    });
  };

  // The API request - e comes from TflForm component. api_key from Alert component
  getData = async (e, api_key) => {
    // console.log("This is e: ", e);
    e.preventDefault();

    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;

    // Handling date
    let date = e.target.elements.date.value.split("/").join(""); // 16 02 2019
    date = date.replace(/(\d{2})(\d{2})(\d{4})/, "$3$2$1"); // 2019 02 16

    // Handling time
    let time = e.target.elements.time.value.split(":").join("");
    if (time.length === 6) {
      time = time.slice(0, 3); // take the first 3 characters to get rid of am or pm
      time = `0${time}`; // add a 0 before the time. 135 becomes 0135
    } else {
      time = time.slice(0, 4); // if time.length is more than 6, it means that the hour has already 2 digits
    }
    // console.log(time);

    const journeyPreference = e.target.elements.journeyPreference.value;

    // Handling checkboxes
    // We first make an array with every elements name you wish to take,
    // filter only the ones that are checked,
    // and compose our final strings with all the remaining names put together with a , using join.
    let mode = ["tube", "bus", "overground"].filter(
      key => e.target.elements[key].checked
    );
    // joining remaining array members via ,
    mode = mode.join(",");

    // console.log("This is mode:", mode);

    console.log("Key From Env is: ", process.env.REACT_APP_TFL_API_KEY);
    console.log("Key From state: ", this.state.api_key);

    const URL = "https://api.tfl.gov.uk/Journey/JourneyResults/";
    const APP_ID = "fc4aaf49";

    // Note: API key is saved in .env and .envdevelopment

    const APP_KEY = process.env.REACT_APP_TFL_API_KEY
      ? process.env.REACT_APP_TFL_API_KEY
      : this.state.api_key;

    try {
      if (from && to) {
        this.handleIsLoading();

        const response = await axios.get(
          `${URL}/${from}/to/${to}?date=${date}&time=${time}&journeyPreference=${journeyPreference}&mode=${mode}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response;
        console.log("Response just came back:", data.data.journeys);

        this.setState({
          journeys: data.data.journeys, // saving rsponse object in journeys
          from: from,
          to: to,
          isLoading: false,
          showResult: true,
          error: ""
        });
      } else {
        this.setState({
          isLoading: false,
          showResult: true,
          error: "Please fill in the starting point and the destination fields!"
        });
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(err.response.data);
        err.response.data.message =
          err.response.status === 500 || 300
            ? (err.response.data.message =
                "Journey planner could not find any results to your search. Please try again")
            : err.response.data.message;
        this.setState({
          isLoading: false,
          showResult: true,
          // error: err.response.status
          error: err.response.data.message
        });
        console.log(`Error status is:  ${err.response.status}`);
        console.log(`Error message is:  ${err.response.data.message}`);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error Request", err.request);
        this.setState({
          isLoading: false,
          showResult: true,
          error: "No response received!"
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message", err.message);
        this.setState({
          isLoading: false,
          showResult: true,
          error:
            "Please make sure that you enter a valid API Key from TFL. Please reload the page and try again."
        });
      }
      console.log("Error Config", err.config);
      this.setState({
        isLoading: false,
        showResult: true,
        error:
          "Please make sure that you enter a valid API Key from TFL. Please reload the page and try again."
      });
    }
  };

  render() {
    const loaderClass = this.state.isLoading ? "loader-container" : "";
    const resultClass = !this.state.showResult ? "hide" : "result";

    return (
      <>
        <div className="container-fluid">
          <div className="header">
            <h1>TFL Route Planer</h1>
          </div>

          <div className="row">
            <div className="col-md-4 form-container">
              {!this.state.api_key && (
                <Alert
                  passAPIKey={this.saveAPIKey}
                  api_key={api_key => this.state.api_key(api_key)}
                />
              )}
              {this.state.api_key && (
                <TflForm
                  // onHandleIsLoading={this.handleIsLoading}
                  formSubmit={this.getData}
                />
              )}
            </div>

            <div className="col-md-8 result-container">
              <div className={loaderClass}>
                <div className={resultClass}>
                  {!this.state.error && (
                    <TflList
                      journeys={this.state.journeys}
                      from={this.state.from}
                      to={this.state.to}
                    />
                  )}
                  {this.state.error && (
                    <div className="error-container">
                      Error:
                      <p>{this.state.error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
