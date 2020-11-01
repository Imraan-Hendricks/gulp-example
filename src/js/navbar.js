const navbar = () => {
  const navbar = document.getElementById('navbar');
  const links = Array.from(navbar.getElementsByTagName('A'));

  const calcTop = (targetElement) => {
    const elementYOffset = -navbar.clientHeight;
    const relativeYOffset = targetElement.getBoundingClientRect().top;
    const pageYOffset = window.pageYOffset;

    return relativeYOffset + pageYOffset + elementYOffset;
  };

  const handleLink = (e) => {
    e.preventDefault();

    if (e.target.getAttribute('href') === '#') return;

    const id = e.target.getAttribute('href').replace('#', '');
    const page = e.target.getAttribute('data-page');
    const targetElement = document.getElementById(id);

    if (!targetElement) {
      if (page === 'home' && page === id) window.location.href = '/';
      else if (page === 'home') window.location.href = '/#' + id;
      else if (page === id) window.location.href = page + '.html';
      else window.location.href = page + '.html#' + id;
      return;
    }

    window.scrollTo({
      top: calcTop(targetElement),
      behavior: 'smooth',
    });
  };

  const linkEvents = () => {
    links.forEach((anchor) => {
      anchor.addEventListener('click', handleLink);
    });
  };

  const onLoad = () => {
    const url = window.location.href;
    if (!url.includes('#')) return;

    const id = url.slice(url.lastIndexOf('#') + 1);
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    window.scrollTo({
      top: calcTop(targetElement),
      behavior: 'smooth',
    });
  };

  const setPageOffset = () => {
    const navHeight = navbar.querySelector('nav').clientHeight;
    navbar.style.height = navHeight + 'px';
  };

  setPageOffset();
  linkEvents();
  onLoad();
};

window.addEventListener('load', navbar);
