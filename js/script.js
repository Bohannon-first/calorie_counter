/* eslint-disable no-use-before-define */
// Выбор пола
const genderMale = document.getElementById('gender-male');
const genders = document.querySelectorAll('input[name=gender]');

// Значения из полей ввода(инпуты)
const inputAge = document.getElementById('age');
const inputHeight = document.getElementById('height');
const inputWeight = document.getElementById('weight');
const dataInputs = document.querySelectorAll('input[type=number]');

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

// Пустой массив для значений текстовых полей ввода(инпутов)
let arrayForValueInputs = [];

// Изменение пола
genders.forEach((gender) => {
  gender.addEventListener('change', () => {
    calculation(inputAge.value, inputHeight.value, inputWeight.value, currentRatio);
  });
});

// Проверка на заполненность всех полей ввода
for (const input of dataInputs) {
  input.addEventListener('change', () => {
    const expression = /^0|\.|\d{4,}/gm; // Регулярное выражение
    if (input.value !== '' && input.value > 0 && !expression.test(input.value)) {
      arrayForValueInputs.push(input.value);
      if (arrayForValueInputs.length >= 3) {
        buttonCalculate.removeAttribute('disabled');
      }
    } else {
      arrayForValueInputs.pop();
      buttonCalculate.setAttribute('disabled', '');
    }
  });
}

// Обработчик кнопки "Очистить поля и расчёт"
dataInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value !== '') {
      buttonReset.disabled = false;
    }
  });
});

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
  arrayForValueInputs = [];
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
