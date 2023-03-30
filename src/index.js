import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

// const API_KEY = '34843304-df170f32d723ce0de6453f0ca';
// const BASE_URL = 'https://pixabay.com/api';
// const PER_PAGE = 40;
// let page = 1;


// const searchForm = document.querySelector("#search-form");
// const input = document.querySelector("input");
// const searchButton = document.querySelector("button");
// const loadMoreButton = document.querySelector(".load-more");
// const gallery = document.querySelector(".gallery");


// searchForm.addEventListener("submit", createGallery);
// loadMoreButton.addEventListener("click", loadMoreImages);


// // Функция для кнопки "Load-more". До первого запроса скрывает кнопку.
// function hideBtn() {
//     if(page === 1) {
//         loadMoreButton.classList.add("is-hidden"); 
//     }
// }

// hideBtn();

// // Функция для слушателя на кнопку "Search"
// function createGallery(event) {
//     if (!loadMoreButton.classList.contains('is-hidden') && page > 1) {
//         loadMoreButton.classList.add('is-hidden');
//     }
  
//     resetPageCount();
//     clearMarkup();
//     getImages(event);
//   }

// // Функция для слушателя на кнопку "Load-more"
// function loadMoreImages(event) {
//     getImages(event);
//   }
  
//   // Получение картинок
//   function getImages(event) {
//     event.preventDefault();
  
//     const value = input.value;
//     console.log(value);
  
//     getData(value)
//       .then(response => {
//         data(response);
//       })
//       .catch(error => console.log(error.message));
//   }
  
// function data(response) {
//     const img = response.data.hits;
//     renderGallery(img);
//   }

// async function getData(searchword) {
//     const search = searchword.trim();
  
//     try {
//       if (search === '') {
//         Notify.warning('Please type in the field what you want to find');
//         clearMarkup();
//         return;
//       }
//       const response = await axios.get(
//         `${API}/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
//       );
  
//       if (page === 1 && response.data.totalHits > 0) {
//       Notify.success(
//           `Hooray! We found ${response.data.totalHits} images`
//         );
//        loadMoreButton.classList.remove('is-hidden');
//       }
  
//       if (
//         page >= response.data.totalHits / PER_PAGE &&
//         response.data.totalHits > 0
//       ) {
//         Notify.warning(
//           "We're sorry, but you've reached the end of search results."
//         );
//         loadMoreButton.classList.add('is-hidden');
//       }
  
//       if (response.data.hits.length === 0) {
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again'
//         );
//         return;
//       }
  
//       page += 1;
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // Функция для сброса счетчика страниц
// function resetPageCount() {
//     page = 1;
//   }
  
//   // Рэндеринг галлереи
//   function renderGallery(pictureArray) {
//     const imgMarkup = pictureArray
//       .map(
//         ({
//           webformatURL,
//           largeImageURL,
//           tags,
//           likes,
//           views,
//           comments,
//           downloads,
//         }) => {
//           return `
//             <div class="photo-card">
//             <a class="gallery-item" href="${largeImageURL}">
//       <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__image"/>  
//       <div class="info">
//         <p class="info-item">
//           <b>Likes : ${likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments: ${comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads: ${downloads}</b>
//         </p>
//       </div>
//     </div> </a>
//     `;
//         }
//       )
//       .join('');
//    gallery.insertAdjacentHTML('beforeend', imgMarkup);
//    console.log(imgMarkup);
//   }
  
//   // Очистка галлереи
//   function clearMarkup() {
//     gallery.innerHTML = '';
//   }
  // =========================

const refs = {
    mainForm: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    searchButton: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
    continueButton: document.querySelector('.load-more'),
  };
  const API = 'https://pixabay.com/api';
const API_KEY = '34843304-df170f32d723ce0de6453f0ca';
const PER_PAGE = 40;
let page = 1;

// Функция для кнопки "Показать еще". При странице "1" прячет кнопку.
function mainPage() {
  if (page === 1) {
    refs.continueButton.classList.add('is-hidden');
  }
}

mainPage();

// Слушатель на кнопку "Показать еще" и кнопку "Найти"
refs.mainForm.addEventListener('submit', addGallery);
refs.continueButton.addEventListener('click', loadMore);

// Функция для слушателя на кнопку "Найти"
function addGallery(event) {
  if (!refs.continueButton.classList.contains('is-hidden') && page > 1) {
    refs.continueButton.classList.add('is-hidden');
  }

  resetPageCount();
  clearMarkup();
  getImages(event);
}

// Функция для слушателя на кнопку "Показать еще"
function loadMore(event) {
  getImages(event);
}

// Получение картинок
function getImages(event) {
  event.preventDefault();

  const requestValue = refs.input.value;

  getData(requestValue)
    .then(response => {
      data(response);
    })
    .catch(error => console.log(error.message));
}

function data(response) {
  const pics = response.data.hits;
  renderGallery(pics);
}

// const axios = require('axios');

async function getData(searchword) {
  const search = searchword.trim();

  try {
    if (search === '') {
      Notify.warning('Please type in the field what you want to find');
      clearMarkup();
      return;
    }
    const response = await axios.get(
      `${API}/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
    );

    if (page === 1 && response.data.totalHits > 0) {
      Notify.success(
        `Hooray! We found ${response.data.totalHits} images`
      );
      refs.continueButton.classList.remove('is-hidden');
    }

    if (
      page >= response.data.totalHits / PER_PAGE &&
      response.data.totalHits > 0
    ) {
      Notify.warning(
        'We have already reached the end of the collection'
      );
      refs.continueButton.classList.add('is-hidden');
    }

    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return;
    }

    page += 1;
    return response;
  } catch (error) {
    console.error(error);
  }
}

// Функция для сброса счетчика страниц
function resetPageCount() {
  page = 1;
}

// Рэндеринг картинок(галереи)
function renderGallery(pictureArray) {
  const imgMarkup = pictureArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
          <a class="gallery-item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__image"/>  
    <div class="info">
      <p class="info-item">
        <b>Likes : ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div> </a>
  `;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', imgMarkup);
}

// Очистка галереи
function clearMarkup() {
  refs.gallery.innerHTML = '';
}
