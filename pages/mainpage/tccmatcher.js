window.onload = function(){
    apresentUserName();
    //getTCCs();
}

document.querySelectorAll("input[type='checkbox']").forEach(btn => {
    btn.addEventListener("click", e => {
        btn.classList.toggle("actived");
    });
});

document.querySelector(".btn-finish").addEventListener("click", e => {
    document.querySelector("#submit").click();
});

const url = "http://14efccae11ab.ngrok.io/MatcherAPI";

var user;

//Btns
var btnSignOut = document.getElementById("btn-signOut");
var btnRegisterTcc = document.getElementById("btnRegisterTcc");
var btnListTcc = document.getElementById("btnListTcc");
var btnListInterece = document.getElementById("btnListInterece");

// Forms
var complementForm = document.getElementById("complementForm");
var tccForm = document.getElementById("tccForm");


//DIVS
var divcomplementForm = document.getElementById("divcomplementForm");
var divTccForm = document.getElementById("divtccForm");
var divTccList = document.getElementById("divTccList");
var divListInterece = document.getElementById('divListInterece');


function apresentUserName(){
    user = JSON.parse(window.sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../index.html";
    }
    var navUserName = document.getElementById("userName");
    console.log(user);

    navUserName.innerHTML += user.firstName[0];
    navUserName.innerHTML += user.lastName[0];

    navUserName.setAttribute("title", user.firstName +" "+ user.lastName + " ("+ user.email +")");

    if (user.institution){
        setNone(divcomplementForm);
    }
}

complementForm.addEventListener("submit", function(event) {
    event.preventDefault();

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
            preferenceList: areasChecked
        }

    console.log(obj);

    fetch(url+"/user", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        if(response.status == 200){
            alert("Added successfully.");
            user.institution = obj.institution;
            user.preferences = obj.preferences;
            window.sessionStorage.setItem("user", JSON.stringify(user));
            divcomplementForm.classList.add("d-none");
        }else {
            alert("Error.");
        }
        complementForm.reset();
    });
});


tccForm.addEventListener("submit", function (event){
    event.preventDefault();
    var areasOfInterest = document.querySelectorAll(".actived");
    var areasChecked = [];

    for (let i = 0; i < areasOfInterest.length; i++) {
        if (areasOfInterest[i].checked) {
            areasChecked.push({title: areasOfInterest[i].value});
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
        title: document.getElementById("title").value,
        description: document.getElementById("abstract").value,
        keywords: areasChecked,
        id: 'user.id'
    }

    console.log(obj);

    fetch(url+"/tcc", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        if(response.status == 200){
            alert("Added successfully.");
            btnListTcc.click();
            //getTCCs();
        }else {
            alert("Error.");
        }
        tccForm.reset();
    });

});

function getTCCs (){
    fetch(url+"/tcc", {
        method: "GET",
    }).then(function(response){
        if(response.status == 200){
            response.json().then(r => listTCCs(r));
        }else {
            alert("Error ao resgatar TCCs");
        }
        tccForm.reset();
    });
}

function listTCCs (tccs){
    var tccListdiv = document.getElementById("mytccListMain");
    tccListdiv.innerHTML = "";
    // <div class="col-12 mt-1 mb-1 py-2 border">
    //     <div class="center">
    //         <h1>Title</h1>
    //     </div>
    //     <h3>Description</h3>
    //     <div class="center">
    //         <ul class="kw-list">
    //             <li>
    //                 <label class="keywords">Machine Laerning</label>
    //             </li>
    //         </ul>
    //     </div>
    // </div> 
    for (const iterator of tccs) {
        var col = document.createElement("div");
        col.classList.add("col-12 mt-1 mb-1 py-2 border");
        var divcenter1 = document.createElement("div");
        divcenter1.classList.add("center");
        var h1 = document.createElement("h1");
        h1.innerHTML = iterator.title;
        
        divcenter1.appendChild(h1);
        col.appendChild(divcenter1);

        var h3 = document.createElement("h3");
        h3.innerHTML = iterator.description;
        col.appendChild(h3);
        
        var divcenter2 = document.createElement("div");
        divcenter2.classList.add("center");
        var ul = document.createElement("ul");
        ul.classList.add("kw-list");
        
        for (const i of iterator.keywords) {
            var li = document.createElement("li");
            var label = document.createElement("label");
            label.classList.add("keywords");
            label.innerHTML = i.title;

            li.appendChild(label);
            ul.appendChild(li);
        }

        divcenter2.appendChild(ul);
        col.appendChild(divcenter2);
        tccListdiv.appendChild(col);
    } 

}

btnSignOut.addEventListener ("click", function(){
    var confirm = window.confirm("Do you want sign Out?");

    if(confirm) {
        window.sessionStorage.removeItem("user");
        window.location.href = "../../index.html";
    }
});

btnListInterece.addEventListener("click", function (){
    setBlock(divListInterece);
    setNone(divTccForm);
    setNone(divTccList);
});

btnListTcc.addEventListener("click", function (){
    setBlock(divTccList);
    setNone(divTccForm);
    setNone(divListInterece);
});

btnRegisterTcc.addEventListener("click", function (){
    setBlock(divTccForm);
    setNone(divListInterece);
    setNone(divTccList);
});

function setNone(element){
    element.classList.remove("d-block");
    element.classList.add("d-none");
}

function setBlock (element){
    element.classList.remove("d-none");
    element.classList.add("d-block");
}