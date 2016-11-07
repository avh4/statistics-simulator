var interval = 2 * 60 * 1000;

function schedule(interval) {
  var now = new Date().getTime();
  var timeSinceLast = now % interval;
  var timeUntilNext = interval - timeSinceLast;

  setTimeout(trigger, timeUntilNext);
}

function trigger() {
  var imageUrl = chrome.extension.getURL('crash.png');
  document.write('');
  document.close();
  document.body.innerHTML =
    '<style>body { background-color: rgb(247, 247, 247); margin: 120px auto; padding: 10px; width: 600px; font-family: sans-serif; overflow: hidden; }</style>' +
    '<img src="' + imageUrl + '" width="48">' +
    '<p style="font-size: 24px; color: rgb(50, 50, 50)">Aw, Snap!</p>' +
    '<p style="font-size: 14px; color: rgb(100, 100, 100)">Something went wrong while displaying this webpage.</p>'
    ;
  setTimeout(showReport);
  setTimeout(trigger, interval);
}


function showReport() {
  var now = new Date().getTime();
  var outOfEigth = Math.floor(now % (interval * 8) / interval);
  var outOfTen = Math.floor(now % (interval * 10) / interval);
  var what = "woman";
  if (outOfTen == 0) {
    what = "man";
  }
  if (outOfEigth == 0) {
    what = "child";
  }
  var message = "A " + what + " has been sexually assaulted.";
  var report = {
      name:        "SexualAssaultError",
      level:       "Show Stopper",
      message:     message,
      htmlMessage: message,
      toString:    function(){return this.name + ": " + this.message;}
  };
  throw report;
}

schedule(interval);
