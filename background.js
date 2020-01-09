//starts worker of stockfish
var stockfish = new Worker("stockfish.js");

//listen for tab title name change
// run function that makes the best move run


//sends bestmove when found
stockfish.onmessage = function onmessage(event) {
    if (event.data.startsWith("bestmove")) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var move = event.data.substring(8,13);
            chrome.tabs.sendMessage(tabs[0].id, {move:move});
        });
    }
};

//sends current FEN to stockfish
chrome.runtime.onMessage.addListener(  
    function(request) {
        stockfish.postMessage("position fen " + request.fen);
        stockfish.postMessage("go depth 10");
    }
);

