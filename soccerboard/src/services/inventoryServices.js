import http from "../services/httpService";
const epUploadImage = "/medias";

const apiEndpoint = "/items";

export async function getAllItems() {
    const {data} = await http.get(apiEndpoint + "/BUET?iType=all");
    return data;
}

export async function getLatestItems() {
    const {data} = await http.get(apiEndpoint + "/BUET?iType=latest");
    return data;
}

export async function uploadItems(items) {
    console.log(items);
    const {data} = await http.post(apiEndpoint + "/BUET", items);
    console.log(data);
    return data;
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
  