const contactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const form = contactForm.querySelector('form');
  const generalVal = form.lastChild;
  const inputs = Array.from(form.querySelectorAll('input, textarea'));
  const submitBtn = form.querySelector('button');
  const success = contactForm.querySelector('.success');
  const sendAnotherMsgBtn = success.querySelector('button');

  let data = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const resetInput = () => {
    inputs.forEach((input) => {
      input.value = '';
    });

    Object.keys(data).forEach((key) => {
      data[key] = '';
    });
  };

  const onChange = (e) => {
    const { name, value, nextElementSibling } = e.target;
    data[name] = value;

    nextElementSibling.textContent = undefined;
    generalVal.textContent = undefined;
  };

  const onRequest = () => {
    submitBtn.setAttribute('disabled', true);
  };

  const onErrors = (errs) => {
    console.log(errs);

    errs.forEach((error) => {
      if (error.param === 'general') {
        generalVal.textContent = error.message;
        return;
      }

      inputs.forEach((input) => {
        if (input.getAttribute('name') === error.param)
          input.nextElementSibling.textContent = error.message;
      });
    });

    submitBtn.removeAttribute('disabled');
  };

  const onSuccess = (res) => {
    console.log(res);
    form.style.opacity = 0;
    success.style.opacity = 1;

    resetInput();
    submitBtn.removeAttribute('disabled');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onRequest();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/contact-form.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);

        if (!res.success) {
          onErrors(res.err);
          return;
        }

        onSuccess(res.data);
      }
    };

    xhr.send(JSON.stringify(data));
  };

  const onSendAnotherMsg = () => {
    form.style.opacity = 1;
    success.style.opacity = 0;
  };

  form.addEventListener('change', onChange);
  form.addEventListener('submit', onSubmit);
  sendAnotherMsgBtn.addEventListener('click', onSendAnotherMsg);
};

window.addEventListener('load', contactForm);
