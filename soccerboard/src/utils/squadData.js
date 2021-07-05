import http from "../services/httpService";

const apiEndpoint = "/players/BUET";
// const apiEndpoint = "/squads/BUET";

export const squadPositions = [
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards", 
];

function getPositionIndex(pos) {
  // gk = 0 ; def = 1 ; mid = 2 ; for = 3
  // const pos = ["GK", "RB", "RCB", "CB", "LCB", "LB", "RM", "CDM", "CM", "LM", "CAM", "RW",
  //             "ST",  "LW"];
  console.log(pos);
  if (pos === "GK") return 0;
  else if (pos[pos.length - 1] === "B") return 1;
  else if (pos[pos.length - 1] === "M") return 2;
  else return 3;
}

export async function getSquadPositionData() {
  // let epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
  let epMedia = "";
  // epMedia += "/media/hisham/New Volume1/soccerboard_api/uploads/iniesta.jpg";
  // let avatar = await http.get(epMedia);
  // console.log(avatar);

  console.log("function er vi");
  const httpData = await http.get(apiEndpoint);
  console.log(httpData["data"]);
  let squadPositionData = {};

  Object.keys(httpData["data"]).forEach((key) => {
    console.log(httpData["data"][key]);
    let object = {};
    let p = "";
    squadPositions.forEach((position) => {
      // let pos = httpData["data"][key]["position"];
      if (
        position ===
        squadPositions[getPositionIndex(httpData["data"][key]["position"])]
      ) {
        object = {
          playerImage: epMedia + httpData["data"][key]["profile"]["avatar"],
          // playerImage: epMedia,
          _id: httpData["data"][key]["profile"]["_id"],
          kit: httpData["data"][key]["kit"],
          position: httpData["data"][key]["position"],
          name: httpData["data"][key]["profile"]["name"],
          numberOfMatches: httpData["data"][key]["numberOfMatches"],
          gameTime: httpData["data"][key]["gameTime"],
          goals: httpData["data"][key]["goals"],
          assist: httpData["data"][key]["assist"],
          yellows: httpData["data"][key]["yellows"],
          reds: httpData["data"][key]["reds"],
          cleanSheets: httpData["data"][key]["cleanSheets"],
        };
        p = position;
        if(!squadPositionData[p]){
          squadPositionData[p] = [];
        }
        console.log(object);
      }
    });
    squadPositionData[p].push(object);
  });
  console.log(squadPositionData);
  return squadPositionData;
}

export async function getImage() {}

// export const squadPositionData = {
//   Goalkeepers: [
//     {
//       playerImage: pic,
//       kit: "08",
//       position: "CAM",
//       name: "Andres Iniesta",
//       numberOfMatches: 0,
//       gameTime: 0,
//       goals: 0,
//       assist: 0,
//       yellows: 0,
//       reds: 0,
//       cleanSheets: 0,
//     },
//     {
//       playerImage: pic,
//       kit: "10",
//       position: "CAM",
//       name: "Andres Iniesta",
//     },
//     {
//       playerImage: pic,
//       kit: "08",
//       position: "CAM",
//       name: "Andres Iniesta",
//       numberOfMatches: 0,
//       gameTime: 0,
//       goals: 0,
//       assist: 0,
//       yellows: 0,
//       reds: 0,
//       cleanSheets: 0,
//     },
//   ],
//   Defenders: [
//     {
//       playerImage: pic,
//       kit: "08",
//       position: "CAM",
//       name: "Andres Iniesta",
//       gameTime: 0,
//       goals: 0,
//       assist: 0,
//       yellows: 0,
//       reds: 0,
//     },
//     {
//       playerImage: pic,
//       kit: "08",
//       position: "CAM",
//       name: "Andres Iniesta",
//     },
//   ],
//   Midfielders: [
//     {
//       playerImage: pic,
//       kit: "08",
//       position: "CAM",
//       name: "Andres Iniesta",
//     },
//   ],
// };

// // export const squadPositions = ["Goalkeepers", "Defenders", "Midfielders"];

// export const squadData = {
//   squadPositionData: squadPositionData,
//   squadPositions: squadPositions,
// };
