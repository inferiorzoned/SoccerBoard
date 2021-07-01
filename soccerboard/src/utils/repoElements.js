import http from "../services/httpService";
// import { trainingRepoData } from './repoElements';

const apiEndpoint = "/repos/BUET";

export const trainingCategories = [
  "Passing",
  "Attack",
  "Defense",
  "Shooting",
  "Keeping",
];

// console.log(":hello");

export async function getTrainingRepoCategoryData() {
  console.log("function er vi");
  const httpData = await http.get(apiEndpoint);

  let trainingRepoCategoryData = {};
  let epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";

  console.log(httpData);
  console.log(httpData["data"]);
  console.log(typeof httpData);
  console.log(typeof httpData["data"]);
  // httpData = JSON.parse(httpData["data"]);
  Object.keys(httpData["data"]).forEach((key) => {
    console.log(httpData["data"][key]);
    trainingCategories.forEach((category) => {
      if (httpData["data"][key]["trainingCategoryName"] === category) {
        // data.push(httpElement[data]);
        trainingRepoCategoryData[category] = httpData["data"][key]["data"];
      }
    });
  });

  // httpData.forEach((httpElement) => {
  //   trainingCategories.forEach((category) => {
  //     if (httpElement["trainingCategoryName"] === category) {
  //       // data.push(httpElement[data]);
  //       trainingRepoCategoryData[category] = httpElement["data"];
  //     }
  //   });
  // });

  console.log("hello ", trainingRepoCategoryData);
  return trainingRepoCategoryData;
}