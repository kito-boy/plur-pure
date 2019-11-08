// import '../styles/main.scss';
import { imgUrls } from "./imgUrls.js";

(function() {
  const ROOT = document.querySelector(".slider__container"),
        LENG = imgUrls.length;
  let index = 0;     


  function forward( ) {
    let indexPrev = index;
    index =
      index === LENG - 1 ? 0 : index + 1; 

    if (ROOT.children[index].src == "") {
      ROOT.children[index].src = 
        index === LENG - 1 ? imgUrls[0] : imgUrls[index];
      ROOT.children[index].alt =   
        index === LENG - 1 ? LENG : index + 1;  
    }

    ROOT.children[indexPrev].classList.toggle('slider__item--hidden',false);  
    ROOT.children[indexPrev].classList.toggle('slider__item--fadeout');
    ROOT.children[indexPrev].classList.toggle('slider__item--fadein', false);
    ROOT.children[index].classList.toggle('slider__item--hidden', false); 
    ROOT.children[index].classList.toggle('slider__item--fadeout', false); 
    ROOT.children[index].classList.toggle('slider__item--fadein');
  }

  function backward() {
    index = 
      index === 0 ? LENG - 1 : index - 1; 
    let prevEl = document.createElement('img');
    prevEl.src = 
      index === 0 ? imgUrls[LENG - 1] : imgUrls[index - 1];;
    prevEl.alt =   
      index === 0 ? LENG : index;  
    prevEl.classList.add('slider__item');  
    ROOT.prepend(prevEl);
    ROOT.removeChild(ROOT.children[3]);
    setAnimation();  
  }

  function mainLoop() {;
    setInterval(forward, 6000);
  }

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (event.defaultPrevented){
      return;
    } else if (keyName === 'ArrowRight') {
      forward();  
    } else if (keyName === 'ArrowLeft'){
      backward();
    }
  });

  for (let i = 0; i < LENG; i++) {
    let el = document.createElement('img');
    el.classList.add('slider__item--hidden');
    el.classList.add('slider__item');
    ROOT.appendChild(el);
  }
  ROOT.children[0].src = imgUrls[0]; 
  ROOT.children[0].alt = 1; 
  ROOT.children[0].classList.remove('slider__item--hidden'); 
  mainLoop();

}());
