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
        get_dict(this.value);
    }
}



function get_dict(inputText){
    var invocation = new XMLHttpRequest();
    var url = "https://dictapi.lexicala.com/search?source=global&language=he&text=" + inputText;
    invocation.open("GET", url, true, 'Lango', 'hapshuta');
    invocation.withCredentials = true;
    invocation.send();
    console.log(invocation)
}


function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        document.querySelector("#ipText").innerHTML = response.ip;
    }
}