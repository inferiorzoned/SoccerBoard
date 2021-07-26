import http from "../services/httpService";

const apiEndpoint = "/trainingSessions";

export async function uploadSession(session) {
  console.log("Uploading session: " + session.name);
  const { data } = await http.post(apiEndpoint + "/BUET", session);
  console.log(data);
  return data;
}

export async function getAllSessions() {
    const {data} = await http.get(apiEndpoint + "/BUET/all");
    console.log(data);
    return data;
}