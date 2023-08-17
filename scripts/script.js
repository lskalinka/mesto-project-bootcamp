const initialCards = [
  {
    name: "Архыз",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: "Челябинская область",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: "Иваново",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: "Камчатка",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: "Холмогорский район",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: "Байкал",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const closeButtons = document.querySelectorAll('.popup__closebutton');
const profileName = document.getElementById("profile__name");
const popupName = document.getElementById("popup__editname");
const profileSpec = document.getElementById("profile__spec");
const popupSpec = document.getElementById("popup__editspec");
const editProfileButton = document.getElementById("editProfile");
const editProfileForm = document.forms["editProfile"];
const popupCardName = document.getElementById("popup__cardname");
const popupCardUrl = document.getElementById("popup__cardurl");
const addCardButton = document.getElementById("addCard");
const formAddCard = document.forms["addCard"];
const allCards = Array.from(document.querySelectorAll(".element"));
const cardTemplate = document.querySelector("#element_template").content;
const cards = document.querySelector(".elements");
const fullImg = document.querySelector(".popup__fullimage");
const imgCaption = document.querySelector(".popup__imgcaption");
const popupInputs = Array.from(document.querySelectorAll('.popup__edit'));
const showError = (input, errorMessage, formError) => {
    input.classList.add('popup__edit_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__edit-error_active');
    };
const hideError = (input, formError) => {
  input.classList.remove('popup__edit_type_error');
  formError.textContent = '';
  formError.classList.remove('popup__edit-error_active');  
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const checkInputValidity = (input) => {
  input.closest('.popup__fieldset').querySelector('.popup__button').disabled = false;
  const formError = input.closest('.popup__form-field').querySelector('.popup__edit-error');
  if (!input.validity.valid) {
    showError(input, input.validationMessage, formError);
    input.closest('.popup__fieldset').querySelector('.popup__button').disabled = true;
  }
  else {
    hideError(input, formError);
  }
  toggleButtonState(Array.from(input.closest('.popup__fieldset').querySelectorAll('.popup__edit')), input.closest('.popup__fieldset').querySelector('.popup__button'));
};

popupInputs.forEach((input) => {
  input.addEventListener('input', function () {
      checkInputValidity(input);
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
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
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createCard(name, link) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const likeButton = card.querySelector(".element__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-active");
    });
  const delCard = card.querySelector(".element__delbutton");
    delCard.addEventListener("click", () => {
      delCard.closest('.element').remove();
      });
  const cardImage = card.querySelector(".element__image");
      cardImage.addEventListener("click", () => {
          openFullImg(link, name);
        });
  card.querySelector(".element__image").src = link;
  card.querySelector(".element__name").textContent = name;
  addAltImg(card);
  return card;
};

function addNewCard(name, link) {
  const card = createCard(name, link);
  cards.insertBefore(card, cards.firstElementChild);
}

initialCards.forEach((element) => {
  addNewCard(element.name, element.link);
});

function openEditProfile() {
  openPopup(document.getElementById("popup__profile"));
  popupName.value = profileName.textContent;
  popupSpec.value = profileSpec.textContent;
}

editProfileButton.addEventListener("click", openEditProfile);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();   
  profileName.textContent = popupName.value;
  profileSpec.textContent = popupSpec.value;
  closePopup(document.getElementById("popup__profile"));
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function openEditCard() {
  openPopup(document.getElementById("popup__card"));
}

addCardButton.addEventListener("click", openEditCard);

function handleEditCardSubmit(evt) {
  evt.preventDefault(); 
  if (popupCardName.value !== "" && popupCardUrl.value !== "") {
    addNewCard(popupCardName.value, popupCardUrl.value);
    evt.target.reset();
  } 
}

formAddCard.addEventListener("submit", handleEditCardSubmit);

function openFullImg(src, caption) {
  openPopup(document.getElementById("popup__img"));
  fullImg.src = src;
  fullImg.alt = "Фото: " + caption;
  imgCaption.textContent = caption;
}

function addAltImg(element) {
  element.children[0].alt =
    "Фото: " + element.children[2].children[0].textContent;
}

allCards.forEach((element) => {
  addAltImg(element);
});
