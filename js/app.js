function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if (display == "none") {
        document.getElementById(el).style.display = 'block';
        document.querySelector("#esconder").textContent = "Esconder";
    } else {
        document.getElementById(el).style.display = 'none';
        document.querySelector("#esconder").textContent = "Mostrar";
    }
}
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);
drawClock();

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    var i = 0;
    for (num = 12; num > -12; num--) {
        ang = num / 2 * Math.PI / 6;
        var numeros = ['24', '22', '20', '18', '16', '14', '12', '10', '08', '06', '04', '02'];
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(numeros[i], 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
        num--;
        i++;
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    //console.log(now);
    //var now = new Date("October 13, 2014 00:00:30");
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    var dif = 0.5;
    if (hour % 2 == 1) {
        var AuxMinute = minute / 2;
        if (hour == 13) {
            hour = hour - 0.5 % 12;
        } else if (hour == 15) {
            hour = hour - 1.5 % 12;
        } else if (hour == 17) {
            hour = hour - 2.5 % 12;
        } else if (hour == 19) {
            hour = hour - 3.5 % 12;
        } else if (hour == 21) {
            hour = hour - 4.5 % 12;
        } else if (hour == 23) {
            hour = hour - 5.5 % 12;
        } else if (hour == 1) {
            hour = hour + 5.5 % 12;
        } else if (hour == 3) {
            hour = hour + 4.5 % 12;
        } else if (hour == 5) {
            hour = hour + 3.5 % 12;
        } else if (hour == 7) {
            hour = hour + 2.5 % 12;
        } else if (hour == 9) {
            hour = hour + 1.5 % 12;
        } else if (hour == 11) {
            hour = hour + 0.5 % 12;
        }
    } else {
        AuxMinute = minute / 2;
        if (hour == 12) {
            hour = hour % 12;
        } else if (hour == 0) {
            hour = 6 % 12;
        } else if (hour == 2) {
            hour = hour + 5 % 12;
        } else if (hour == 4) {
            hour = hour + 4 % 12;
        } else if (hour == 6) {
            hour = hour + 3 % 12;
        } else if (hour == 8) {
            hour = hour + 2 % 12;
        } else if (hour == 10) {
            hour = hour + 1 % 12;
        } else if (hour == 14) {
            hour = hour - 1 % 12;
        } else if (hour == 16) {
            hour = hour - 2 % 12;
        } else if (hour == 18) {
            hour = hour - 3 % 12;
        } else if (hour == 20) {
            hour = hour - 4 % 12;
        } else if (hour == 22) {
            hour = hour - 5 % 12;
        }

    }

    hour = (hour * Math.PI / 6) + (AuxMinute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.45, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.73, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.85, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}