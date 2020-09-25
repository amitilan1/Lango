// Things are happening
console.log("Page action chrome extension is running!");

// let inputs = document.getElementsByTagName("input");
// for (elm of inputs){
//     elm.value = '#F39921';
// }

var context_id = -1;

chrome.input.ime.onFocus.addListener(function (context) {
    context_id = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener(
    function (engineID, keyData) {
        if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
            chrome.input.ime.commitText({
                "contextID": context_id,
                "text": keyData.key.toUpperCase()
            });
            return true;
        } else {
            return false;
        }
    });
