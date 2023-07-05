const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function NewCard (name, link) {
  const Cards = document.querySelector(".elements");
  const Card = document.createElement("div");
  Card.classList.add('element');
  Card.innerHTML = '<img class="element__image" src="' + link + '"> <button type="button" class="element__delbutton"></button> <div class="element__underimg"> <h2 class="element__name">' + name + '</h2> <button type="button" class="element__like"></button> </div>'
  Cards.insertBefore(Card, Cards.firstElementChild);
};


const profileName = document.getElementById('profile__name');
const popupName = document.getElementById('popup__editname');
const profileSpec = document.getElementById('profile__spec');
const popupSpec = document.getElementById('popup__editspec');

function OpenEditProfile() {
    document.getElementById('popup__profile').classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupSpec.value = profileSpec.textContent;
}
const EditProfileButton = document.getElementById('editProfile');
EditProfileButton.addEventListener('click', OpenEditProfile);

function closeEditProfile() {
    document.getElementById('popup__profile').classList.remove('popup_opened');
    popupName.value = profileName.textContent;
    popupSpec.value = profileSpec.textContent;
}
const CloseProfileButton = document.getElementById('closeeditname');
CloseProfileButton.addEventListener('click', closeEditProfile);


// Находим форму в DOM
const formElement = document.getElementById('form__editprofile');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = popupName.value;
    profileSpec.textContent = popupSpec.value;
    closeEditProfile();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const popupCardName = document.getElementById('popup__cardname');
const popupCardUrl = document.getElementById('popup__cardurl');

function OpenEditCard() {
    document.getElementById('popup__card').classList.add('popup_opened');
}
const AddCardButton = document.getElementById('addCard');
AddCardButton.addEventListener('click', OpenEditCard);

function closeEditCard() {
    document.getElementById('popup__card').classList.remove('popup_opened');
}
const CloseAddCard = document.getElementById('closeaddcard');
CloseAddCard.addEventListener('click', closeEditCard);

const likeButtons = Array.from(document.querySelectorAll(".element__like"));

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__like-active");
  });
});

const DelCards = Array.from(document.querySelectorAll(".element__delbutton"));

DelCards.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.remove();
  });
});

