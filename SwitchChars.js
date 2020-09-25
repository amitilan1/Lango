const HEB_LAYOUT = "/'קראטוןםפ][שדגכעיחלךף,\זסבהנמצתץ.";
const ENG_LAYOUT = "qwertyuiop[]asdfghjkl;'\zxcvbnm,./";

stringToTranslate = "abc"; // TODO get input from textbox

// check if a language is detected. if not, loop over other languages, switch characters and check again.

for (var i = 0; i < languages.length; i++) {  // TODO - in installation, save all used languages to array


    // the switching process
    var newString = "";

    // according to current language, choose which two layouts are active
    const SRC_LAYOUT = HEB_LAYOUT;
    const TGT_LAYOUT = ENG_LAYOUT;

    for (var i = 0; i < stringToTranslate.length; i++) {
        var indexInArray = SRC_LAYOUT.indexOf(stringToTranslate[i]);
        newString += TGT_LAYOUT[i];
    }

    // check if the new string is a legit sentence. if so, break
}