const landing = () => {
  const landing = document.getElementById('landing');
  if (!landing) return;

  const [bookNow, learnMore] = Array.from(landing.querySelectorAll('button'));

  const redirect = (url) => () => {
    window.location.href = url;
  };

  bookNow.addEventListener('click', redirect('contact.html'));

  learnMore.addEventListener('click', redirect('about.html'));
};

window.addEventListener('load', landing);
