import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./commons/form";
import { submitReport } from "../services/reportService";
class ReportForm extends Form {
  state = {
    data: {
      subject: "",
      report: "",
    },
    errors: {},
    schema: {
      subject: Joi.string().required().label("Subject"),
      report: Joi.string().label("Report"),
    },
  };

  async componentDidMount() {
    //do nothing
  }

  doSubmit = async () => {
    // console.log(form);
    try {
      const submittedReport = await submitReport(this.state.data);
      console.log(submittedReport);
      if (submittedReport) {
        toast.success("Report Submitted");
        // window.location = "/application-status";//should be set
      }
    } catch (ex) {
      toast.error("Something Wrong!");
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="col">
          <div className="row-1">{this.renderInput("subject", "Subject")}</div>
          <div className="row-1">
            {this.renderMultilineInput("report", "Report")}
          </div>
          <div className="text-center py-3">
            {this.renderButton("SEND", (e) => this.handleSubmit(e))}
          </div>
        </div>
      </div>
    );
  }
}

export default ReportForm;
