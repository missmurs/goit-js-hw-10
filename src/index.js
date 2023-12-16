import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds()
  .then(breeds => {
    select.style.display = 'block';

    loader.style.display = 'none';
    const cats = breeds
      .map(
        breed => `
    <option value="${breed.id}">${breed.name}</optiom>
    `
      )
      .join('');

    select.insertAdjacentHTML('beforeend', cats);
  })
  .catch(error => {
    Notiflix.Notify.failure();
  });

select.addEventListener('change', function () {
  const selectedBreedId = this.value;

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      const catData = breeds[0];
      catInfo.innerHTML = `
      <div style="display: flex; flex-direction: row;">
      <div style="flex">
        <img src="${catData.url}" style="border: 1px solid black; width: 450px;" />
      </div>
      <div style=" padding-left: 10px;">
        <h1>${catData.breeds[0].name}</h1>
        <p>${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      </div>
    </div>
        `;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
