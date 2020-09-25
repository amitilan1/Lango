
var context_id = -1;

console.log("bg running");

// chrome.input.onFocus.addListener(function (context) {
//     context_id = context.contextID;
//     console.log("focus");
// });
//
// chrome.input.onKeyEvent.addListener(
//     function (engineID, keyData) {
//         console.log("key event");
//         if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
//                 console.log("small letter");
//             chrome.input.ime.commitText({
//                 "contextID": context_id,
//                 "text": keyData.key.toUpperCase()
//             });
//             return true;
//         } else {
//             return false;
//         }
//     });