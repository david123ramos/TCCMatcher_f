//Form Sing in
const formSingIn = document.getElementById("formSingIn");


//Form Sing up
const formSingUp = document.getElementById("formSingUp");

//var for Change Divs
const linkchangeDivs = document.getElementById("signupLink");
var isLogin = true; 
const singInDiv = document.getElementById("singinDv");
const singUpDiv = document.getElementById("singupDv");


formSingIn.addEventListener("submit", function(event) {
    event.preventDefault();

    var obj = {
        email : document.getElementById("emailsignin").value,
        psw : document.getElementById("pswsignin").value
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


formSingUp.addEventListener("submit", function (event) {
    event.preventDefault();

    var obj = {
        firstname : document.getElementById("Fnamesignup").value,
        lastname : document.getElementById("Lnamesignup").value,
        gender : document.getElementById("Gendersignup").value,
        email : document.getElementById("emailsignup").value,
        password : document.getElementById("pswsignup").value
    }

    console.log(obj)

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

        singInDiv.classList.add("d-none");
        singInDiv.classList.remove("d-block");

        singUpDiv.classList.add("d-block");
        singUpDiv.classList.remove("d-none");
        linkchangeDivs.innerHTML = "Do you allready have an account? Sign in.";
    } else {
        isLogin = true;
        singUpDiv.classList.add("d-none");
        singUpDiv.classList.remove("d-block");

        singInDiv.classList.remove("d-none");
        singInDiv.classList.add("d-block");
        linkchangeDivs.innerHTML = "Doesn't have a account? Sign up.";
    }
});

// jdbc:mysql://klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ol7ykc3l2q20shm5
// mysql://rmc1ij9324jguygi:ixe3cri31571dlv0@klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ol7ykc3l2q20shm5