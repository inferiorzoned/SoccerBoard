/*http://localhost:3900/api/medias/image?mediaUrl=*/

const baseURL = process.env.REACT_APP_API_URL;
const mediaEndPoint = baseURL+"/medias/image?mediaUrl=";

export function renderMediaUrl(mediaUrl){
    return mediaEndPoint + mediaUrl;
}