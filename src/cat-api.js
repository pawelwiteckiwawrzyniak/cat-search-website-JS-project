import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_IAfRKBRijuRYsfTDiogtalD8L3THTk8gLAf7i6SHMRCYUB3uVG5hQFSd4xFtbds1';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
}
