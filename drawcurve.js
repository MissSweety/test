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

    setInterval(line, 100);
    function background() {
        context.fillStyle = "rgba(0,0,0,.2)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    setInterval(background, 40);
}