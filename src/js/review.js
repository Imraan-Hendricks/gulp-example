const reviews = () => {
  const review = document.getElementById('reviews');
  if (!review) return;

  const arrowLeft = review.querySelector('.arrowLeft');
  const arrowRight = review.querySelector('.arrowRight');

  const clients = Array.from(review.querySelector('.clients').children);
  const max = clients.length;
  let position = 0;

  const onClickPrev = () => {
    if (position > 0) {
      clients[position].style.display = 'none';
      position = position - 1;
      clients[position].style.display = 'block';
      return;
    }

    clients[position].style.display = 'none';
    position = max - 1;
    clients[position].style.display = 'block';
  };

  const onClickNext = () => {
    if (position < max - 1) {
      clients[position].style.display = 'none';
      position = position + 1;
      clients[position].style.display = 'block';
      return;
    }

    clients[position].style.display = 'none';
    position = 0;
    clients[position].style.display = 'block';
  };

  arrowLeft.addEventListener('click', onClickPrev);
  arrowRight.addEventListener('click', onClickNext);
};

window.addEventListener('load', reviews);
