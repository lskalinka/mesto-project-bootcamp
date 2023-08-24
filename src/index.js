import '../pages/index.css';
import { enableValidation } from "./components/validate.js";
import {
  handleEditCardSubmit,
  openEditCard,
  openEditProfile,
  handleProfileFormSubmit,
} from "./components/modal.js";

const addCardButton = document.getElementById("addCard");
const formAddCard = document.forms["addCard"];
const editProfileButton = document.getElementById("editProfile");
const editProfileForm = document.forms["editProfile"];

enableValidation({
  formInput: ".popup__edit",
  formFieldset: ".popup__fieldset",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__edit_type_error",
  errorActiveClass: "popup__edit-error_active",
  formField: ".popup__form-field",
  errorClass: ".popup__edit-error",
});
formAddCard.addEventListener("submit", handleEditCardSubmit);
addCardButton.addEventListener("click", openEditCard);
editProfileButton.addEventListener("click", openEditProfile);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
