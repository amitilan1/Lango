const HEB_LAYOUT = "/'קראטוןםפ][שדגכעיחלךף,\זסבהנמצתץ.";
const ENG_LAYOUT = "qwertyuiop[]asdfghjkl;'\zxcvbnm,./";
// TODO add arabic
const ARAB_LAYOUT = "";

let SRC_LAYOUT, TGT_LAYOUT;

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

    } else {
        // Arabic
        SRC_LAYOUT = ARAB_LAYOUT;
        return 3;
    }
}

/**
 *
 * @param str - the input string
 * @param cur_lang - the language the current chars are in
 * @param tgt_lang - the language to switch the chars to
 * @returns new_string - the string with the characters replaced
 */
function switchChars(str, cur_lang, tgt_lang) {
    var new_string = "";

    switch (tgt_lang) {
        // according to target language, choose which two layouts are active
        case 1:
            TGT_LAYOUT = ENG_LAYOUT;
        case 2:
            TGT_LAYOUT = HEB_LAYOUT;
        case 3:
            TGT_LAYOUT = ARAB_LAYOUT;
    }

    for (var i = 0; i < str.length; i++) {
        // switch the characters according to the mapping
        var indexInArray = SRC_LAYOUT.indexOf(stringToTranslate[i]);
        newString += TGT_LAYOUT[i];
    }

    return new_string;
}

/**
 * detect the language the string is written in
 * @param str - the input string
 * @returns 1 for English, 2 for Hebrew, 3 for Arabic
 */
function detectLang(str) {
    // TODO fill
    return 1;
}


// 1 - get input from textbox
// 2 - check which language is detected.
    // 3 - check match to char language
    // 4 - if they don't match, loop over other languages, switch characters and check again.
        // 5 - replace the text in the textbox
        // 6 - replace all future typed chars accordingly
