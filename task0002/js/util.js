/**
 * Created by arashi on 15/4/21.
 */



/**
 * 3.实现多种selector
 * */
function getele(selector) {
    if (!selector){return null;}
    if (selector == document){ return document;}
    selector = selector.trim();
    var checker = selector[0];
    var result = [];
    var content = selector.slice(1);
    switch (checker){
        case "#": result.push(document.getElementById(content));
            break;
        case ".":
            var all = document.getElementsByTagName("*");
            for(var j in all){
                var name = all[j].className;
                if(name) {
                    var namecur = name.split(" ");
                    for (var k =0;k<namecur.length;k++){
                        if(namecur[k]==content){
                           result.push(all[j]);
                       }
                   }
                }
            }
            break;
        case "[":
            var all = document.getElementsByTagName("*");
            if (content.indexOf("=")==-1){//只有属性，无值
                for (var j in all){
                    if (all[j].getAttribute(content.slice(0.-1))){
                        result.push(all[j]);
                    }
                }
            }
            else{
                for(var j in all){
                    var tempPro = content.split("=");
                    var kkey = tempPro[0];//获取键的name
                    var kvalue = tempPro[1].slice(0,-1);//获取键对应的值
                    if(all[j].getAttribute(kkey)==kvalue) {
                        result.push(all[j]);
                    }
                }
            }
            break;
        default:
            result=document.getElementsByTagName(selector);
            break;

    }
    return result[0];
}

function getContent(checker){
    var check =checker;
}

//判断arr是否为一个数组，返回一个bool值
function isArray(arr){
    return (arr instanceof Array);
}
function isFunction(fn){
    return ( typeof(fn)== "function");
}

function cloneObject(str){
        var o;
        if (typeof str == "object") {
            if (str === null) {
                o = null;
            }
            else {
                if (str instanceof Array) {
                    o = [];
                    for (var i = 0, len = str.length; i < len; i++) {
                        o.push(cloneObject(str[i]));
                    }
                } else {
                    o = {};
                    for (var j in str) {
                        o[j] = cloneObject(str[j]);
                    }
                }
            }
        }
        else {
            o = str;
        }
        return o;
}
function uniqArray(arr){
    //键值互换会排序
    var result=new Array();
    for(var j in arr){
        result[arr[j]]=1;
    }
    var temp=new Array();
    for(var k in result){
        temp.push(k);
    }
    //for (var i=0;i<arr.length;i++){
    //    if(result.indexOf(arr[i])==-1){
    //        result.push(arr[i]);
    //    }
    //}
    return temp;
}
function simpleTrim(str){
    var result=new Array();
    result=str;
    for(var i=0;i<str.length;i++)
    {
        if (str.charAt(i)!=' '&&str.charAt(i)!='\t'){
            result=str.slice(i);
            break;
        }
    }
    var end=result.length-1;
    while(result.charAt(end)==' '||result.charAt(end)=='\t'){
        result=result.slice(0,end);
        end--;
    }
    return result;
}

function trim(str){

    str.replace(/(^\s*)|(\s*$)/g,"");
}
/**
* 数组相关使用方法实现
* */

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn){
    for (var i in arr){
        fn(arr[i],i);
    }
}

//function showMess(value){
//    console.log(value);
//}
function showMess(value,i){
    console.log(i+":"+value);
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for (var i in obj){
        if (obj.hasOwnProperty(i)){
            count++;
        }
    }
    return count;
}


function isEmail(emailStr){
    var testresult;
    testresult=/^[a-zA-Z0-9]+[\w.-]*@(\w+.){1,63}[a-zA-Z0-9]+$/.test(emailStr);
    return testresult;
}
function isMobilePhone(phone) {
    var result;
    result=/^1[3|5|8]\d{5,9}$/.test(phone);
    return result;
}

/**
 * 3.DOM相关代码
 * */


function addClass(element, newClassName) {

    var classes = element.className.split(" ");//element.className返回的是
    classes.push(newClassName);
    element.className= classes.join(" ");

}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var eleclass = element.className;
    var testformula=/\\s|^oldClassName\\s|$/;
    if(testformula.test(eleclass))
    {
        var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
        element.className = element.className.replace(reg,' ');
        element.className = element.className.trim();
    }

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {

    var pa1 = document.getElementById(element).parentNode.className;
    var pa2 = document.getElementById(siblingNode).parentNode.className;
    if(pa1==pa2){return true}
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {

    var top,left;
    var position=new cloneObject();
    if(element.currentStyle){//for ie
        top = element.currentStyle.left;
        left = element.currentStyle.top;
    }
    else if(window.getComputedStyle){//for other explorer
        left = window.getComputedStyle(element,null).left;
        top = window.getComputedStyle(element,null).top;}
    position.y=top;
    position.x=left;
    return position;
}




function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event, listener, false);
    }
    else if(element.attachEvent){
        element.attachEvent(event, listener);
    }
    else{
        element["on"+event] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
        element.removeEventListener(event, listener, false);
    }
    else if(element.detachEvent){
        element.detachEvent(event, listener);
    }
    else{
        element["on"+event] = null;
    }
}

//对于enter键的绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    });
}
// / your implement

function isIE(){
    var s = navigator.appName;
    if(s=="IE"||s=="ie"){
        return navigator.appVersion;
    }
    return -1;

}
function setCookie(cookieName, cookieValue, exipireDays){

}
function getCookie(cookieName){

}