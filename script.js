var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");
var smBtn = document.getElementById("sm");
var spBtn = document.getElementById("sp");
var bmBtn = document.getElementById("bm");
var bpBtn = document.getElementById("bp");

var breakHeading = document.querySelector(".heading .break");
var sessionHeading = document.querySelector(".heading .session");

var session = document.getElementById("session");
var brake = document.getElementById("break");
var clock = document.getElementById("clock");
var count = document.getElementById("count");

var sTime = parseInt(session.innerText);
var bTime = parseInt(brake.innerText);

var min = document.getElementById("min");
var sec = document.getElementById("sec");

var intervalId;

var total;

var sessionCount = 1;
let m, n;


sessionTotal = sTime*60;
breakTotal = bTime*60;

startBtn.addEventListener('click', function(){
    if(startBtn.innerText == "Start"){
        startBtn.innerText = "Pause";
        removeListenersToUtilityKeys();
        intervalId = setInterval(function(){
            if(sessionTotal > 0){
                sessionTotal -= 1;
                m = Math.floor(sessionTotal/60);
                s = sessionTotal%60;
            }
            else if(breakTotal > 0){
                breakHeading.style.display = "block";
                sessionHeading.style.display = "none";
                document.querySelector('.div-clock').style.borderColor = "#cd3e00";
                breakTotal -= 1;
                m = Math.floor(breakTotal/60);
                s = breakTotal%60;
            }
            else{
                resetHeadingTotalAndBorder();
                sessionCount += 1;
                count.innerText = sessionCount;
            }
            min.innerText = (m < 10) ? "0" + m : m;
            sec.innerText = (s < 10)? "0"+s : s;
        }, 1000);
    }else{
        startBtn.innerText = "Start";
        clearInterval(intervalId);
    }
});


function reset(){
    clearInterval(intervalId);
    addListenersToUtilityKeys();
    resetHeadingTotalAndBorder();
    session.innerText = "5";
    brake.innerText = "2";
    min.innerText = "05";
    sec.innerText = "00";
    startBtn.innerText = "Start";
    sessionCount = 1;
    count.innerText = sessionCount;
}

function resetHeadingTotalAndBorder(){
    breakHeading.style.display = "none";
    sessionHeading.style.display = "block";
    document.querySelector('.div-clock').style.borderColor = "#0a8e9e";
    sessionTotal = sTime*60;
    breakTotal = bTime*60;
}




function addSessionTime(){
    sTime = parseInt(session.innerText);
    sTime += 1;
    sessionTotal = sTime*60;
    session.innerText = sTime;
}

function subSessionTime(){
     sTime = parseInt(session.innerText);
    sTime -= 1;
    if(sTime < 0) sTime = 0
    session.innerText = sTime;
    sessionTotal = sTime*60;
}

function addBreakTime(){
    bTime = parseInt(brake.innerText);
    bTime += 1;
    brake.innerText = bTime;
    breakTotal = bTime*60;
}

function subBreakTime(){
    bTime = parseInt(brake.innerText);
    bTime -= 1;
    if(bTime < 0) bTime = 0
    brake.innerText = bTime;
    breakTotal = bTime*60;
}

function addListenersToUtilityKeys(){
    spBtn.addEventListener('click', addSessionTime);
    smBtn.addEventListener('click',subSessionTime);
    bpBtn.addEventListener('click', addBreakTime);
    bmBtn.addEventListener('click', subBreakTime);
}

function removeListenersToUtilityKeys(){
    spBtn.removeEventListener('click', addSessionTime);
    smBtn.removeEventListener('click',subSessionTime);
    bpBtn.removeEventListener('click', addBreakTime);
    bmBtn.removeEventListener('click', subBreakTime);
}

function init(){
    reset();
    resetBtn.addEventListener('click', reset);
}

init();