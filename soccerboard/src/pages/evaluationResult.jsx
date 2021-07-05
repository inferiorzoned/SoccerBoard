import React from "react";
import EvaluationResultTable from "../components/evaluationResultTable";
import SideBar from "../components/sideBar";

const EvaluationResult = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"evaluationResult"} />
        </div>
        <div className="col-sm-10 mt-5">
          <EvaluationResultTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default EvaluationResult;
