window.onload = function(){
    apresentUserName();
    getTCCs();

    
    //Btns
    btnSignOut = document.getElementById("btn-signOut");
    btnRegisterTcc = document.getElementById("btnRegisterTcc");
    btnListTcc = document.getElementById("btnListTcc");
    btnListInterece = document.getElementById("btnListInterece");

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

        document.querySelectorAll(".ks-cboxtagscadtcc input[type='checkbox']").forEach(btn => {
            btn.addEventListener("click", e => {
                btn.classList.toggle("actived");
            });
        });
    
    });

    // Forms
    tccForm = document.getElementById("tccForm");


    //DIVS
    divcomplementForm = document.getElementById("divcomplementForm");
    divTccForm = document.getElementById("divtccForm");
    divTccList = document.getElementById("divTccList");
    divListInterece = document.getElementById('divListInterece');
}

const url = "http://localhost:8080/MatcherAPI";

var user;



function apresentUserName() { 

    user = JSON.parse(window.sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../index.html";
    }
    var navUserName = document.getElementById("userName");
    console.log(user);
    var name = user.firstName;

    navUserName.innerHTML += user.firstName[0];
    navUserName.innerHTML += user.lastName[0];


    navUserName.setAttribute("title", user.firstName +" "+ user.lastName + " ("+ user.email +")");

    if (user.institution == null || user.institution == undefined){
        Swal.fire({ 
            html: divcomplementForm.innerHTML,
            showConfirmButton: false, 
            allowOutsideClick: false,
        
        });

        document.querySelectorAll(".ks-cboxtags input[type='checkbox']").forEach(btn => {
            btn.addEventListener("click", e => {
                btn.classList.toggle("actived");
            });
        });
        
        document.querySelector(".btn-finish").addEventListener("click", e => {
            document.querySelector("#submit").click();
        });
        bindComplementForm();
    }
}


/**
 * Responsável por cadastrar as informações auxiliares no primeiro login
 */
function bindComplementForm() {
    const complementForm = document.getElementById("complementForm");
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
                swal.close();
            }else {
                alert("Error.");
            }
            complementForm.reset();
        });
    });
}


tccForm.addEventListener("submit", function (event) {


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
        id_user: user.id
    }

    console.log(obj);

    fetch(url+"/tcc", {
        body: JSON.stringify(obj),
        method: "POST",
    }).then(function(response){
        if(response.status == 200){
            alert("Added successfully.");
            btnListTcc.click();
            getTCCs();
        }else {
            alert("Error.");
        }
        tccForm.reset();
    });

});

function getTCCs (){
    userid = user.id;
    fetch(url+`/tcc?userid=${userid}`, {
        method: "GET",
    }).then(function(response){
        if(response.status == 200){
            response.json().then(listTCCs);
        }else {
            alert("Error ao resgatar TCCs");
        }
        tccForm.reset();
    });
}

function listTCCs (tccs){
    const tccListdiv = document.getElementById("mytccListMain");


    if(tccs.length > 0) {
        mountTccList(tccs, tccListdiv);  
    }else { 
        tccListdiv.innerHTML = `<h2>You doesn't have any TCC 😓</h2>`;
    }


}

function mountTccList(tccs, tccListdiv) {
    tccListdiv.innerHTML = "";

    for (const iterator of tccs) {
        var col = document.createElement("div");
        col.setAttribute("class", "col-12 mt-1 mb-1 py-2 border");
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



function setNone(element){
    element.classList.remove("d-block");
    element.classList.add("d-none");
}

function setBlock (element){
    element.classList.remove("d-none");
    element.classList.add("d-block");
}