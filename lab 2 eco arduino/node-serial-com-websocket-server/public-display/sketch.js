const NGROK = `${window.location.hostname}`;
const URL = `http://${window.location.hostname}:8080`;
let socket = io(NGROK, { path: '/real-time'});

let recomendation=document.getElementById("Svalue"); //La valiable que busca el elemento del DOM para poner el mensaje según el valor del sensor
let Astatus=document.getElementById("swichA");//Las variables del estado de los bombillos
let Bstatus=document.getElementById("swichB");
let feedbA=document.getElementById("Astatus");//Las variables que cambian el nombre entre ON & OFF
let feedbB=document.getElementById("Bstatus");


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
socket.on('arduinoMessage', (arduinostatus) => {
    let {statusA,statusB,signal } = arduinostatus;
    message(signal);
    feedb(statusA,statusB);
    Astatus.addEventListener("click",()=>{
        switch (statusA) {
            case 0:
                socket.emit('orderForArduino','P');
                break;
            case 1:
                socket.emit('orderForArduino','A');
            default:
                break;
        }
    });
    
    Bstatus.addEventListener("click",()=>{
        switch (statusB) {
            case 0:
                socket.emit('orderForArduino','E');
                break;
            case 1:
                socket.emit('orderForArduino','O');
            default:
                break;
        }
    });
});

function message(signal) {
if (signal>=600) {
    recomendation.innerText="Hay suficiente luz, apaga las luces";
} else {
    recomendation.innerText="Hay poca luz, enciende las luces";
}
}
function feedb(A,B){
    if (A===0) {
        feedbA.innerText="OFF";
    } else {
        feedbA.innerText="ON";
    }
    if (B===0) {
        feedbB.innerText="OFF";
    } else {
        feedbB.innerText="ON";
    }
};