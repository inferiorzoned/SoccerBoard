import http from "./httpService";

const epEval = "/evaluations";
const qInfo = "evalType=info";

export async function getSessionNPlayers(sessionId) {
  let { data } = await http.get(epEval + "/" + sessionId + "?" + qInfo);

  data.players = data.players.map((p) => ({
    _id: p._id,
    name: p.name,
    position: p.positions[0],
  }));

  return data;
}

export async function uploadEvaluation(evaluation) {
  console.log(evaluation);
}
