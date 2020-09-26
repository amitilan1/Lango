let lango_flag = false;
let space_flag = false;
const HEB_LAYOUT = "/'קראטוןםפ][שדגכעיחלךף,\זסבהנמצתץ.";
const ENG_LAYOUT = "qwertyuiop[]asdfghjkl;'\zxcvbnm,./";
// TODO add arabic
//const ARAB_LAYOUT = "";

let SRC_LAYOUT, TGT_LAYOUT;
let LANG_NUM = 2;

console.log("Page action chrome extension is running!");
console.log("flags: "+lango_flag+space_flag);

let inputs = document.getElementsByTagName("input");

var elm;
for (elm of inputs) {
    elm.addEventListener("focusin", focus_in, false);
    elm.addEventListener("focusout", focus_out, false);
    elm.addEventListener("keyup", on_key_up, false);
}

/**
 * temp function
 */
function focus_in() {
    console.log("name:" + this.name);
    this.style.backgroundColor = "yellow";
}

/**
 * temp function
 */
function focus_out() {
    this.style.backgroundColor = "white";
}

/**
 * handle letter after typed
 */
function on_key_up() {

    // if the the flag is true - switch every letter
    if (lango_flag){
        var new_letter = switchChars(this.value[this.value.length - 1], SRC_LAYOUT, TGT_LAYOUT);
        this.value[this.value.length - 1] = new_letter;
        return;
    }

    // // when press ENTER - init the flag
    // if (this.value[this.value.length - 1] === 13){
    //     console.log("enter pressed");
    //     lango_flag  = false;
    //     space_flag = false;
    //     return;
    // }

    // when two words were typed - check if need to lango
    if (this.value[this.value.length - 1] === ' ') {
        // its the second space (two words at least) - check
        if (space_flag){
            let cur_lang = detectChars(this.value);
            if(check_lango(this.value, cur_lang)) {
                for (let i = 1; i < LANG_NUM; i++) {
                    // change the chars to the next language and check if lango needed
                    this.value = switchChars(this.value, cur_lang, (cur_lang + i) % LANG_NUM);
                    if(!check_lango(this.value)){ // if no lango needed (target lang was found)
                        lango_flag = true;
                        break;
                    }
                }
            }
        }
        // its the first space - remember
        else {
            space_flag = true;
        }
    }
}

/**
 * take two words string and check each of them in the given language.
 * if both are not in the language (lango needed) - return true.
 * else return false.
 */
function check_lango(phrase, language) {
    var words = phrase.split(" ");
    return (!get_dict(words[0], language)) && (!get_dict(words[1], language));
}

/**
 * check if the input text is in the given language.
 * return true if it is, false otherwise
 * @param inputText
 * @prarm language
 */
function get_dict(inputText){
    var invocation = new XMLHttpRequest();
    var url = "https://dictapi.lexicala.com/search?source=global&language=he&text=" + inputText;
    invocation.open("GET", url, true, 'Lango', 'hapshuta');
    invocation.withCredentials = true;
    invocation.send();
    console.log(invocation);
}


function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        document.querySelector("#ipText").innerHTML = response.ip;
    }
}


/**
 *
 * @param str - the input string
 * @param cur_lang - the language the current chars are in
 * @param tgt_lang - the language to switch the chars to
 * @returns new_string - the string with the characters replaced
 */
// TODO fix API
function switchChars(str, cur_lang, tgt_lang) {
    var new_string = "";

    switch (tgt_lang) {
        // according to target language, choose which two layouts are active
        case 1:
            TGT_LAYOUT = ENG_LAYOUT;
        case 2:
            TGT_LAYOUT = HEB_LAYOUT;
        //case 3:
        //    TGT_LAYOUT = ARAB_LAYOUT;
    }

    for (var i = 0; i < str.length; i++) {
        // switch the characters according to the mapping
        var indexInArray = SRC_LAYOUT.indexOf(stringToTranslate[i]);
        newString += TGT_LAYOUT[i];
    }

    return new_string;
}

/**
 * detect which language the characters in the input string belong to
 * @param str - the input string
 * TODO - currently returns 1 for English, 2 for Hebrew, 3 for Arabic
 */
function detectChars(str) {
    var char_code = String(str.trim().charCodeAt(0));
    if (64 < char_code < 91 || 96 < char_code < 123) {
        // English
        SRC_LAYOUT = ENG_LAYOUT;
        return 1;
    }
    if (1424 <= char_code <= 1535) {
        // Hebrew
        SRC_LAYOUT = HEB_LAYOUT;
        return 2;

     }
        // else {
    //     // Arabic
    //     SRC_LAYOUT = ARAB_LAYOUT;
    //     return 3;
    // }
}