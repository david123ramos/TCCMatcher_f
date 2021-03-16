//Form Sing in
const formSingIn = document.getElementById("formSingIn");


//Form Sing up
const formSingUp = document.getElementById("formSingUp");

//var for Change Divs
const linkchangeDivs = document.getElementById("signupLink");
var isLoginDiv = true; 
const singInDiv = document.getElementById("singinDv");
const singUpDiv = document.getElementById("singupDv");


formSingIn.addEventListener("submit", function(event) {
    event.preventDefault();

    var obj = {
        email : document.getElementById("emailsignin").value,
        password : document.getElementById("pswsignin").value
    }
    //console.log(obj)
    fetch("https://tccmatcher.herokuapp.com/MatcherAPI/signin", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        console.log(response);
        if(response.status == 200){
            var resp;
            response.json().then(r => completSingIN(r));
        }else {
            alert("Account not found.");
        }
        formSingIn.reset();

    });
});

formSingUp.addEventListener("submit", function (event) {
    event.preventDefault();
    var obj = {
        firstName : document.getElementById("Fnamesignup").value,
        lastName : document.getElementById("Lnamesignup").value,
        gender : document.getElementById("Gendersignup").value,
        email : document.getElementById("emailsignup").value,
        password : document.getElementById("pswsignup").value.hashCode()
    }
    console.log(obj);
    formSingUp.reset();

    fetch("https://tccmatcher.herokuapp.com/MatcherAPI/signup", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        console.log(response);
        console.log(" ----------------- FON ------------------\n")
        response.json().then(console.log);
        if(response.status == 200){
            alert("Account successfully created.");
            linkchangeDivs.click();
        }else {
            alert("Account not created.");
        }
    });
});


function completSingIN(user){
    window.sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "pages/tccmatcher.html";
}



linkchangeDivs.addEventListener("click", function changeDivs(){
    
    if(isLoginDiv){
        isLoginDiv = false;

        singInDiv.classList.add("d-none");
        singInDiv.classList.remove("d-block");

        singUpDiv.classList.add("d-block");
        singUpDiv.classList.remove("d-none");
        linkchangeDivs.innerHTML = "Do you allready have an account? Sign in.";
    } else {
        isLoginDiv = true;
        singUpDiv.classList.add("d-none");
        singUpDiv.classList.remove("d-block");

        singInDiv.classList.remove("d-none");
        singInDiv.classList.add("d-block");
        linkchangeDivs.innerHTML = "Doesn't have a account? Sign up.";
    }
});




//METODO PARA O HASH
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// jdbc:mysql://klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ol7ykc3l2q20shm5
// mysql://rmc1ij9324jguygi:ixe3cri31571dlv0@klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ol7ykc3l2q20shm5