const state = {
  timerId: null,
  isActive: false,
  position: null
}


function periodElapsed() {
  $('#msg').html(state.position++);
}

function startAtPosition(position) {

  if (state.isActive) {
    clearInterval(state.timerId);
    state.isActive = false;
  }

  state.position = position;
  state.timerId = setInterval(periodElapsed, 100);
  state.isActive = true;
}


function startTimerBreaker() {
  setInterval(() => startAtPosition(0), 3333);
}

startAtPosition(0)
startTimerBreaker()