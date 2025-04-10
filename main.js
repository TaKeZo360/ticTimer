console.log('Welcome To TicTimer');


let min = document.getElementById('min');
let sec = document.getElementById('sec');
let ms10 = document.getElementById('ms');
let btns = document.getElementById('btns');

let mins = 0;
let secs = 0;
let mss = 0;
let timerTrack = null;

btns.addEventListener('click', (e) => {
  let btn = e.target.closest('.btn');
  if (!btn) return;
  
  if (btn.id === 'start') {
    if (timerTrack !== null) {
      console.log('Timer Has Already Started')
    }
    sTimer.start();
  } else if (btn.id === 'stop') {
    if (timerTrack !== null) {
      clearInterval(timerTrack)
      timerTrack = null;
    } else {
      console.log('Timer has already Stopped')
    }
  }
  else if (btn.id === 'restart') {
    clearInterval(timerTrack)
    timerTrack = null;
    mins = secs = mss = 0;
    sTimer.timerUpdates();
    sTimer.start();
  } else if (btn.id === 'editTime') {
    alert('In Progress ');
  }
});

let sTimer = {
  start: function() {
    timerTrack = setInterval(() => {
      this.timerTimes();
    }, 10);
  },
  
  timerTimes: function() {
    mss += 1;
    
    if (mss === 100) {
      mss = 0;
      secs++;
    }
    if (secs === 60) {
      secs = 0;
      mins++;
    }
    this.timerUpdates()
  },
  
  timerUpdates: function() {
    ms10.textContent = String(mss).padStart(2, '0');
    sec.textContent = String(secs).padStart(2, '0');
    min.textContent = String(mins).padStart(2, '0');
  },
}