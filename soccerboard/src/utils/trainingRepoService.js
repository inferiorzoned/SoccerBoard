import http from "../services/httpService";

const apiEndpoint = "/repos";

export async function uploadTraining(trainingRepo) {
  const { data } = await http.post(apiEndpoint + "/BUET", trainingRepo);
  return data;
}

export async function getTraining(_id) {
  const { data } = await http.get(apiEndpoint + "/" + _id);
  return data;
}

export async function editTraining(trainingRepo, _id) {
  console.log("editTraining", trainingRepo);
  const { data } = await http.put(apiEndpoint + "/" + _id, trainingRepo);
  console.log(data);
  return data;
}

const epUploadImage = "/medias";

export async function uploadImage(file) {
  let axiosConfig = {
    headers: {
      enctype: "multipart/form-data",
    },
  };

  const imageFormData = new FormData();
  imageFormData.append("soundBlob", file, file.name);

  const { data } = await http.post(epUploadImage, imageFormData, axiosConfig);

  return data;
}
