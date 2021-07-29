// import List from "@material-ui/core/List";
import React, { Component } from "react";
import { List } from "semantic-ui-react";

/*
 * props:
 * logs: array of logs
 * log: {info: "", description: "", date: ""}
 * setLogPopup: function to close popup
 */

class Logs extends Component {
  state = {};
  render() {
    const { setLogPopup, logs } = this.props;
    console.log(logs);
    // return <List>{this.props.logs.map((log, index) => ({ log }))}</List>;
    return (
      <div className="trainee-popup">
        <div className="popup-x" onClick={() => setLogPopup(false)}>
          X
        </div>
        <div className="trainee-list">
          <List divided animated size="large">
            {logs.map((log, index) => (
              <List.Item>
                <List.Content>
                  <List.Header>{log.info}</List.Header>
                  <List.Description>{log.description}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    );
    // return <div>hello</div>;
  }
}

export default Logs;
