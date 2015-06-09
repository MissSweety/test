function drag(elementToDrag,event){
    var startX=event.clientX, startY=event.clientY;
    var origX=elementToDrag.offsetLeft, origY=elementToDrag.offsetTop;
    var deltaX=startX-origX, deltaY=startY-origY;
    if(document.addEventListener){
        elementToDrag.addEventListener("mousemove",moveHandler,true);
        elementToDrag.addEventListener("mouseup",upHandler,true);
    }
    else if(document.attachEvent){
        elementToDrag.setCapture(); //setCapture to capture the element
        elementToDrag.attachEvent("onmousemove",moveHandler);
        elementToDrag.attachEvent("onmouseup",upHandler);
        elementToDrag.attachEvent("onlosecapture",upHandler);

    }
    else{ //IE4 Event Model
        var oldmovehandler=document.onmousemove;
        var olduphandler=document.onmouseup;
        document.onmousemove=moveHandler;
        document.onmouseup=upHandler;
    }
    if(event.stopPropagation){
        event.stopPropagation();
    }
    else{
        event.cancelBubble=true;
    }

    if(event.preventDefault){
        event.preventDefault();
    }
    else{
        event.returnValue=false;
    }
    //This is the handler that captures mousemove events when an element
    //is being dragging.It is responsible for moving the element
    function moveHandler(e){
        if(!e) e=window.event;
        elementToDrag.style.left=(e.clientX-deltaX)+"px";
        elementToDrag.style.top=(e.clientY-deltaY)+"px";

        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble=true;
    }
    function upHandler(e){
        if(!e)e=window.event;
        if(document.removeEventListener){
            document.removeEventListener("mouseup",upHandler,true);
            document.removeEventListener("mousemove",moveHandler,true);
        }
        else{
            elementToDrag.detachEvent("onlosecapture",upHandler);
            elementToDrag.detachEvent("onmouseup",upHandler);
            elementToDrag.detachEvent("onmousemove",moveHandler);
            elementToDrag.releaseCapture();
        }
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble=true;
    }
}/**
 * Created by arashi on 15/5/13.
 */
