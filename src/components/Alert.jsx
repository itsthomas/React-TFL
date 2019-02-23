import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

// Creating custom dialog alerts using React-Bootstrap-Sweetalert
// http://djorg83.github.io/react-bootstrap-sweetalert/

class Alert extends Component {
  state = {
    alert: null // initialising an empty alert
  };

  // Defining first alert
  showAlert() {
    const getAlert = api_key => (
      <SweetAlert
        input
        showCancel
        confirmBtnText="Confirm"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="info"
        placeholder="Type your API Key"
        customClass="sweetalert"
        title="Please add your TFL API-Key"
        onConfirm={api_key => this.addAPIKey(api_key)}
        onCancel={() => this.closeAlert()}
      >
        For this site to work, you need an API Key
      </SweetAlert>
    );

    this.setState({
      alert: getAlert() // Fires up the dialog box
    });
  }

  addAPIKey(api_key) {
    // console.log(e);
    this.setState({
      alert: null // This will colse the dialog window
    });

    // console.log(`Am I here: `, e);
    this.props.passAPIKey(api_key);
  }

  closeAlert() {
    this.setState({
      alert: null // This will colse the dialog window
    });
  }

  componentDidMount() {
    this.showAlert();
  }

  render() {
    return <>{this.state.alert}</>;
  }
}

export default Alert;
