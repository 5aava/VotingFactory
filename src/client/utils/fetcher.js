import axios from 'axios';


export default async function fetcher (body, url = '/api/auth'){
  return await axios.post(url, body)
  .then(function (response) {
    return response.data;
  })
  .catch(err => console.warn(err));
}
