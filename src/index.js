/* 'api_key=live_IAfRKBRijuRYsfTDiogtalD8L3THTk8gLAf7i6SHMRCYUB3uVG5hQFSd4xFtbds1' */

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_IAfRKBRijuRYsfTDiogtalD8L3THTk8gLAf7i6SHMRCYUB3uVG5hQFSd4xFtbds1';

const selectDrop = document.querySelector('.breed-select');
const divInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader_div');
const loaderText = document.querySelector('.loader_text');
loader.classList.add('hidden');

function renderBreeds(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  selectDrop.innerHTML = markup;
  selectDrop.classList.remove('hidden');
  loader.classList.add('hidden');
}

function renderAnimal(animal) {
  const markup = animal.map(animal => {
    return `
    <img class="cat-info__image" src="${animal.url}" alt="cat">
    <div class="cat-info__description">
    <h1>${animal.breeds[0].name}</h1>
    <p>${animal.breeds[0].description}</p>
    <p>>${animal.breeds[0].temperament}</p>
    </div>
    `;
  });
  divInfo.innerHTML = markup;
  divInfo.classList.remove('hidden');
  loader.classList.add('hidden');
  if (divInfo.innerHTML == '') {
    loader.classList.remove('hidden');
    loaderText.innerHTML = `This animal seems to have disappeared from our records. There's nothing here. But you can watch the loading icon if u want...`;
  }
}

function setUpPage() {
  selectDrop.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchBreeds()
    .then(breeds => {
      renderBreeds(breeds);
      new SlimSelect({
        select: selectDrop,
      });
    })
    .catch(error => {
      console.error(error);
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function handleChange(event) {
  loaderText.innerHTML = 'Loading data, please wait...';
  divInfo.classList.add('hidden');
  loader.classList.remove('hidden');
  fetchCatByBreed(event.currentTarget.value)
    .then(animal => renderAnimal(animal))
    .catch(error => {
      console.error(error);
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

setUpPage();
selectDrop.addEventListener('change', handleChange);
