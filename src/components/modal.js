import { addNewCard } from "./card.js";
const closeButtons = document.querySelectorAll(".popup__closebutton");
const profileName = document.getElementById("profile__name");
const popupName = document.getElementById("popup__editname");
const profileSpec = document.getElementById("profile__spec");
const popupSpec = document.getElementById("popup__editspec");
const popupCardName = document.getElementById("popup__cardname");
const popupCardUrl = document.getElementById("popup__cardurl");
const fullImg = document.querySelector(".popup__fullimage");
const imgCaption = document.querySelector(".popup__imgcaption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function openEditProfile() {
  openPopup(document.getElementById("popup__profile"));
  popupName.value = profileName.textContent;
  popupSpec.value = profileSpec.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileSpec.textContent = popupSpec.value;
  closePopup(document.getElementById("popup__profile"));
}

function openEditCard() {
  openPopup(document.getElementById("popup__card"));
}

function handleEditCardSubmit(evt) {
  evt.preventDefault();
  if (popupCardName.value !== "" && popupCardUrl.value !== "") {
    addNewCard(popupCardName.value, popupCardUrl.value);
    evt.target.reset();
  }
}

function openFullImg(src, caption) {
  openPopup(document.getElementById("popup__img"));
  fullImg.src = src;
  fullImg.alt = "Фото: " + caption;
  imgCaption.textContent = caption;
}

export {
  handleEditCardSubmit,
  openEditCard,
  openEditProfile,
  handleProfileFormSubmit,
  openFullImg,
};
