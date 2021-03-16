window.onload = function(){
    apresentUserName();
}

var user;

var btnSignOut = document.getElementById("btn-signOut");

// Form
var complementForm = document.getElementById("complementForm");

var divForm = document.getElementById("divForm");


function apresentUserName(){
    user = JSON.parse(window.sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "../index.html";
    }
    var navUserName = document.getElementById("userName");
    console.log(user);
    var name = user.firstName;
    var tmp = name.split(" ");

    navUserName.innerHTML += user.firstName[0];
    navUserName.innerHTML += user.lastName[0];


    navUserName.setAttribute("title", user.firstName +" "+ user.lastName + " ("+ user.email +")");

    if (user.institution){
        divForm.classList.add("d-none");
    }
}

complementForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var areasOfInterest = document.getElementsByName("areasOfInterest");
    var areasChecked = [];

    for (let i = 0; i < areasOfInterest.length; i++) {
        if (areasOfInterest[i].checked) {
            areasChecked.push({description: areasOfInterest[i].value});
        }
    }

    if (areasChecked.length == 0){
        alert("Choose some area.");
        return;
    }

   var obj = {
        id: user.id,
        token: user.token,
        institution: document.getElementById("institution").value,
        preferences: areasChecked
    }

    fetch("https://tccmatcher.herokuapp.com/MatcherAPI/user", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        if(response.status == 200){
            alert("Added successfully.");
            user.institution = obj.institution;
            user.preferences = obj.preferences;
            window.sessionStorage.setItem("user", JSON.stringify(user));
            divForm.classList.add("d-none");
        }else {
            alert("Error.");
        }
        complementForm.reset();
    });
});

btnSignOut.addEventListener("click", function(){
    var confirm = window.confirm("Do you want sign Out?");

    if(confirm) {
        window.sessionStorage.removeItem("user");
        window.location.href = "../index.html";
    }
});