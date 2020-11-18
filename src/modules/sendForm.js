'use strict';

// отправка данных с форм
const sendForm = () => {
  const errorMessage = 'Что-то пошло не так..',
    loadMessage = 'Загрузка..',
    successMessage = 'Спасибо, мы скоро с Вами свяжемся!';
  
  const forms = document.querySelectorAll('form');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
    font-size: 18px;
    color: #fff`;

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  forms.forEach((elem) => {
    elem.addEventListener('submit', (event) => {
      event.preventDefault();
      elem.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(elem);
      let body = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(body)
        .then((respons) => {
          if (respons.status !== 200) {
            throw new Error('Status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          // console.log(error);
        });
        
      setTimeout(() => {
        elem.querySelectorAll('input').forEach((item) => {
          item.value = '';
        });

        statusMessage.remove();
      }, 5000);
    });
  });
  
  const validForms = (idForm) => {
    let form = document.getElementById(idForm);
    // console.log(form);
    form.addEventListener('input', (event) => {
      let target = event.target;
      if (target.classList.contains('form-phone')) {
          target.value = target.value.replace(/[^+\d]/, '');
      }
      if (target.classList.contains('form-name')) {
          target.value = target.value.replace(/[^А-Яа-яЁё\s]/ig, '');
      }
      if (target.classList.contains('mess')) {
          target.value = target.value.replace(/[^А-Яа-яЁё\s\.,:;!?-]/ig, '');
      }
    });
  };
  
  validForms('form1');
  validForms('form2');
  validForms('form3');
};

export default sendForm;