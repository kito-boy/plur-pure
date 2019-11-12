// import '../styles/main.scss';
import { imgUrls } from "./imgUrls.js";

(function() {
  const ROOT = document.querySelector(".slider"),
        triggerButton = document.querySelector('.slider__trigger'),
        infoPanel = document.querySelector('.info-panel');

  let index = 0,   
      timerId = null;
  
  function updateCounter() {
    document.querySelector('.slider__counter').innerText = (index + 1) + ' / ' + imgUrls.length;
  }

  function resetTimer() {
      clearInterval(timerId);
      timerId = setInterval(() => moveSlider(), 4000);
  }

  function initializeSlider() {    
    imgUrls.forEach ( (url, index) => {
      let el = document.createElement('img');
      el.classList.add('slider__item');
      ROOT.appendChild(el);
    })
    ROOT.children[0].src = imgUrls[0]; 
    ROOT.children[0].alt = 1; 
    ROOT.children[0].classList.add('slider__item--fadein'); 
  }

  function moveSlider(forward = true) {
    let indexPrev = index;
    index = forward ? (index === imgUrls.length - 1 ? 0 : index + 1)
                    : (index === 0 ? imgUrls.length - 1 : index - 1);

    if (ROOT.children[index].src == "") {
      ROOT.children[index].src = imgUrls[index];
      ROOT.children[index].alt = index + 1; 
    } 
    ROOT.children[indexPrev].classList.toggle('slider__item--fadeout');
    ROOT.children[indexPrev].classList.toggle('slider__item--fadein', false);
    ROOT.children[index].classList.toggle('slider__item--fadeout', false); 
    ROOT.children[index].classList.toggle('slider__item--fadein');
    updateCounter();
  }

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (event.defaultPrevented){
      return;
    } else if (keyName === 'ArrowRight') {
      moveSlider();
      resetTimer();
    } else if (keyName === 'ArrowLeft') {
      moveSlider(false);
      resetTimer();
    }
  })

  triggerButton.onmouseenter = function() {
    infoPanel.classList.add('info-panel--isActive');
  }
  triggerButton.onmouseclick = function() {
    infoPanel.classList.add('info-panel--isActive');
  }
  infoPanel.onmouseleave = function() {
    infoPanel.classList.remove('info-panel--isActive');
  }

  initializeSlider();
  updateCounter();
  resetTimer();

}());
