/*http://localhost:3900/api/medias/image?mediaUrl=*/
import { getCurrentUser } from "./authService";
import http from "./httpService";
const apiEndpoint = "/reports";

export async function submitReport(body) {
  if (body.subject && body.report) {
    // const institution = getCurrentUser().institution;
    console.log(getCurrentUser());
    let reportBody = { ...body };
    reportBody.name = getCurrentUser().name;
    reportBody.userId = getCurrentUser()._id;
    console.log(reportBody);
    const { data } = await http.post(
      apiEndpoint + "/" + getCurrentUser().institution,
      reportBody
    );
    return data;
  } else return null;
}

export async function getReports() {
  const institution = getCurrentUser().institution;
  return await http.get(apiEndpoint + "/" + institution);
}
