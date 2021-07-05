import React from "react";
import EvaluationTable from "../components/evaluationTable";
import SideBar from "../components/sideBar";

const Evaluation = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"evaluation"} />
        </div>
        <div className="col-sm-10 mt-5">
          <EvaluationTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Evaluation;
