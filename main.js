// func == function
// str == String

// padStart(targetLength, padString) pads the current str with another str (repeated) until it reaches the target length.

// func 'setInterval(func, ms)' refreshes a func according to your ms (Milliseconds)... if you store it in a var you can stop it too (using clearInterval(var)) use var not the function

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.loadBar').style.display = 'none';
  }, 3000);
  
  
  console.log('Welcome To TicTimer...');
  
  
  const min = document.getElementById('min');
  const sec = document.getElementById('sec');
  const ms10 = document.getElementById('ms');
  const btns = document.getElementById('btns');
  const editPopup = document.getElementById('editPopup');
  
  
  if (!min || !sec || !ms10 || !btns) {
    return;
  }
  
  let timerTrack = null;
  
  btns.addEventListener('click', (e) => {
    const startBtn = document.getElementById('start');
    let btn = e.target.closest('.btn');
    if (!btn) return;
    
    if (btn.id === 'start') {
      if (timerTrack !== null) {
        clearInterval(timerTrack)
        timerTrack = null;
        btn.innerHTML = "<i class='bx bx-play'></i>"
      } else {
        sTimer.start();
        btn.innerHTML = "<i class='bx bx-stop' ></i>"
      }
    } else if (btn.id === 'restart') {
      clearInterval(timerTrack)
      timerTrack = null;
      sTimer.mins = sTimer.secs = sTimer.mss = 0;
      sTimer.timerUpdates();
      sTimer.start();
     startBtn.innerHTML = "<i class='bx bx-stop' ></i>";
    } else if (btn.id === 'editTime') {
      timeEditor.editMode();
    }
  });
  
  let sTimer = {
    mins: 0,
    secs: 0,
    mss: 0,
    //Starts The Timer
    start: function() {
      timerTrack = setInterval(() => {
        this.timerTimes();
      }, 10);
    },
    // Time Logics
    timerTimes: function() {
      this.mss += 1;
      
      if (this.mss === 100) {
        this.mss = 0;
        this.secs++;
      }
      if (this.secs === 60) {
        this.secs = 0;
        this.mins++;
      }
      if (this.mins === 60) {
        this.mins = this.secs = this.mss = 0;
        clearInterval(timerTrack);
        timerTrack = null
        console.log('Max Number Limit Reached...')
      }
      this.timerUpdates()
    },
    // Updates Html
    timerUpdates: function() {
      ms10.textContent = String(this.mss).padStart(2, '0');
      sec.textContent = String(this.secs).padStart(2, '0');
      min.textContent = String(this.mins).padStart(2, '0');
    },
  }
  // A Section To Edit Some Func
  let timeEditor = {
    editMode: function() {
      editPopup.classList.toggle('active');
    },
  }
  
  document.querySelector('.cancelBtn').addEventListener('click', () => {
    editPopup.classList.remove('active')
  });
});