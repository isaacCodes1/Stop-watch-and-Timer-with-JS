  $(".stopwatch-btn").click(function(){
    //hide all other wrappers...
    $(".outer-wrapper > div").slideUp();
    //show Stopwatch wrapper...
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
  });

  $(".back-btn").click(function(){
    //hide all other wrappers...
    $(".outer-wrapper > div").slideUp();
    //show Clock wrapper...
    $(".clock").slideDown();
    //update type text
    $(".type").html("Stopwatch");
  });

  $(".timer-btn").click(function(){
    //hide all other wrappers...
    $(".outer-wrapper > div").slideUp();
    //show timer wrapper...
    $(".timer").slideDown();
    //update type text
    $(".type").html("Stopwatch");
  });

  const addTrailingZero=(num)=>{
    return num < 10 ? "0" + num : num;
  };  
    
  
  const updateTime=()=>{
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  //Conveerting 24hours to 12 hours...
  hours = hours % 12 || 12

  //add trailing Zeros if less than 107...
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
}

//Call the function on page load...


updateTime();


//Call function after every second...


setInterval(updateTime, 1000);

//Stopwatch...

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMilliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;
    
    const stopwatch = () => {
      //increasing milliseconds by one...
      stopwatchMilliseconds++;

      if (stopwatchMilliseconds === 100) {
        //if stopwatch millisecond equals 100 increase one second, and set as 0...

        stopwatchSeconds++;
        stopwatchMilliseconds = 0;
      }

      if (stopwatchMinutes === 60) {
        //same with hours...
        stopwatchHours++;
        stopwatchMinutes = 0;
      }

      //show values on document...
      $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
      $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
      $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
      $("#stopwatch-ms").html(addTrailingZero(stopwatchMilliseconds));
    };
    
    const startStopwatch = () => {
      if (!stopwatchRunning) {
        //if stopwatch is not running already...

        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
      }
    };

    //function to stop stopwatch...

    const stopStopwatch = () => {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
    };

    //reset stopwatch interval...


    const resetStopwatch = () => {
      //clear interval and set all values to default...
      clearInterval(stopwatchInterval);
      stopwatchHours = 0;
      stopwatchMinutes = 0;
      stopwatchSeconds = 0;
      stopwatchMilliseconds = 0;
      stopwatchRunning = false;
      laps = 0;


      //update values on document to "00"...
      $("#stopwatch-hour").html("00");
      $("#stopwatch-min").html("00");
      $("#stopwatch-sec").html("00");
      $("#stopwatch-ms").html("00");
      $(".laps").html("");
    };

    //start stopwatch on the click of start button...
    $(".start-stopwatch").click(function (){
      startStopwatch(); 

      //to hide start button and to display lap button...

      $(".start-stopwatch").hide();
      $(".lap-stopwatch").show();
    });

    $(".reset-stopwatch").click(function (){
      resetStopwatch();
      $(".start-stopwatch").show();
      $(".lap-stopwatch").hide ();
    });

    $(".lap-stopwatch").click(function(){
      //on lap button click...

      laps++;
      //remove active class...
      $(".lap").removeClass("active");
      $(".laps").prepend(
        `<div class="lap active">
            <p>Lap ${laps}</p>
            <p>
            ${addTrailingZero(stopwatchHours)} : ${addTrailingZero
              (stopwatchMinutes
              )}:
              ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero
              (stopwatchMilliseconds
              )}:
            </p>
          </div>`
      )
    });

    //Timer...

    let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMilliseconds = 0,
    timerInterval;

    const getTime = () => {
      time = window.prompt("Enter a time in Minutes");

      //convert time to seconds...
      time = time * 60;
      //update time defaults...
      setTime();
    };

    const setTime = () => {
      timerHours = Math.floor(time / 3600);
      timerMinutes = Math.floor((time % 3600) / 60);
      timerSeconds = Math.floor(time % 60);


      //To show the inputed user time on document...

      $("#timer-hour").html(addTrailingZero(timerHours));
      $("#timer-min").html(addTrailingZero(timerMinutes));
      $("#timer-sec").html(addTrailingZero(timerSeconds));
      $("#timer-ms").html(addTrailingZero(timerMilliseconds));
    };

    const timer = () => {
      timerMilliseconds--;
      if (timerMilliseconds === -1) {
        timerMilliseconds = 99;
        timerSeconds--;
      }
      if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
      }
      if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
      }

      //update time...
      $("#timer-hour").html(addTrailingZero(timerHours));
      $("#timer-min").html(addTrailingZero(timerMinutes));
      $("#timer-sec").html(addTrailingZero(timerSeconds));
      $("#timer-ms").html(addTrailingZero(timerMilliseconds));

      //check time up on every interval
      timeUp();
    };

    const startTimer = () =>{
      ///before starting, check if valid time given...
      if (timerHours === 0 & timerMinutes === 0 && timerSeconds === 0 && timerMilliseconds === 0) {
        //if all values are zero, get time...
        getTime();
      }else{
        //start timer...
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
      }
    };

    const stopTimer = () =>{
      clearInterval(timerInterval);
      $(".start-timer").show();
      $(".stop-timer").hide();
    };

    const resetTimer = () =>{
      stopTimer();
      time = 0;
      setTime();
    };

    //check if time is remaining 0...
    const timeUp = () => {
      if (
        timerHours === 0 && 
        timerMinutes === 0 && 
        timerSeconds === 0 && 
        timerMilliseconds === 0
      ){
        resetTimer();
        alert("Time's up!!");
      }
    }
    $(".start-timer").click(function(){
      startTimer();
    });
    $(".stop-timer").click(function(){
      stopTimer();
    });
    
    $(".reset-timer").click(function(){
      resetTimer();
    });
