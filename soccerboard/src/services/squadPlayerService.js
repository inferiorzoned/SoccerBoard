import http from "../services/httpService";

const apiEndpoint = "/players"

export async function setKit(kit, _id) {
    const {data} = await http.patch(apiEndpoint + "/" + _id);
    return data;
}

export async function deletePlayer(_id) {
    const {data} = await http.delete(apiEndpoint + "/" + _id);
    return data;
}