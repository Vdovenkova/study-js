'use strict';

// отправка данных с форм
const sendForm = () => {
  const forms = document.querySelectorAll('form');
  const errorMessage = 'Что-то пошло не так..',
    successMessage = 'Спасибо, мы скоро с Вами свяжемся!';
  
  const loadMessage = document.createElement('div');
    let styleLoadMsg;

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
    font-size: 18px;
    color: #fff`;

  const spinner = (elem) => {
      loadMessage.classList.add('sk-flow');
      elem.appendChild(loadMessage);
      loadMessage.innerHTML = `
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>`;

      styleLoadMsg = document.createElement('style');
      styleLoadMsg.textContent = `
          :root {
            --sk-color: rgb(250, 243, 243);
          }

          .sk-flow {
            margin: auto;
            width: 60px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .sk-flow-dot {
            width: 13px;
            height: 13px;
            background-color: var(--sk-color);
            border-radius: 50%;
            animation: sk-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite
              both;
          }

          .sk-flow-dot:nth-child(1) {
            animation-delay: -0.3s;
          }
          .sk-flow-dot:nth-child(2) {
            animation-delay: -0.15s;
          }

          @keyframes sk-flow {
            0%,
            80%,
            100% {
              transform: scale(0.3);
            }
            40% {
              transform: scale(1);
            }
          }`;
      document.head.appendChild(styleLoadMsg);
    };

    const delSpinner = () => {
      loadMessage.remove();
      styleLoadMsg.remove();
    };

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
      // elem.appendChild(statusMessage);
      // elem.append(statusMessage);
      // statusMessage.textContent = loadMessage;
      spinner(elem);
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
          delSpinner();
          elem.appendChild(statusMessage);
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          delSpinner();
          elem.appendChild(statusMessage);
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