import React, { Component } from "react";
import _ from "lodash";
import Table from "./commons/table";
import { getResults } from "../services/evaluationResultService";

class EvaluationResultTable extends Component {
  state = {
    sessions: [],
  };

  columns = [
    {
      path: "sessionName",
      label: "Session",
    },
    {
      path: "attendance",
      label: "Attendance",
    },
    {
      path: "marks",
      label: "Marks",
    },
  ];

  componentDidMount() {
    let sessions = [...getResults()];
    sessions = sessions.map((s) => {
      s.attendance = s.present + " / " + s.iterations;
      return s;
    });
    this.setState({ sessions: sessions });
  }

  render() {
    const { sessions } = this.state;
    return (
      <div className="container">
        <Table
          columns={this.columns}
          data={sessions}
          tableClassName="evaluation-table"
        />
      </div>
    );
  }
}

export default EvaluationResultTable;
