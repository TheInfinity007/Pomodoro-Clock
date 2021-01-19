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

var rectangle = document.getElementById('rectangle');
var totalLength = 2*rectangle.offsetHeight + 2*rectangle.offsetWidth;
var progressVal = 0;

var intervalId;
var total;

var sessionCount = 1;
let m, n;

sessionTotal = sTime*60;
breakTotal = bTime*60;
var counter = 0;
var flag = true;

startBtn.addEventListener('click', function(){
    if(startBtn.innerText == "Start"){
        startBtn.innerText = "Pause";
        removeListenersToUtilityKeys();
        intervalId = setInterval(function(){
            counter++;
            if(sessionTotal == 0 && flag){
                counter = 0;
                flag = false; 
            } 
            if(sessionTotal > 0){
                sessionTotal -= 1;
                m = Math.floor(sessionTotal/60);
                s = sessionTotal%60;
                total = parseInt(session.innerText)*60;
            }
            else if(breakTotal > 0){
                breakHeading.style.display = "block";
                sessionHeading.style.display = "none";
                document.querySelector('.wrapper').style.background = "#cd3e00";

                // below line not working
                rectangle.setAttribute('style', 'background: linear-gradient(to right, #cd3e00 99.9%, transparent), linear-gradient(to bottom, #cd3e00 99.9%, transparent), linear-gradient(to right, #cd3e00 99.9%, transparent), linear-gradient(to bottom, #cd3e00 99.9%, transparent), linear-gradient(to right, #cd3e00 99.9%, transparent)');

                clock.style.color = "#cd3e00";
                breakTotal -= 1;
                m = Math.floor(breakTotal/60);
                s = breakTotal%60;
                total = parseInt(brake.innerText)*60;
            }
            else{
                resetHeadingTotalAndBorder();
                sessionCount += 1;
                count.innerText = sessionCount;
                total = parseInt(session.innerText)*60;
                counter = 0;
                flag = true;
            }
            min.innerText = (m < 10) ? "0" + m : m;
            sec.innerText = (s < 10)? "0"+s : s;
            animate((counter/total)*100);
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
    counter = 0;
    total = 300;
    flag = true;
    rectangle.setAttribute('style', 'background-position: 0px 0px, 0px 0px, 0px 190px, 180px 0px, 95px 0px');
    // below line working
    // rectangle.setAttribute('style', 'background: linear-gradient(to right, #cd3e00 99.9%, transparent), linear-gradient(to bottom, #cd3e00 99.9%, transparent), linear-gradient(to right, #cd3e00 99.9%, transparent), linear-gradient(to bottom, #cd3e00 99.9%, transparent), linear-gradient(to right, #cd3e00 99.9%, transparent)');
}

function resetHeadingTotalAndBorder(){
    breakHeading.style.display = "none";
    sessionHeading.style.display = "block";
    sessionTotal = sTime*60;
    breakTotal = bTime*60;
    clock.style.color = "#0a8e9e";
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

function animate(input){
    borderLength = (input/100)*totalLength;

    if(borderLength <= rectangle.offsetWidth/2){
        backgroundPos = 'background-position: ' + (0-borderLength) + 'px 0px, 0px 0px, 0px 190px, 180px 0px, 95px 0px';
        rectangle.setAttribute('style', backgroundPos);
    }else if(borderLength <= (rectangle.offsetWidth/2+rectangle.offsetHeight)){
        backgroundPos = 'background-position: -95px 0px, 0px ' + (borderLength-95) + 'px, 0px 190px, 180px 0px, 95px 0px';
        rectangle.setAttribute('style', backgroundPos);
    }else if(borderLength <= ((rectangle.offsetWidth/2)*3+rectangle.offsetHeight)){
        backgroundPos = 'background-position: -95px 0px, 0px 200px, ' + (borderLength-95-200)+ 'px 190px, 180px 0px, 95px 0px';
        rectangle.setAttribute('style', backgroundPos);
    }else if(borderLength <= ((rectangle.offsetWidth/2)*3+rectangle.offsetHeight*2)){
        backgroundPos = 'background-position: -95px 0px, 0px 200px, 190px 190px, 180px ' + (0-(borderLength-95-200-190)) + 'px, 95px 0px';
        rectangle.setAttribute('style', backgroundPos);
    }else{
        backgroundPos = 'background-position: -95px 0px, 0px 200px, 190px 190px, 180px -200px, 95px 0px';
        backgroundSize = 'background-size: 0px 0px, 0px 0px, 0px 0px, 0px 0px, ' + (95-(borderLength-95*3-200*2)) + 'px 10px';

        rectangle.setAttribute('style', backgroundPos);
        rectangle.setAttribute('style', backgroundSize);
    }
}

function init(){
    reset();
    resetBtn.addEventListener('click', reset);
}

init();

