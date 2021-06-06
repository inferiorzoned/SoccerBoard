import http from "./httpService";

const epFormInstitions = "/applications/form";
const epUploadImage = "/medias";
const epUploadForm = "/applications";

export async function getInstitutions() {
  const { data: institutions } = await http.get(epFormInstitions);
  return institutions;
}

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

export async function uploadForm(form) {
  const { data } = await http.post(epUploadForm, form);
  return data;
}
