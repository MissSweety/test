/**
 * Created by arashi on 15/6/11.
 *
 */

function picAdapter(minsize) {
    //minsize represents the minimal size of the image. when real size of
    //image is smaller than it, it won't be resize.

    var imglist = document.getElementsByTagName("img");
    var _width, _height;
    redraw();//调用自适应方法
    window.onresize = redraw;//当窗口大小改变时也调用自适应方法

    function redraw() {
        _width = document.body.clientWidth;
        _height = document.body.clientHeight;
        var len = imglist.length;
        for (var i = 0; i < len; i++) {
            drawImage(imglist[i], _width, _height,minsize);
        }
    }

    function drawImage(img, _width, _height,minsize) {
        var image = new Image();
        image.src = img.src;
        image.onload = function () {
            if (image.width > minsize && image.height > minsize) {

                if (image.width / image.height >= _width / _height) {
                    if (image.width > _width) {
                        img.width = _width;
                        img.height = (image.height * _width) / image.width;
                    } else {
                        img.width = image.width;
                        img.height = image.height;
                    }
                } else {
                    if (image.height > _height) {
                        img.height = _height;
                        img.width = (image.width * _height) / image.height;
                    } else {
                        img.width = image.width;
                        img.height = image.height;
                    }
                }
            }
        }

    }

}
