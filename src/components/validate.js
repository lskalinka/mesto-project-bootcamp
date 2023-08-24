const showError = (input, errorMessage, formError, config) => {
  input.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorActiveClass);
};
const hideError = (input, formError, config) => {
  input.classList.remove(config.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(config.errorActiveClass);
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

const checkInputValidity = (input, config) => {
  input
    .closest(config.formFieldset)
    .querySelector(config.submitButtonSelector).disabled = false;
  const formError = input
    .closest(config.formField)
    .querySelector(config.errorClass);
  if (!input.validity.valid) {
    showError(input, input.validationMessage, formError, config);
    input
      .closest(config.formFieldset)
      .querySelector(config.submitButtonSelector).disabled = true;
  } else {
    hideError(input, formError, config);
  }
  toggleButtonState(
    Array.from(
      input.closest(config.formFieldset).querySelectorAll(config.formInput)
    ),
    input
      .closest(config.formFieldset)
      .querySelector(config.submitButtonSelector)
  );
};

const enableValidation = (config) => {
  const popupInputs = Array.from(document.querySelectorAll(config.formInput));
  popupInputs.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(input, config);
    });
  });
};
export { enableValidation };
