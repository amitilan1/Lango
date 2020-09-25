// Things are happening
console.log("Page action chrome extension is running!");

let inputs = document.getElementsByTagName("input");
var values = ['#f3d021', '#a00202', '#0d447f'];
var elm;
// int elm_val;elm_name;
for (elm of inputs){
    console.log(elm.name);
    elm_name = elm.name;
    elm_val = elm.value;
    elm.addEventListener("focusin", function () {
         console.log("value:"+elm_val);
         document.getElementsByName(elm_name)[0].style.backgroundColor = "yellow";
     });
}

