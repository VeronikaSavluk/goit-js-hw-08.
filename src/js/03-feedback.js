import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    formEl: document.querySelector('.feedback-form'),
    inputEl: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
    formData: {},
}

refs.formEl.addEventListener("submit", onFormSubmit);

populateTaxterea();

refs.formEl.addEventListener("input", throttle(event => {
    refs.formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(refs.formData));
}, 500));

function populateTaxterea(event) {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);
    if (savedFormData) {
        refs.inputEl.value = parsedFormData.email;
        refs.textarea.value = parsedFormData.message;
    };
}

function onFormSubmit(event) {
    event.preventDefault();
    if (refs.inputEl.value === "" || refs.textarea.value === "") {
        alert("Всі поля повинні бути заповнені.");
    }
    else if (refs.inputEl.value !== "" && refs.textarea.value !== "") {
       event.target.reset();
        localStorage.removeItem(STORAGE_KEY);
        console.log(refs.formData);
    }
};