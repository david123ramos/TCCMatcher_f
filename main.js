//Form Sing in
const formSingUp = document.getElementById("formSingIn");


//Form Sing up
const formSingIn = document.getElementById("formSingUp");

//var for Change Divs
const linkchangeDivs = document.getElementById("signupLink");
var isLogin = true; 
const singInDiv = document.getElementById("singinDv");
const singUpDiv = document.getElementById("singupDv");


formSingUp.addEventListener("submit", function(event) {
    event.preventDefault();

    var obj = {
        user : document.getElementById("pswsgi").value,
        psw : document.getElementById("usersgi").value
    }

    fetch("http://localhost:8080/MatcherAPI/MatcherAPI", {
        body: JSON.stringify(obj),
        method: "POST",
        headers: {"Content-Type": "aplication/json"},
        mode: 'cors'
    }).then(function(response){
        formSingUp.reset();
        console.log(response);
        response.json().then(console.log);        
    });

});

linkchangeDivs.addEventListener("click", function changeDivs(){
    
    if(isLogin){
        isLogin = false;
        linkchangeDivs.innerHTML = "Do you allready have an account? Sign in.";
    } else {
        isLogin = true;
        linkchangeDivs.innerHTML = "Doesn't have a account? Sign up.";
    }
});

