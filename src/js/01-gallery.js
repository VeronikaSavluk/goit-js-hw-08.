// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line
const boxGallery = document.querySelector(".gallery");
const addGalleryItems = galleryItems.map((item) =>
`<div><a class="gallery__item" href=${item.original}>
  <img class="gallery__image" src=${item.preview} alt=${item.description} />
</a></div>`).join(" ");
boxGallery.insertAdjacentHTML("beforeend", addGalleryItems);
// const selectImage = (event) => {

// };
let gallery = new SimpleLightbox('.gallery a', { captionsData: `alt`, captionDelay: 250 });
// boxGallery.addEventListener("click", selectImage);
console.log(galleryItems);
