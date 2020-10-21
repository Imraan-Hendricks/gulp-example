const contactForm = () => {
  let data = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    data[name] = value;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/contact-form.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        console.log(res);
      }
    };
  
    xhr.send(JSON.stringify(data));
  }
  
  const contactUsForm = document.getElementById('contactUsForm');
  contactUsForm.addEventListener('change', onChange);
  contactUsForm.addEventListener('submit', onSubmit);
};

contactForm();