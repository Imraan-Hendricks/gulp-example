const contactForm = () => {
  const contactForm = document.getElementById('contactForm');
  const form = contactForm.getElementsByTagName('FORM')[0];
  const success = contactForm.getElementsByClassName('success')[0];

  let data = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }

  const onChange = (e) => {
    const { name, value, nextElementSibling } = e.target;
    data[name] = value;
 
    nextElementSibling.textContent = undefined; 
    form.lastChild.textContent = undefined;
  };

  const onRequest = () => {
    form.querySelector('button').setAttribute('disabled', true);
  }

  const onErrors = (errs) => {
    console.log(errs);
    const inputGroups = Array.from(form.getElementsByTagName('DIV'));

    errs.forEach((error) => {
      if (error.param === 'general')
        form.lastChild.textContent = error.message;
      else
        inputGroups.forEach((inputGroup) => {
          const input = inputGroup.querySelectorAll('input, textarea')[0];

          if(input.getAttribute('name') === error.param)
            input.nextElementSibling.textContent = error.message; 
        })        
    })

    form.querySelector('button').removeAttribute('disabled');
  }  

  const onSuccess = (data) => {
    console.log(data);
    form.style.opacity = 0;
    success.style.opacity = 1;

    form.querySelector('button').removeAttribute('disabled');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onRequest();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/contact-form.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);

        if(!res.success){
          onErrors(res.err);
          return;
        }

        onSuccess(res.data);
      }
    };
  
    xhr.send(JSON.stringify(data));
  }
  
  form.addEventListener('change', onChange);
  form.addEventListener('submit', onSubmit);
};

contactForm();