let game;
let flareHz = 1;
let flareDelay = 1000/1;
let flareMessages = [];

const flareOp = () => {
  console.log('hello world');
};

const kickoff = () => {
  game = window.frames[0];
  flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)');
  setTimeout(() => flareKillable = setInterval(flareOp, flareDelay),1000)
};

const resetGame = () => {
  game = window.frames[0];
  setTimeout(() => {
    // game.reset();
    kickoff()
  }, 1000);
};

const flareLog = (message) => {
  if (!message) return;
  flareMessages.push(message);
  let messages = '';
  flareMessages.forEach((mess, i) => {
    mess = mess.replace(/Error/g, `<span style="color:red">Error</span>`);
    mess = mess.replace(/Project Completed/g, `<span style="color:green">Project Completed</span>`);
      if (i > 0) {
        messages += '<br/>';
      }
      if (i < flareMessages.length - 1) {
        messages += '&nbsp;';
      } else {
          messages += '(new)&nbsp;';
      }
      messages += mess;
  });
  document.getElementById('flareOutput').innerHTML = messages;
  document.getElementById("flareOutput").scrollTop = document.getElementById("flareOutput").scrollHeight;
  console.log(`${game.ticks}- ${message}`);
};
