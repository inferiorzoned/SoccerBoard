import http from "./httpService";

const epCheckStatus = "/applications/check_status";

const applicants = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Mir Mahathir",
    email: "mahathir@gmail.com",
    mobile: "01745678712",
    status: "submitted",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Shahrar Swapnil",
    email: "shahrar@gmail.com",
    mobile: "01745167712",
    status: "processing",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Hasibul Hisham",
    email: "hisham@gmail.com",
    mobile: "01737678712",
    status: "accepted",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Joe Biden",
    email: "jobaiden@gmail.com",
    mobile: "01737420420",
    status: "rejected",
  },
];

export async function getApplicantionStatus(query) {
  const { data } = await http.post(epCheckStatus, query);
  return data;
  // if (query.email) {
  //   return applicants.find((applicant) => applicant.email === query.email);
  // }
  // if (query.mobile) {
  //   return applicants.find((applicant) => applicant.mobile === query.mobile);
  // }
}
