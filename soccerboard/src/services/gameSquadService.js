import authService from "./authService";
import http from "./httpService";

let user = authService.getCurrentUser();
user = { institution: "BUET" };
const epFormations = "/formations";
const epSquad = "/squads";
const epUploadAudio = "/medias";

export async function getFormations() {
  const { data } = await http.get(epFormations + "/" + user.institution);
  return data;
}

export async function getFormation(formationId) {
  const { data } = await http.get(
    epFormations + "/" + user.institution + "/" + formationId
  );
  return data;
}

export async function getCurrentSquad() {
  const { data } = await http.get(epSquad + "/" + user.institution);
  return data;
}

export async function getSquad(squadId) {
  const { data } = await http.get(
    epSquad + "/" + user.institution + "/" + squadId
  );
  return data;
}

export async function createFormation(formation) {
  const { data } = await http.post(
    epFormations + "/" + user.institution,
    formation
  );
  console.log(data);
  return data;
}

export async function updateFormation(formation, formationId) {
  const { data } = await http.put(epFormations + "/" + formationId, formation);
  console.log(data);
  return data;
}

export async function uploadAudio(audioBlob) {
  let axiosConfig = {
    headers: {
      enctype: "multipart/form-data",
    },
  };

  const audioFormData = new FormData();
  audioFormData.append("soundBlob", audioBlob);

  const { data } = await http.post(epUploadAudio, audioFormData, axiosConfig);
  // console.log(data);

  return data;
}

export async function createSquad(formation, squad) {
  const fData = await createFormation(formation);
  console.log(fData);
  squad.formationId = fData._id;

  const { data: sData } = await http.post(
    epSquad + "/" + user.institution,
    squad
  );
  console.log(sData);
  return sData;
}

export async function updateSquad(squadId, squad) {
  for (const player of squad.players) {
    for (const instruction of player.instructions) {
      instruction.contentType = instruction.type;
      delete instruction.type;
      if (instruction.contentType === "audio") {
        const { mediaUrl } = await uploadAudio(instruction.content.blob);
        instruction.content = mediaUrl;
        // console.log(instruction.content);
      }
    }
  }
  console.log(squad);
  const { data } = await http.put(epSquad + "/" + squadId, squad);
  console.log(data);
}

const exportedApi = {
  getFormations,
  getFormation,
  getCurrentSquad,
  getSquad,
};

export default exportedApi;
