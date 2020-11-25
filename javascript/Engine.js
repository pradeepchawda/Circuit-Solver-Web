var app = (function () {
    var solver_container = document.getElementById("solver");
    var btn = document.getElementById("cats");
    btn.innerHTML = "cats2";
    function hi() {
        btn.innerHTML = "cats3";
    }
    function cats() {
        console.log("got here too!");
    }
    return {
        hi: hi,
        cats: cats
    };
});
