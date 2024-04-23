import posterUrls from '../posters.meta.json';

const POSTER_FLD = './assets/posters/';
const $cont = document.querySelector('.poster-list');

posterUrls.reverse().forEach(async posterUrl => {
  const $img = document.createElement('img');
  $img.src = `${POSTER_FLD}${posterUrl}`;
  $img.classList.add('poster');
  $cont.appendChild($img);
});
