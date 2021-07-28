import React, { Component } from "react";
import _ from "lodash";
import Table from "./commons/table";
import { getReports } from "../services/reportService";

class ReportTable extends Component {
  state = {
    reports: [],
  };
  columns = [
    {
      path: "name",
      label: "Name",
      content: (data) => <div>{data.name}</div>,
    },
    {
      path: "date",
      label: "Date",
      content: (data) => <div>{data.date}</div>,
    },
    {
      path: "report",
      label: "Report",
      content: (data) => <div>{data.report}</div>, // set link to show in the side
    },
  ];

  async componentDidMount() {
    const { data: reports } = await getReports(); // send institution name or taken from props
    this.setState({ reports });
  }

  onCheckboxChange = (applicant, e) => {
    const { onSelectionChange } = this.props;
    let { acceptedIds, rejectedIds } = this.state;
    if (e.target.name === "accept") {
      if (!e.target.checked) {
        acceptedIds = acceptedIds.filter((id) => id !== applicant._id);
      } else {
        rejectedIds = rejectedIds.filter((id) => id !== applicant._id);
        acceptedIds = [...acceptedIds, applicant._id];
      }
    } else if (e.target.name === "reject") {
      if (!e.target.checked) {
        rejectedIds = rejectedIds.filter((id) => id !== applicant._id);
      } else {
        acceptedIds = acceptedIds.filter((id) => id !== applicant._id);
        rejectedIds = [...rejectedIds, applicant._id];
      }
    }
    onSelectionChange(acceptedIds, rejectedIds);
    this.setState({ acceptedIds: acceptedIds, rejectedIds: rejectedIds });
  };

  render() {
    const { applicants, onSort, sortColumn, onRowClicked } = this.props;

    return (
      <Table
        columns={this.columns}
        data={this.state.reports}
        sortColumn={sortColumn}
        onSort={onSort}
        onRowClicked={onRowClicked}
      />
    );
  }
}

export default ReportTable;
