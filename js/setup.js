'use strict';

var COUNT_WIZARDS = 4;

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

document.querySelector('.setup').classList.remove('hidden');

// функция случайного числа
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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
