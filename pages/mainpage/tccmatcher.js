window.onload = function(){
    apresentUserName();
}


document.querySelectorAll("input[type='checkbox']").forEach(btn => {
    btn.addEventListener("click", e => {
        btn.classList.toggle("actived");
    });
});

document.querySelector(".btn-finish").addEventListener("click", e => {
    document.querySelector("#submit").click();
});



var user;

var btnSignOut = document.getElementById("btn-signOut");

// Form
var tccForm = document.getElementById("complementForm");

var divForm = document.getElementById("divForm");


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

tccForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // var areasOfInterest = document.getElementsByName("areasOfInterest");
    var areasOfInterest = document.querySelectorAll(".actived");
    var areasChecked = [];

    for (let i = 0; i < areasOfInterest.length; i++) {
        if (areasOfInterest[i].checked) {
            areasChecked.push({description: areasOfInterest[i].value});
        }
    }

    if (areasChecked.length == 0){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'error',
            title: 'Choose some area'
        });

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
        tccForm.reset();
    });
});

btnSignOut.addEventListener("click", function(){
    var confirm = window.confirm("Do you want sign Out?");

    if(confirm) {
        window.sessionStorage.removeItem("user");
        window.location.href = "../index.html";
    }
});

