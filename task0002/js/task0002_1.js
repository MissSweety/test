/**
 * Created by arashi on 15/5/7.
 */

var btn = document.getElementById("btn");
btn.addEventListener("click",showresult,false);
var content=document.getElementById("hobby");
content.addEventListener("focus",resetf,false);
var hintf=document.getElementById("alertf");
function resetf(){
    hintf.innerHTML="";
}
function showresult(){

    var text=content.value;
    if(text==""){
        //hintf.style.color='red';
        hintf.className=" alert";
        hintf.innerHTML="您没有输入任何内容"
        return null;
    }
    else {
        console.log(text);
        var hobbies = text.split(/,|\s|;|、/);
        if (hobbies.length < 10) {
            var result = uniqArray(hobbies);
            // console.log(result+"ooo");
            var message = "";
            for (var i in result) {
                message = message + "<input type='checkbox' checked=\"checked\"value=\""+result[i]+"\">"+result[i]+ '&nbsp;&nbsp;';
            }
            document.getElementById("result").innerHTML = message;
        }
        else {
            hintf.className = "alert";
            hintf.innerHTML = "您输入爱好过多，最多10个"
            return null;
        }
    }
}
