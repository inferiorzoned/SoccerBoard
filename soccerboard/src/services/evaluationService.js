import http from "./httpService";
import auth from "./authService";

const user = auth.getCurrentUser();

const epEval = "/evaluations";
const qInfo = "evalType=info";

export async function getSessionNPlayers(sessionId) {
  let { data } = await http.get(epEval + "/" + sessionId + "?" + qInfo);

  data.players = data.players.map((p) => ({
    _id: p._id,
    name: p.name,
    position: p.positions[0],
  }));
  console.log(data);
  return data;
}

export async function uploadEvaluation(evaluation) {
  const { data } = http.patch(epEval + "/" + user.institution, evaluation);
  console.log(data);
  return data;
}
