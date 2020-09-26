let lango_flag = false;
let space_flag = false;
let temp_flag = false;
const HEB_LAYOUT = "/'קראטוןםפ][שדגכעיחלךף,\\זסבהנמצתץ.";
const ENG_LAYOUT = "qwertyuiop[]asdfghjkl;'\\zxcvbnm,./";
const ARAB_LAYOUT = "/.,منبفثخز';لكجغفدسا\][بويويترآوق";

var heb_dict = {
    47: 0,// '/',
    39: 1,// '\'',
    1511: 2,// 'ק',
    1512: 3,// 'ר',
    1488: 4,//'א',
    1496: 5,// 'ט',
    1493: 6,// 'ו',
    1503: 7,// 'ן',
    1501: 8,// 'ם',
    1508: 9,// 'פ',
    93: 10,// ']',
    91: 11,// '[',
    1513: 12,// 'ש',
    1491: 13,// 'ד',
    1490: 14,// 'ג',
    1499: 15,// 'כ',
    1506: 16,// 'ע',
    1497: 17,// 'י',
    1495: 18,// 'ח',
    1500: 19,// 'ל',
    1498: 20,// 'ך',
    1507: 21,// 'ף',
    44: 22,// ',',
    92: 23,// '\\',
    1494: 24,// 'ז',
    1505: 25,// 'ס',
    1489: 26,//'ב',
    1492: 27,// 'ה',
    1504: 28,// 'נ',
    1502: 29,// 'מ',
    1510: 30,// 'צ',
    1514: 31,// 'ת',
    1509: 32,// 'ץ',
    46: 33// '.'
};

var SRC_LAYOUT, TGT_LAYOUT, SRC_LANG, TGT_LANG;
var LANG_NUM = 2;

console.log("Page action chrome extension is running!");

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
    if (lango_flag) {
        console.log("case lango");
        var new_letter = switchChars(this.value[this.value.length - 1], SRC_LANG, TGT_LANG);
        var temp = this.value;
        temp = temp.substring(0, this.value.length - 1) + new_letter;
        this.value = temp;
        return;
    }

    // when two words were typed - check if need to lango
    if (this.value[this.value.length - 1] === ' ') {
        // its the second space (two words at least) - check
        if (space_flag) {
            console.log("case second pace");
            let cur_lang = detectChars(this.value);
            if (check_lango(this.value, cur_lang)) {
                for (let i = 1; i < LANG_NUM; i++) {
                    // change the chars to the next language and check if lango needed
                    this.value = switchChars(this.value, cur_lang, (cur_lang + i) % LANG_NUM);
                    if (!check_lango(this.value, (cur_lang + i) % LANG_NUM)) { // if no lango needed (target lang was found)
                        lango_flag = true;
                        TGT_LANG = (cur_lang + i) % LANG_NUM;
                        break;
                    }
                }
            }
        }
        // its the first space - remember
        else {
            space_flag = true;
            console.log("case first space");
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
    if(!temp_flag) {
        temp_flag = true;
        return (!get_dict(words[0], language)) && (!get_dict(words[1], language));
    }
    else return !(!get_dict(words[0], language)) && (!get_dict(words[1], language));
}

/**
 * check if the input text is in the given language.
 * return true if it is, false otherwise
 * @param inputText
 * @prarm language
 */
function get_dict(inputText, language) {
    // var invocation = new XMLHttpRequest();
    // var url = "https://dictapi.lexicala.com/search?source=global&language=he&text=" + inputText;
    // invocation.open("GET", url, true, 'Lango', 'hapshuta');
    // invocation.withCredentials = true;
    // invocation.send();
    // console.log(invocation);
    return false;
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
// TODO fix API?
function switchChars(str, cur_lang, tgt_lang) {
    var new_string = "";

    switch (tgt_lang) {
        // according to target language, choose which two layouts are active
        case 0:
            TGT_LAYOUT = ENG_LAYOUT;
            break;
        case 1:
            TGT_LAYOUT = HEB_LAYOUT;
            break;
        case 2:
            TGT_LAYOUT = ARAB_LAYOUT;
            break;
    }

    for (var i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            new_string += ' ';
            continue;
        }
        // switch the characters according to the mapping
        if (cur_lang === 1) {
            new_string += TGT_LAYOUT[heb_dict[str.charCodeAt(i)]];
        }
        else {
            var indexInArray = SRC_LAYOUT.indexOf(str[i]);
            new_string += TGT_LAYOUT[indexInArray];
        }
    }

    return new_string;
}

/**
 * detect which language the characters in the input string belong to
 * @param str - the input string
 * TODO - currently returns 0 for English, 1 for Hebrew, 2 for Arabic
 */
function detectChars(str) {
    var char_code = str.trim().charCodeAt(0);
    if (((64 < char_code) &&(char_code < 91) )|| ((96 < char_code)&&(char_code < 123))) {
        // English
        SRC_LAYOUT = ENG_LAYOUT;
        SRC_LANG = 0;
        console.log("eng");
        return 0;
    }
    if ((1488 <= char_code) && (char_code <= 1535)) {
        // Hebrew
        SRC_LAYOUT = HEB_LAYOUT;
        SRC_LANG = 1;
        console.log("heb");
        return 1;

    } else {
        // Arabic
        SRC_LAYOUT = ARAB_LAYOUT;
        console.log("arab");
        return 2;
    }
}