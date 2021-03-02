window.onload(function(){
    var us = document.getElementById("user");
    us.innerHTML = JSON.parse(window.sessionStorage.getItem("user")).firstName + " !";
});