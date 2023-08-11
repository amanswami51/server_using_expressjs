var a = document.getElementById('p1').style.display = "none";
function fun(){
    if(a == "none"){
        a = document.getElementById('p1').style.display = "block";
    }
    else{
        a = document.getElementById('p1').style.display = "none";

    }
    // document.getElementById('IdName').innerHTML = "This is function call";
}