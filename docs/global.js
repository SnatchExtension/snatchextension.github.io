var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
var i = 0;
var toggle = false;



function changeColor() {
    if (toggle) {
        var rainbow = document.getElementsByClassName("rainbow");
        for (var j = 0; j < rainbow.length; j++) {
            rainbow[j].style.color = colors[i];
        }
        i++;
        if (i == colors.length) {
            i = 0;
        }
    }

}

setInterval(changeColor, 200);

