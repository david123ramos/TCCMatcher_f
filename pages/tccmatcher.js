window.onload = function(){
    apresentUserName();
}

var user;

// Form
var complementForm = document.getElementById("complementForm");


function apresentUserName(){
    var navUserName = document.getElementById("userName");
    user = JSON.parse(window.sessionStorage.getItem("user"));
    console.log(user);
    var name = user.firstName;
    var tmp = name.split(" ");

    navUserName.innerHTML += user.firstName[0];
    navUserName.innerHTML += user.lastName[0];


    navUserName.setAttribute("title", user.firstName +" "+ user.lastName + " ("+ user.email +")");
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
    
   var obj = {
        id: user.id,
        token: user.token,
        institution: document.getElementById("institution").value,
        preferences: areasChecked
    }
//  console.log(obj)
    complementForm.reset();
    fetch("http://78b728da0bcd.ngrok.io/MatcherAPI/user", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        if(response.status == 200){
            alert("ok")
        }else {
            alert("erro.");
        }

    });
});