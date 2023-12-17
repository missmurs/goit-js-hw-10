import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

select.style.visibility = 'hidden';
error.style.visibility = 'hidden';

fetchBreeds()
  .then(breeds => {
    select.style.visibility = 'visible';
    loader.style.display = 'none';

    const cats = breeds
      .map(
        breed => `
    <option value="${breed.id}">${breed.name}</optiom>
    `
      )
      .join('');

    select.insertAdjacentHTML('beforeend', cats);
    new SlimSelect({
      select: select,
    });
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

select.addEventListener('change', function () {
  const selectedBreedId = this.value;

  loader.style.display = '';

  catInfo.innerHTML = '';

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      loader.style.display = 'none';
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
