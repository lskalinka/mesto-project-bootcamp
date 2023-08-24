import { openFullImg } from "./modal.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const allCards = Array.from(document.querySelectorAll(".element"));
const cardTemplate = document.querySelector("#element_template").content;
const cards = document.querySelector(".elements");
function createCard(name, link) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const likeButton = card.querySelector(".element__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-active");
  });
  const delCard = card.querySelector(".element__delbutton");
  delCard.addEventListener("click", () => {
    delCard.closest(".element").remove();
  });
  const cardImage = card.querySelector(".element__image");
  cardImage.addEventListener("click", () => {
    openFullImg(link, name);
  });
  card.querySelector(".element__image").src = link;
  card.querySelector(".element__name").textContent = name;
  addAltImg(card);
  return card;
}
function addNewCard(name, link) {
  const card = createCard(name, link);
  cards.insertBefore(card, cards.firstElementChild);
}
initialCards.forEach((element) => {
  addNewCard(element.name, element.link);
});
function addAltImg(element) {
  element.children[0].alt =
    "Фото: " + element.children[2].children[0].textContent;
}

allCards.forEach((element) => {
  addAltImg(element);
});

export { addNewCard };
