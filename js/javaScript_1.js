//Konstanten für Buttons und Textfelder
const chatBot = document.getElementsByClassName("chatBot")[0];
const textBox = document.getElementById("textBox");
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");

//Aufrufen der JSON Datei
var inhalt = loadDoc("../json/Kapitel_1.json");

//Conversations counter
var counter = 0;

//Audio volume
var audio_loop = document.getElementById("audio-loop");
audio_loop.volume = 0.1;

function increase() {
    if (audio_loop.paused) audio_loop.play();
    audio_loop.volume += 0.05;
}

function decrease() {
    if (audio_loop.volume === 0) audio_loop.pause();
    audio_loop.volume -= 0.05;
}




//Aufruf der JSON Datei
function loadDoc(filepath) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", filepath, false);
    xhttp.send(null);
    return JSON.parse(xhttp.responseText);
}

//Erstellung der Startseite
setup();

//Funktion für Startseite
function setup() {
    textBox.innerHTML = inhalt[counter][0].Text;
    btn1.innerHTML = inhalt[counter][0].Buttons[0].btn;
    btn2.style.display = "none";
    btn3.style.display = "none";
    counter++;
}

//Hinzufügen der neuen JSON texte
function writeNext(option) {
    //groesse/ laenge des Buttonarrays, wichtig für button visibility
    let buttonArray = inhalt[counter][option].Buttons.length;

    if (buttonArray === 0) window.location.href = "../html/Credits.html";
    else {
        //Ausblenden der Buttons die nicht gebraucht werden
        btn1.style.display = (buttonArray >= 1) ? "block" : "none";
        btn2.style.display = (buttonArray >= 2) ? "block" : "none";
        btn3.style.display = (buttonArray >= 3) ? "block" : "none";

        
        //Printen der Buttontexte in textBox
        if (option === 0) textBox.innerHTML += "<p class=\"right\">" + btn1.innerHTML + "</p>";
        else if (option === 1) textBox.innerHTML += "<p class=\"right\">" + btn2.innerHTML + "</p>";
        else if (option === 2) textBox.innerHTML += "<p class=\"right\">" + btn3.innerHTML + "</p>";

        //Printen des Textes der AI in textBox
        textBox.innerHTML += inhalt[counter][option].Text;

        //Printen der Texte in Button
        if (buttonArray >= 1) btn1.innerHTML = inhalt[counter][option].Buttons[0].btn;
        if (buttonArray >= 2) btn2.innerHTML = inhalt[counter][option].Buttons[1].btn;
        if (buttonArray >= 3) btn3.innerHTML = inhalt[counter][option].Buttons[2].btn;

        // nach unten scrollen beim Klicken
        chatBot.scrollTo(0, chatBot.scrollHeight);

        if (inhalt[counter][option].Buttons[0].BG != null) {
            document.body.style.backgroundImage = inhalt[counter][option].Buttons[0].BG;
        }

        if (inhalt[counter][option].Buttons[0].path != null) {
            console.log(inhalt);
            inhalt = loadDoc(inhalt[counter][option].Buttons[0].path);

            counter = 0;
        } else {
            //naechste Konversation
            counter++;
        }
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//blinking cursor
var cursor = true;
var speed = 250;
setInterval(() => {
    if (cursor) {
        document.getElementById('cursor').style.opacity = 0;
        cursor = false;
    } else {
        document.getElementById('cursor').style.opacity = 1;
        cursor = true;
    }
}, speed);

//Text aus Button in Eingabezeile printen bei hover
function buttonhover(button) {
    document.querySelector(".eingabefeld input").value = button.innerHTML;
}

//Text aus Eingabezeile loeschen, wenn Maus von Button weg ist
function buttonhoverout() {
    document.querySelector(".eingabefeld input").value = "";
}

function gotoBottom(id) {
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}
//myaudio.paused
