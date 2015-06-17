/**
 * Created by arashi on 15/6/11.
 */
    //调用canvas元素的getContext
    function drawcurve() {
    var ele = document.getElementById("canvas");
    var context = ele.getContext('2d');
    var lastX = context.canvas.width * Math.random();
    var lastY = context.canvas.height * Math.random();
    var hue = 0;
// draw line
    function line() {
        context.save();
        // 将原点从canvas的左上角移动到中心
        context.translate(context.canvas.width / 2, context.canvas.height / 2);
        //缩放当前绘图
        context.scale(0.9, 0.9);
        context.translate(-context.canvas.width / 2, -context.canvas.height / 2);
        context.beginPath();
        //设置当前线条宽度
        context.lineWidth = 8 + Math.random() * 15;
        //将画笔笔触移动到原点左边
        context.moveTo(lastX, lastY);
        lastX = context.canvas.width * Math.random();
        lastY = context.canvas.height * Math.random();

        context.bezierCurveTo(
            context.canvas.width * Math.random(), context.canvas.height * Math.random(),
            context.canvas.width * Math.random(), context.canvas.height * Math.random(),
            lastX, lastY);
        hue = hue + 10 * Math.random();
        context.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
        context.shadowBlur = 18;
        context.shadowColor = "white";
        context.stroke();
        context.restore();
    }

    //end draw line

    setInterval(line, 100);
    function background() {
        context.fillStyle = "rgba(0,0,0,.2)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    setInterval(background, 40);
}

function drawHappyFace(){
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //draw red happy face with shadow
        ctx.strokeStyle = "rgb(200,0,0)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgb(200,0,0)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.fillStyle = 'rgb(245,0,0)';
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(200, 75);
        ctx.lineWidth = 1;
        ctx.arc(200, 75, 35, 0, Math.PI * 2, false);   // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.fillStyle = 'rgb(0,230,22)';
        ctx.fill();

        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.closePath();
        ctx.stroke();
        //write blue font with shadow
        ctx.shadowBlur = 12;
        ctx.shadowColor = "blue";
        ctx.font = '40pt Calibri';
        ctx.fillStyle = 'blue';
        ctx.fillText('happy face', 150, 100);

        ctx.moveTo(200, 200);
        ctx.lineTo(250, 200);
        ctx.lineTo(225, 250);
        ctx.closePath();
        ctx.stroke();
    }
}

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        //随机生成白色小雪花
        ctx.fillStyle = "rgb(5,10,55)";
        ctx.fillRect(0,0,390,480);
        ctx.shadowBlur=10;
        ctx.shadowColor = "white";
        ctx.fillStyle = "white";
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                ctx.beginPath();
                var x = 25 + 300*Math.random();
                var y = 25 + i*400*Math.random();
                var radius = Math.random()*3+1;
                var startA = 0;
                var endA = 2*Math.PI;
                var anticlockwise = false;
                ctx.arc(x,y,radius,startA,endA,anticlockwise);
                ctx.fill();
            }
        }
    }
}

//test save and restore
function testSave(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.translate(50, 50);
    context.save();              //坐标原点移到画布中心，并保存这个状态
    context.rotate(Math.PI/2);    //旋转90度
    context.beginPath();
    context.strokeStyle = 'red';
    context.moveTo(0, -50);
    context.lineTo(-50, 0);
    context.moveTo(0, -50);
    context.lineTo(50, 0);
    context.moveTo(0, -50);
    context.lineTo(0, 50);
    context.closePath();          //画一个向右的箭头

    context.stroke();
    context.restore();
    context.shadowBlur=10;
    context.shadowColor = "red";
    context.fillStyle = "red";
    context.fillRect(40, 40, 10, 10);  //画一点，restore后点在右下角，没有restore刚点在左下角，如图

}

//test different composition operation组合方式
function drawAct(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var state = new Array("source-over",
        "destination-over",
        "source-in",
        "destination-in",
        "source-out",
        "destination-out",
        "source-atop",
        "destination-atop",
        "lighter",
        "xor",
        "copy");
    var i=0;
    var interal = setInterval(function(){
        context.fillStyle="red";
        context.fillRect(50,50,100,100);
        context.globalCompositeOperation =state[i];
        context.beginPath();
        context.fillStyle="blue";
        context.arc(140,140,60,0, 2*Math.PI);
        context.fill();
        console.log(state[i]);
        if(i==10){i=0;}
        else{i++;}
    },1000);
}

function draw20(id) {
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");

    var interal = setInterval(function () {
        move(context);
    }, 1);
}

var x = 100;//矩形开始坐标
var y = 100;//矩形结束坐标
var mx = 0;//0右1左
var my = 0; //0下1上
var ml = 1;//每次移动长度
var w = 20;//矩形宽度
var h = 20;//矩形高度
var cw = 400;//canvas宽度
var ch = 300; //canvas高度


function move(context) {
    context.clearRect(0, 0, 400, 300);
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    context.fillStyle = "red";
    context.fillRect(x, y, w, h);
    if (mx == 0) {
        x = x + ml;
        if (x >= cw-w) {
            mx = 1;
        }
    }
    else {
        x = x - ml;
        if (x <= 0) {
            mx = 0;
        }
    }
    if (my == 0) {
        y = y + ml;
        if (y >= ch-h) {
            my = 1;
        }
    }
    else {
        y = y - ml;
        if (y <= 0) {
            my = 0;
        }
    }

}