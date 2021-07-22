import React, { Component } from "react";
import _ from "lodash";
import Table from "./commons/table";

class RecruitTable extends Component {
  state = {
    acceptedIds: [],
    rejectedIds: [],
  };
  columns = [
    {
      path: "name",
      label: "Name",
      content: (applicant) => <div>{applicant.name}</div>,
    },
    {
      path: "accept",
      label: "Accept",
      content: (applicant) => (
        <input
          className="form-check-input"
          type="checkbox"
          name="accept"
          value={applicant._id}
          aria-label="checkbox-for-acceptance"
          checked={
            _.includes(this.state.acceptedIds, applicant._id) &&
            !_.includes(this.state.rejectedIds, applicant._id)
          }
          onChange={(e) => this.onCheckboxChange(applicant, e)}
        />
      ),
    },
    {
      path: "reject",
      label: "Reject",
      content: (applicant) => (
        <input
          className="form-check-input"
          type="checkbox"
          name="reject"
          value={applicant._id}
          aria-label="checkbox-for-rejection"
          checked={
            _.includes(this.state.rejectedIds, applicant._id) &&
            !_.includes(this.state.acceptedIds, applicant._id)
          }
          onChange={(e) => this.onCheckboxChange(applicant, e)}
        />
      ),
    },
  ];

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
        data={applicants}
        sortColumn={sortColumn}
        onSort={onSort}
        onRowClicked={onRowClicked}
        tableClassName="table recruit-table"
      />
    );
  }
}

export default RecruitTable;
