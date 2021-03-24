window.onload = function(){
    //apresentUserName();
}

var user;

var btnSignOut = document.getElementById("btn-signOut");

// Form
var tccForm = document.getElementById("tccForm");

var divForm = document.getElementById("divtccForm");
var divList = document.getElementById("divList");

var btnListRegister = document.getElementById("btn-list-register");

var isRegisterDiv = true; 

function apresentUserName(){
    user = JSON.parse(window.sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "../index.html";
    }
    var navUserName = document.getElementById("userName");
    console.log(user);
    var name = user.firstName;
    navUserName.innerHTML += user.firstName[0];
    navUserName.innerHTML += user.lastName[0];


    navUserName.setAttribute("title", user.firstName +" "+ user.lastName + " ("+ user.email +")");

    if (user.institution){
        divForm.classList.add("d-none");
    }
}

tccForm.addEventListener("submit", function(event){
    event.preventDefault();

    var obj = {
        title : document.getElementById("title").value,
        keyWords : document.getElementById("keywords").value.split(",").map(function(s) { return s.trim() }),
        abstract: document.getElementById("abstract").value
    }
    console.log(obj)
    // fetch("https://tccmatcher.herokuapp.com/MatcherAPI/signin", {
    //     body: JSON.stringify(obj),
    //     method: "POST",
    // }).then(function(response){
    //     console.log(response);
    //     if(response.status == 200){
    //         var resp;
    //         response.json().then(r => completSingIN(r));
    //     }else {
    //         alert("Account not found.");
    //     }
        tccForm.reset();
        btnListRegister.click();

    //});
});


btnSignOut.addEventListener("click", function(){
    var confirm = window.confirm("Do you want sign Out?");

    if(confirm) {
        window.sessionStorage.removeItem("user");
        window.location.href = "../index.html";
    }
});

btnListRegister.addEventListener("click", function changeDivs(){
    
    if(isRegisterDiv){
        isRegisterDiv = false;

        divForm.classList.add("d-none");
        divForm.classList.remove("d-block");

        divList.classList.add("d-block");
        divList.classList.remove("d-none");
        btnListRegister.innerHTML = "Register TCC";
    } else {
        isRegisterDiv = true;
        divList.classList.add("d-none");
        divList.classList.remove("d-block");

        divForm.classList.remove("d-none");
        divForm.classList.add("d-block");
        btnListRegister.innerHTML = "List TCCs";
    }
});