//global variable that is set when doc is ready
var best_move_element;
var isWhite = false;
var fen = "";
var gameStarted = false;

//Initialize
var documentPlayerString = document.documentElement.innerHTML.split("player\":{\"color\":\"")[1].split("\"")[0];
gameStarted = documentPlayerString == "white" || documentPlayerString == "black";
isWhite = documentPlayerString == "white";

$(document).ready(function () {
    document.querySelector("div.round__underboard").innerHTML =  "<div>Have fun!</div><div id=\"best_move\"> Waiting... </div>";
    best_move_element = document.getElementById("best_move");
});

// get element named title
var turn = $("title")
// get the first one
var turn = turn[0]
// create an observer instance
var observer = new MutationObserver(function (mutations) {
    // do this if change
    var test = isMyTurn();
    if (test) {
        get_best_move();
    }
    var str = turn.text
    if (str.includes("Game Over")) { console.log("Game Over") };
});
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
// pass in the turn node, as well as the observer options
observer.observe(turn, config); 

function isMyTurn() {
    getFen();
    return (isWhite && fen.includes(" b")) || (!isWhite && fen.includes(" w") || (isWhite && fen==""));
}

function getFen() {
    $.get(location.href, null, function (data) {
        var temp = data.substring(data.lastIndexOf("fen\":\"") + 6);
        fen = temp.substring(0, temp.indexOf("\""));
            
    }, "text"); 
}

//gathers reloaded html and picks latest/current FEN
function get_best_move() {
    $.get(location.href, null, function(data) {
        var temp = data.substring(data.lastIndexOf("fen\":\"") + 6);
        fen = temp.substring(0,temp.indexOf("\""));
        console.log(fen);
        chrome.runtime.sendMessage({fen:fen});
    }, "text"); 
};

//displays best move when stockfish calculates it
chrome.runtime.onMessage.addListener(  
    function(request) {
        best_move_element.innerHTML = request.move;
        console.log(request.move);
        request = String(request.move);
        console.log(request);
        //letter1 = request.charAt(1);
        //letter1 = letter1.toLowerCase().charCodeAt(0) - 97 + 1;
        //letter1 = String(letter1);
        //coordinate1 = request.charAt(2);
        //letter2 = request.charAt(3);
        //letter2 = letter2.toLowerCase().charCodeAt(0) - 97 + 1;
        //letter2 = String(letter2);
        //coordinate1 = coordinate1.replace(/^"(.*)"$/, '$1');
        //coordinate2 = request.charAt(4);
        //coordinate2 = coordinate2.replace(/^"(.*)"$/, '$1');
        //console.log(letter1, coordinate1, letter2, coordinate2)

        //coordinate1_location = document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.ranks > coord:nth-child("+ (coordinate1) +")");
        //letter1_location = document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.files > coord:nth-child(" + letter1 + ")");
        //letter2_location = document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.ranks > coord:nth-child(" + (coordinate2) + ")");
        //coordinate2_location = document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.files > coord:nth-child(" + letter2 + ")");
        //console.log(coordinate2_location,letter1_location,coordinate2_location, coordinate2_location)

        //var coordinate1_location = coordinate1_location.getBoundingClientRect();
        //var letter2_location = letter2_location.getBoundingClientRect();
        //var letter1_location = letter1_location.getBoundingClientRect();
        //var coordinate2_location = coordinate2_location.getBoundingClientRect();

        //x = (coordinate2_location.x);
        //y = (letter1_location.y);

        //var event = $.Event('click');
        //event.clientX = x;
        //event.clientY = y;
        //$('div').trigger(event);
        //console.log(x, y)
        //console.log(letter1_location)


        //x = ((letter2_location.top + letter2_location.bottom) / 2);
        //y = ((coordinate2_location.right + coordinate2_location.left) / 2);

        //var event = $.Event('click');
        //event.clientX = x;
        //event.clientY = y;
        //$('div').trigger(event);

        
    }
);

// Coordinates //*[@id="main-wrap"]/main/div[1]/div[1]/div/cg-helper/cg-container/coords[1]/coord[1]
// JQuery coordinates document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.ranks > coord:nth-child(1)")

//

// Coordinates //*[@id="main-wrap"]/main/div[1]/div[1]/div/cg-helper/cg-container/coords[2]/coord[1]
//document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-helper > cg-container > coords.files > coord:nth-child(1)")