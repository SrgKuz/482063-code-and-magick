'use strict';

var COUNT_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYKODE = 13;

var wizardsName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var wizardsLastName = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatsColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var colorEyes = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballWrap = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// функция случайного числа
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var evt = (evt) ? evt : event;
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var focusSetup = document.querySelector('.setup-user-name');
var wizardColorEyes = setup.querySelector('.wizard-eyes');

wizardColorEyes.addEventListener('click', function () {
  var eyesRndColor = colorEyes[getRandomInteger(0, colorEyes.length)];
  setup.querySelector('.wizard-eyes').style.fill = eyesRndColor;
  setup.querySelector('[name="eyes-color"]').value = eyesRndColor;
});

var fireballColor = setup.querySelector('.setup-fireball-wrap');

fireballColor.addEventListener('click', function () {
  var fireballRndColor = fireballWrap[getRandomInteger(0, fireballWrap.length)];
  setup.querySelector('.setup-fireball-wrap').style.backgroundColor = fireballRndColor;
  setup.querySelector('[name="fireball-color"]').value = fireballRndColor;
});


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== focusSetup) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYKODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYKODE) {
    closePopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var heros = [];

var generateWizard = function () {
  for (var i = 0; i < COUNT_WIZARDS; i++) {
    var fullNameWizard = wizardsName[getRandomInteger(0, 7)] + ' ' + wizardsLastName[getRandomInteger(0, 7)];
    heros.push({
      'wizardName': fullNameWizard,
      'coat': coatsColor[getRandomInteger(0, coatsColor.length)],
      'eyesColor': colorEyes[getRandomInteger(0, colorEyes.length)]
    });
  }
  return heros;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.wizardName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

generateWizard();
var fragment = document.createDocumentFragment();
heros.forEach(function (hero) {
  fragment.appendChild(renderWizard(hero));
});

similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
