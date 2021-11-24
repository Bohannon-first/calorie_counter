/* eslint-disable no-use-before-define */
// Выбор пола
const genderMale = document.getElementById('gender-male');
const genders = document.querySelectorAll('input[name=gender]');

// Значения из полей ввода(инпуты)
const inputAge = document.getElementById('age');
const inputHeight = document.getElementById('height');
const inputWeight = document.getElementById('weight');
const dataInputs = Array.from(document.querySelectorAll('input[type=text]'));

// Выводимые значения
const popupResult = document.querySelector('.counter__result');
const caloriesNormal = document.getElementById('calories-norm');
const caloriesMinimal = document.getElementById('calories-minimal');
const caloriesMaximal = document.getElementById('calories-maximal');

// Кнопки
const buttonCalculate = document.querySelector('.form__submit-button');
const buttonReset = document.querySelector('.form__reset-button');

// Все радиокнопки с физической активностью
const inputsActivity = document.querySelectorAll('input[name=activity]');
const inputActivityMin = document.getElementById('activity-minimal');

// Изменение пола
genders.forEach((gender) => {
  gender.addEventListener('change', () => {
    calculation(inputAge.value, inputHeight.value, inputWeight.value, currentRatio);
  });
});

// Регулярное выражение
const notNumbers = /^0|[^0-9]/;

// Проверка инпутов на наличие значений
const checkInputs = () => {
  // Появление кнопки "Рассчитать"
  const emptyInputs = dataInputs.filter((input) => input.value === '').length;
  if (emptyInputs) {
    buttonCalculate.disabled = true;
  } else {
    buttonCalculate.disabled = false;
  }
  // Появление кнопки "Очистить поля и расчёт"
  const notEmptyInputs = dataInputs.filter((input) => input.value !== '').length;
  if (notEmptyInputs) {
    buttonReset.disabled = false;
  } else {
    buttonReset.disabled = true;
  }
};

// Добавление обработчиков событий input на поля ввода
dataInputs.forEach((input) => {
  input.addEventListener('input', () => {
    formatInput(input);
    checkInputs();
  });
});

// Форматирование не числовых значений
const formatInput = (input) => {
  input.value = input.value.replace(notNumbers, '');
};

// Массив с данными о физической активности
const listActivity = [
  {
    value: 'min',
    ratio: 1.2,
  },
  {
    value: 'low',
    ratio: 1.375,
  },
  {
    value: 'medium',
    ratio: 1.55,
  },
  {
    value: 'high',
    ratio: 1.725,
  },
  {
    value: 'max',
    ratio: 1.9,
  },
];

// Получение значений инпутов физической активности
let currentRatio = listActivity[0].ratio;

for (const input of inputsActivity) {
  input.addEventListener('change', () => {
    choiceCurrentActivity(input);
    calculation(inputAge.value, inputHeight.value, inputWeight.value, currentRatio);
  });
}

const choiceCurrentActivity = (currentInput) => {
  const currentValueInput = currentInput.value;
  const currentInputActive = listActivity.find((item) => item.value === currentValueInput);
  currentRatio = currentInputActive.ratio;
};

// Клик по кнопке "Рассчитать"
buttonCalculate.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupResult.classList.remove('counter__result--hidden');
  calculation(inputAge.value, inputHeight.value, inputWeight.value, currentRatio);
});

// Очистка всех полей при клике на "Очистить поля и расчёт"
buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  genders.forEach((gender) => gender.checked = false);
  genderMale.checked = true;
  dataInputs.forEach((input) => input.value = '');
  inputsActivity.forEach((input) => input.checked = false);
  inputActivityMin.checked = true;
  buttonCalculate.disabled = true;
  buttonReset.disabled = true;
  popupResult.classList.add('counter__result--hidden');
});

// Функция калькуляции
const calculation = (age = 0, height = 0, weight = 0, ratioActivity = 1.2) => {
  let normalWeight;
  let reduceWeight;
  let increaseWeight;

  if (genderMale.checked) {
    normalWeight = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * ratioActivity;
    reduceWeight = normalWeight - (normalWeight * 15 / 100);
    increaseWeight = normalWeight + (normalWeight * 15 / 100);
  } else {
    normalWeight = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * ratioActivity;
    reduceWeight = normalWeight - (normalWeight * 15 / 100);
    increaseWeight = normalWeight + (normalWeight * 15 / 100);
  }
  caloriesNormal.textContent = `${Math.round(normalWeight)}`;
  caloriesMinimal.textContent = `${Math.round(reduceWeight)}`;
  caloriesMaximal.textContent = `${Math.round(increaseWeight)}`;
};
