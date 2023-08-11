function myFunction() {
    var x = document.getElementById("navid");
    if(x.className === "nav"){
        x.className += " click";
    } 
    else {
        x.className = "nav";
    }
}