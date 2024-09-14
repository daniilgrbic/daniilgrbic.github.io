var topIndex = 100;

function makeDraggable(element) {
    var startx, starty, currx, curry
    const titleBar = element.children[0]
    titleBar.onmousedown = startDragging
    
    function startDragging(e) {
        sendToTop(element)
        e = e || element.event;
        e.preventDefault();
        startx = e.clientX;
        starty = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragContinuous;
    }

    function dragContinuous(e) {
        x = startx - e.clientX;
        y = starty - e.clientY;
        startx = e.clientX;
        starty = e.clientY;
        element.style.left = (element.offsetLeft - x) + "px"
        element.style.top = (element.offsetTop - y) + "px"
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function sendToTop(element) {
    element.style.zIndex = topIndex;
    topIndex = topIndex + 1;
}

window.onload = function() {
    Array.from(document.getElementsByClassName("window")).forEach((element) => {
        makeDraggable(element)
        element.onclick = function() {
            sendToTop(element)
        }
    })
}
