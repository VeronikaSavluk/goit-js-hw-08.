import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    formEl: document.querySelector('.feedback-form'),
    inputEl: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
    formData: {},
}

const savedFormData = localStorage.getItem(STORAGE_KEY);
const parsedFormData = JSON.parse(savedFormData);
populateTextarea();

function onFormInput(event) {
    event.preventDefault();
    if (savedFormData && parsedFormData.email) {
        refs.formData.email = refs.inputEl.value;
    };
    if (savedFormData && parsedFormData.message) {
        refs.formData.message = refs.textarea.value;
    };
    refs.formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(refs.formData));
};
refs.formEl.addEventListener("input", throttle(onFormInput, 500));

function populateTextarea(event) {
    if (savedFormData && parsedFormData.email && parsedFormData.message) {
        refs.textarea.value = parsedFormData.message;
        refs.inputEl.value = parsedFormData.email;
    } else
    if (savedFormData && parsedFormData.email) {
        refs.inputEl.value = parsedFormData.email;
    } else
    if (savedFormData && parsedFormData.message) {
        refs.textarea.value = parsedFormData.message;
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    if (refs.inputEl.value !== "" && refs.textarea.value !== "") {
        refs.formData.email = refs.inputEl.value;
        refs.formData.message = refs.textarea.value;
        console.log(refs.formData);
        event.target.reset();
        localStorage.removeItem(STORAGE_KEY);
    } else {
        alert("Всі поля повинні бути заповнені.");
        }
};
refs.formEl.addEventListener("submit", onFormSubmit);