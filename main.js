// func == function
// str == String

// padStart(targetLength, padString) pads the current str with another str (repeated) until it reaches the target length.

// setInterval(func, ms): runs func every ms; store in var to stop with clearInterval(var)

document.addEventListener('DOMContentLoaded', () => {
  
  setTimeout(() => {
    const loadBar = document.querySelector('.loadBar');
    
    loadBar.style.opacity = '0';
    
    // Wait for opacity transition to finish (500ms) before hiding
    setTimeout(() => {
      loadBar.style.display = 'none';
    }, 500);
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
  let isTimeStarted = false;
  
  btns.addEventListener('click', (e) => {
    let btn = e.target.closest('.btn');
    if (!btn) return;
    
    let startBtn = document.getElementById('start');
    
    switch (btn.id) {
      case 'start':
        if (timerTrack !== null) {
          sTimer.stop()
          btn.innerHTML = "<i class='bx bx-play'></i>"
        } else {
          sTimer.start();
          btn.innerHTML = "<i class='bx bx-stop' ></i>";
          isTimeStarted = true
        }
        break;
        
      case 'restart':
        if (isTimeStarted) {
          sTimer.restart();
          startBtn.innerHTML = "<i class='bx bx-play'></i>";
          isTimeStarted = false;
        } else {
          console.log('Start Time Timer First...')
        }
        break;
        
      case 'editTime':
        timeEditor.editMode();
        break;
        
      default:
        break;
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
    
    stop: function() {
      clearInterval(timerTrack);
      timerTrack = null;
    },
    
    restart: function() {
      clearInterval(timerTrack);
      timerTrack = null;
      this.mins = this.secs = this.mss = 0;
      this.timerUpdates();
    },
    
    // Time Logics
    timerTimes: function() {
      this.mss += 1;
      
      // Checks if Timer Nums are not Negetive
      if (this.mins < 0 || this.secs < 0 || this.mss < 0) {
        console.log(" There's a problem, numbers can't be less then 0");
      }
      //Updates Sec if ms is 100 (10ms × 100 = 1s)
      if (this.mss === 100) {
        this.mss = 0;
        this.secs++;
      }
      // Updates Min if Sec is 60
      if (this.secs === 60) {
        this.secs = 0;
        this.mins++;
      }
      if (this.mins === 60 && this.secs === 0 && this.mss === 0) {
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
  };
  
  // A Section To Edit Some Func
  let timeEditor = {
    editMode: function() {
      editPopup.classList.toggle('active');
    },
    
    remove: function() {
      editPopup.classList.remove('active')
    },
    
    form: function() {
      document.querySelector('.editOps').addEventListener('click', function(e) {
        let editbtn = e.target.closest('.editbtns');
        if (!editbtn) return;
        
        switch (editbtn.id) {
          case 'settings':
            alert('settings');
            break;
          case 'maxNum':
            alert('MaxNum');
            break;
          case 'saveNum':
            alert('SaveNum');
            break;
        }
      });
    },
    
  };
  timeEditor.form();
  
  // To Remove The Popup
  const cancelBtn = document.querySelector('.cancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      timeEditor.remove();
    });
  }
  
  // SFX (ADD URS) Consider adding sounds tgat are instent and can be use on btn clicks using
  // sfx.play.slide();
  // sfx.play.click();
  let sfx = {
    play: {
      slide: function() {
        const audio = new Audio('/audios/slide.wav');
        audio.preload = 'auto';
        audio.play().catch(err => {
          console.warn('Autoplay blocked:', err);
        });
      },
      
      click: function() {
        const audio = new Audio('/audios/click.wav');
        audio.preload = 'auto';
        audio.play().catch(err => {
          console.warn('Autoplay blocked:', err);
        });
      }
    }
  };
  
  
});