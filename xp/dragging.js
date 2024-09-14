var topIndex = 100;

function makeDraggable(element) {
    console.log("make draggable")
    var startx, starty, currx, curry
    const titleBar = element.children[0]
    titleBar.onmousedown = startDragging
    
    function startDragging(e) {
        element.style.zIndex = topIndex;
        topIndex = topIndex + 1;
        console.log("Start")
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



window.onload = function() {
    console.log("loaded")
    Array.from(document.getElementsByClassName("window")).forEach((element) => {
        console.log("lol")
        makeDraggable(element)
    })
}
