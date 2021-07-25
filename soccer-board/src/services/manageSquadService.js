import http from "./httpService";

const epFormations = "/formations/BUET";
const epSquads = "/squads/BUET";

export async function getFormations() {
  const { data } = await http.get(epFormations);
  return data;
}

export async function getFormation(formationId) {
  const { data } = await http.get(epFormations + "/" + formationId);
  return data;
}

export async function getSquads() {
  const { data } = await http.get(epSquads);
  return data;
}

export async function getSquad(formationId) {
  const { data } = await http.get(epSquads + "/" + formationId);
  return data;
}

const exportedApi = {
  getFormations,
  getFormation,
  getSquads,
  getSquad,
};

export default exportedApi;
