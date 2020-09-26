// Things are happening
console.log("Page action chrome extension is running!");

let inputs = document.getElementsByTagName("input");

var elm;
for (elm of inputs) {
    elm.addEventListener("focusin", focus_in, false);
    elm.addEventListener("focusout", focus_out, false);
    elm.addEventListener("keyup", on_key_up, false);
}

function focus_in() {
    console.log("name:" + this.name);
    this.style.backgroundColor = "yellow";
}

function focus_out() {
    this.style.backgroundColor = "white";
}

function on_key_up() {
    console.log(this.value[this.value.length - 1]);
    if (this.value[this.value.length - 1] === ' ') {
        detectLanguage(this.value);
    }
}

function detectLanguage(inputText) {
        chrome.i18n.detectLanguage(inputText, function(result) {
          var outputLang = "Detected Language: ";
          var outputPercent = "Language Percentage: ";
          for(i = 0; i < result.languages.length; i++) {
            outputLang += result.languages[i].language + " ";
            outputPercent +=result.languages[i].percentage + " ";
          }
          console.log(outputLang + "\n" + outputPercent + "\nReliable: " + result.isReliable);
        });
      }

