import React, { Component } from "react";
import TflDatePicker from "./helpers/TflDatePicker";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

/* ===============================================
  rc-time-picker settings
  https://www.npmjs.com/package/rc-time-picker
================================================ */
const format = "h:mm a";
// const defaultTime = moment()
//   .hour(0)
//   .minute(0);
const now = new moment();
function onChange(value) {
  // console.log(value && value.format(format));
}

class TflForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.formSubmit}>
          <div className="form-group">
            {/* <label htmlFor="from">From</label> */}
            <input
              type="text"
              className="form-control"
              name="from"
              placeholder="Type your starting point"
              // required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="to">To</label> */}
            <input
              type="text"
              className="form-control"
              name="to"
              placeholder="Type your destination"
              // required
            />
          </div>

          <div className="form-group">
            <div>Select Date</div>
            <TflDatePicker name="date" />
          </div>

          <div className="form-group">
            <div>Select Time</div>
            <TimePicker
              name="time"
              showSecond={false}
              defaultValue={now}
              className="xxx"
              onChange={onChange}
              format={format}
              use12Hours={false}
              inputReadOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="journeyPreference">Journey preference</label>
            <select className="form-control" name="journeyPreference">
              <option value="leasttime">Least time</option>
              <option value="leastinterchange">Least interchange</option>
              <option value="leastwalking">Least walking</option>
            </select>
          </div>
          <div className="form-group">
            Select your prefered mode
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="tube"
                name="tube"
                // defaultChecked
              />
              <label className="form-check-label" htmlFor="tube">
                Tube
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="bus"
                name="bus"
              />
              <label className="form-check-label" htmlFor="bus">
                Bus
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="overground"
                name="overground"
              />
              <label className="form-check-label" htmlFor="overground">
                Overground
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={this.onHandleIsLoading}
          >
            Plan my journey
          </button>
        </form>
      </div>
    );
  }
}

export default TflForm;
