const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
};

const phone = document.querySelector('.header__work');
const newPhone = phone.textContent.split(' | ');
if (innerWidth < 500) {
    phone.innerHTML = `${newPhone[0]} | ${newPhone[2]}`;
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__info').offsetHeight;
            if (iconMenu.classList.contains('active')) {
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
            }
            console.log(gotoBlockValue);
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe_form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        error.then(e => {
            let formData = new FormData(form);
            if (e === 0) {
                form.reset();
                form.classList.add('well');
                /* let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                    form.classList.remove('sending');
                } else {
                    alert('Error');
                    form.classList.remove('sending');
                } */
                setTimeout(() => {
                    form.classList.remove('well');
                }, 200)
            }
        });
    }

    async function formValidate(form) {
        let error = 0;
        let formReq = document.querySelector('.req');
        let emailError = document.querySelector('.email');
        let formatEmail = document.querySelector('.submit__error');
        formRemoveError(formReq, emailError);
        formatEmail.classList.remove('active');
        if (formReq.classList.contains('email')) {
            if (emailTest(formReq)) {
                formatEmail.classList.add('active');
                formAddError(formReq, emailError);
                error++;
            };
        } else if (formReq.value === '') {
            formAddError(formReq, emailError);
            error++;
        }
        return error;
    };
    function formAddError(input, emailError) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
        emailError.classList.add('error');
    };
    function formRemoveError(input, emailError) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
        emailError.classList.remove('error');
    };
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };
});