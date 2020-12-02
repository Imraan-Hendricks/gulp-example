const fixedSocialBar = () => {
  const fixedSocialBar = document.getElementById('fixedSocialBar');
  if (!fixedSocialBar) return;

  let currentPageYOffset = window.pageYOffset;

  const onScroll = () => {
    let pageYOffset = window.pageYOffset;
    if (pageYOffset === currentPageYOffset) {
      return;
    } else if (pageYOffset > currentPageYOffset) {
      fixedSocialBar.style.opacity = 0;
      currentPageYOffset = pageYOffset;
    } else {
      fixedSocialBar.style.opacity = 1;
      currentPageYOffset = pageYOffset;
    }
  };

  window.addEventListener('scroll', onScroll);
};

window.addEventListener('load', fixedSocialBar);
