'use strict';

// import * as regex from './regex.js';

const getSel = sel => document.querySelector(sel);

function placeholderUp() {
    if (event.target.value) {
        event.target.nextSibling.nextSibling.classList.add('placeholder--active');
        event.target.classList.add('block-ipt__input--active');
    } else {
        event.target.nextSibling.nextSibling.classList.remove('placeholder--active');
        event.target.classList.remove('block-ipt__input--active');
    }
}



class Validation {

    checkName(name) {
        let rgx = /^[a-zA-Z]{3,16}$/;
        return rgx.test(name);
    }

    checkEmail(email) {
        let rgx = /^[\w_\-.]{1,}@[\w_\-.]*.(ua|org|com|ru|net|pro|top|in|org.ua|com.ua|in.ua)$/;
        return rgx.test(email)
    }

    checkPassword(password) {
        // let rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&]).{8,32}$/;
        let rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/;

        return rgx.test(password);
    }
    checkAll(name, surname, email, password) {
        return this.checkName(name) && this.checkName(surname) && this.checkEmail(email) && this.checkPassword(password) ? true : false;
    }
}

function styleInput(elem, bool) {
    if (bool) {
        getSel(`.sign-up__${elem}`).parentElement.classList.remove('block-ipt--false');
        getSel(`.sign-up__${elem}`).classList.remove('block-ipt__input--false');
        getSel(`.sign-up__${elem}`).parentElement.classList.add('block-ipt--true');
        getSel(`.sign-up__${elem}`).classList.add('block-ipt__input--true');
    } else {
        getSel(`.sign-up__${elem}`).parentElement.classList.add('block-ipt--false');
        getSel(`.sign-up__${elem}`).classList.add('block-ipt__input--false');
        getSel(`.sign-up__${elem}`).parentElement.classList.remove('block-ipt--true');
        getSel(`.sign-up__${elem}`).classList.remove('block-ipt__input--true');
    }
}


class User {
    constructor(name, surname, email, password) {
        this.name = name;
        this.lastName = surname;
        this.email = email;
        this.password = password;
    }
}

const rgx = new Validation();
let signUpClicked = false;

let signUpForm = document.forms['sign-up__form'];


getSel('.sign-up__btn').addEventListener('click', function () {
    signUpClicked = true
    const fName = getSel('.sign-up__first-name').value;
    const lName = getSel('.sign-up__last-name').value;
    const email = getSel('.sign-up__email').value;
    const password = getSel('.sign-up__password').value;
    if (rgx.checkName(fName)) styleInput('first-name', true);
    else styleInput('first-name', false);
    if (rgx.checkName(lName)) styleInput('last-name', true);
    else styleInput('last-name', false);
    if (rgx.checkEmail(email) && !localStorage[email]) {
        styleInput('email', true);
        getSel('.sign-up__warning').classList.add('hide');
    } else {
        styleInput('email', false);
        if (localStorage[email]) {
            getSel('.sign-up__warning').classList.remove('hide');
            getSel('.sign-up__email').value = '';
            getSel('.sign-up__email').nextSibling.nextSibling.classList.remove('placeholder--active');
            getSel('.sign-up__email').classList.remove('block-ipt__input--active');
        }
    }
    if (rgx.checkPassword(password)) styleInput('password', true);
    else styleInput('password', false);

    if (rgx.checkAll(fName, lName, email, password)) {
        localStorage[email] = JSON.stringify(new User(fName, lName, email, password));
        for (let index = 0; index < signUpForm.length - 1; index++) {
            signUpForm[index].value = '';
            signUpForm[index].classList.remove('block-ipt__input--true');
            signUpForm[index].parentElement.classList.remove('block-ipt--true');
            signUpForm[index].nextSibling.nextSibling.classList.remove('placeholder--active');
            signUpForm[index].classList.remove('block-ipt__input--active');

            signUpClicked = false;
        }
    } else console.log(false);
})


console.log();


function validLive(value) {

    if (signUpClicked) {
        if (value == 'name') {
            if (rgx.checkName(event.target.value)) {
                event.target.parentElement.classList.add('block-ipt--true');
                event.target.parentElement.classList.remove('block-ipt--false');
                event.target.classList.add('block-ipt__input--true');
                event.target.classList.remove('block-ipt__input--false');

            } else {
                event.target.parentElement.classList.add('block-ipt--false');
                event.target.parentElement.classList.remove('block-ipt--true');
                event.target.classList.remove('block-ipt__input--true');
                event.target.classList.add('block-ipt__input--false');
            }
        }
        if (value == 'email') {
            if (rgx.checkEmail(event.target.value)) {
                event.target.parentElement.classList.add('block-ipt--true');
                event.target.parentElement.classList.remove('block-ipt--false');
                event.target.classList.add('block-ipt__input--true');
                event.target.classList.remove('block-ipt__input--false');
            } else {
                event.target.parentElement.classList.add('block-ipt--false');
                event.target.parentElement.classList.remove('block-ipt--true');
                event.target.classList.remove('block-ipt__input--true');
                event.target.classList.add('block-ipt__input--false');
            }
        }
        if (value == 'password') {
            if (rgx.checkPassword(event.target.value)) {
                event.target.parentElement.classList.add('block-ipt--true');
                event.target.parentElement.classList.remove('block-ipt--false');
                event.target.classList.add('block-ipt__input--true');
                event.target.classList.remove('block-ipt__input--false');
            } else {
                event.target.parentElement.classList.add('block-ipt--false');
                event.target.parentElement.classList.remove('block-ipt--true');
                event.target.classList.remove('block-ipt__input--true');
                event.target.classList.add('block-ipt__input--false');
            }
        }
    }

}


getSel('.sign-up__link').addEventListener('click', function () {
    getSel('.sign-up').classList.add('hide');
    getSel('.sign-in').classList.remove('hide');
    for (let index = 0; index < signUpForm.length - 1; index++) {
        signUpForm[index].value = '';
        signUpForm[index].classList.remove('block-ipt__input--true');
        signUpForm[index].classList.remove('block-ipt__input--false');
        signUpForm[index].parentElement.classList.remove('block-ipt--true');
        signUpForm[index].parentElement.classList.remove('block-ipt--false');
        signUpForm[index].nextSibling.nextSibling.classList.remove('placeholder--active');
        signUpForm[index].classList.remove('block-ipt__input--active');
        signUpClicked = false;
    }
    getSel('.sign-up__warning').classList.add('hide')
})

getSel('.sign-in__link').addEventListener('click', function () {
    getSel('.sign-up').classList.remove('hide');
    getSel('.sign-in').classList.add('hide');
    getSel('.sign-in__warning').classList.add('hide');
    getSel('.sign-in__ipt--email').value = '';
    getSel('.sign-in__ipt--password').value = '';
    getSel('.sign-in__ipt--password').nextSibling.nextSibling.classList.remove('placeholder--active');
    getSel('.sign-in__ipt--password').classList.remove('block-ipt__input--active');
    getSel('.sign-in__ipt--email').nextSibling.nextSibling.classList.remove('placeholder--active');
    getSel('.sign-in__ipt--email').classList.remove('block-ipt__input--active');

})


getSel('.sign-in__btn').addEventListener('click', function () {
    if (localStorage.length) {
        const email = getSel('.sign-in__ipt--email').value;
        const password = getSel('.sign-in__ipt--password').value;
        console.log(email, password);
        if (localStorage.getItem(email)) {
            let user = JSON.parse(localStorage[email]);
            let checkPass = user.password;
            if (checkPass == password) {
                getSel('.sign-in__warning').classList.add('hide');
                getSel('.sign-in__ipt--email').value = '';
                getSel('.sign-in__ipt--password').value = '';
                getSel('.sign-in__ipt--password').nextSibling.nextSibling.classList.remove('placeholder--active');
                getSel('.sign-in__ipt--password').classList.remove('block-ipt__input--active');
                getSel('.sign-in__ipt--email').nextSibling.nextSibling.classList.remove('placeholder--active');
                getSel('.sign-in__ipt--email').classList.remove('block-ipt__input--active');

                profileFilling(user);
                getSel('.sign-in').classList.add('hide');
                getSel('.profile').classList.remove('hide');

            } else {
                getSel('.sign-in__warning').textContent = 'Incorrect email or password';
                getSel('.sign-in__warning').classList.remove('hide');
            }

        } else {
            getSel('.sign-in__warning').textContent = 'Incorrect email or password';
            getSel('.sign-in__warning').classList.remove('hide');
        }

    } else {
        getSel('.sign-in__warning').textContent = 'Localstorage is empty';
        getSel('.sign-in__warning').classList.remove('hide');
    }
})

function profileFilling(obj) {
    getSel('.profile__ifo-name').textContent = `${obj.name} ${obj.lastName}`;
    getSel('.profile__ifo-email').textContent = obj.email;
}

getSel('.profile__btn').addEventListener('click', function () {
    getSel('.sign-in').classList.remove('hide');
    getSel('.profile').classList.add('hide');
})