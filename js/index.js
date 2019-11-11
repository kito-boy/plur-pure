// import '../styles/main.scss';
import { imgUrls } from "./imgUrls.js";

(function() {
  const ROOT = document.querySelector(".slider"),
        LENG = imgUrls.length,
        TRIGGER = document.querySelector('.slider__trigger'),
        INFO = document.querySelector('.info-panel');
  let index = 0,   
      timerId = null;
  
  function counter() {
    document.querySelector('.slider__counter').innerText = (index + 1) + ' / ' + LENG;
  }

  function timerReset() {
      clearInterval(timerId);
      timerId = setInterval(() => move(), 3000);
  }

  function initializeSlider() {
    for (let i = 0; i < LENG; i++) {
      let el = document.createElement('img');
      el.classList.add('slider__item--hidden');
      el.classList.add('slider__item');
      ROOT.appendChild(el);
    }
    ROOT.children[0].src = imgUrls[0]; 
    ROOT.children[0].alt = 1; 
    ROOT.children[0].classList.remove('slider__item--hidden'); 
  }

  function move(forward = true) {
    let indexPrev = index;
    index = forward ? (index === LENG - 1 ? 0 : index + 1)
                    : (index === 0 ? LENG - 1 : index - 1);

    if (ROOT.children[index].src == "") {
      ROOT.children[index].src = imgUrls[index];
      ROOT.children[index].alt = index + 1; 
    } 
    ROOT.children[indexPrev].classList.toggle('slider__item--hidden',false);  
    ROOT.children[indexPrev].classList.toggle('slider__item--fadeout');
    ROOT.children[indexPrev].classList.toggle('slider__item--fadein', false);
    ROOT.children[index].classList.toggle('slider__item--hidden', false); 
    ROOT.children[index].classList.toggle('slider__item--fadeout', false); 
    ROOT.children[index].classList.toggle('slider__item--fadein');
    
    counter();
  }

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (event.defaultPrevented){
      return;
    } else if (keyName === 'ArrowRight') {
      move();
      timerReset();
    } else if (keyName === 'ArrowLeft') {
      move(false);
      timerReset();
    }
  })

  TRIGGER.onmouseenter = function() {
    INFO.classList.add('info-panel--hover');
  }

  TRIGGER.onmouseclick = function() {
    INFO.classList.add('info-panel--hover');
  }

  INFO.onmouseleave = function() {
    INFO.classList.remove('info-panel--hover');
  }



  initializeSlider();
  counter();
  timerId = setInterval(move, 3000);
  
}());
