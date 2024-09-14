var topIndex = 100

function makeDraggable(titleBar) {
    var prevx, prevy
    var window = titleBar.parentElement
    titleBar.onmousedown = startDragging
    
    function startDragging(e) {
        sendToTop(window)
        e = e || window.event
        e.preventDefault()
        prevx = e.clientX
        prevy = e.clientY
        document.onmouseup = stopDragging
        document.onmousemove = dragContinuous
    }

    function dragContinuous(e) {
        var deltax = prevx - e.clientX
        var deltay = prevy - e.clientY
        prevx = e.clientX
        prevy = e.clientY
        window.style.left = (window.offsetLeft - deltax) + "px"
        window.style.top = (window.offsetTop - deltay) + "px"
    }
}

function makeResizable(resizeZone) {
    var prevx, prevy, zoneClass
    var window = resizeZone.parentElement
    var classList = resizeZone.className.split(' ')

    if (classList.includes("top-resize")) {
        resizeZone.onmousedown = resizeTop
    } else if (classList.includes("bottom-resize")) {
        resizeZone.onmousedown = resizeBottom
    } else if (classList.includes("left-resize")) {
        resizeZone.onmousedown = resizeLeft
    } else if (classList.includes("right-resize")) {
        resizeZone.onmousedown = resizeRight
    }

    function resizeCommon(e, side) {
        sendToTop(window)
        zoneClass = side
        e = e || window.event
        e.preventDefault()
        prevx = e.clientX
        prevy = e.clientY
        document.onmouseup = stopDragging
        document.onmousemove = dragContinuous
    }

    function resizeTop(e) {resizeCommon(e, "top")}
    function resizeBottom(e) {resizeCommon(e, "bottom")}
    function resizeLeft(e) {resizeCommon(e, "left")}
    function resizeRight(e) {resizeCommon(e, "right")}

    function dragContinuous(e) {
        var deltax = prevx - e.clientX
        var deltay = prevy - e.clientY
        prevx = e.clientX
        prevy = e.clientY
        switch (zoneClass) {
            case "top":
                window.style.top = (window.offsetTop - deltay) + "px"
                window.style.height = (window.clientHeight + deltay) + "px"
                break
            case "bottom":
                window.style.height = (window.clientHeight - deltay) + "px"
                break
            case "left":
                window.style.left = (window.offsetLeft - deltax) + "px"
                window.style.width = (window.clientWidth + deltax) + "px"
                break
            case "right":
                window.style.width = (window.clientWidth - deltax) + "px"
                break
        }

    }
}

function stopDragging() {
    document.onmouseup = null
    document.onmousemove = null
}

function sendToTop(window) {
    window.style.zIndex = topIndex
    topIndex = topIndex + 1
}

function forEachElementClass(cls, func) {
    Array.from(document.getElementsByClassName(cls))
        .forEach((el) => {func(el)})
}

function createDivWithClasses(clsList) {
    var div = document.createElement("div")
    div.classList = clsList
    return div
}

function setPosition(window) {
    var cw = document.documentElement.clientWidth
    var ch = document.documentElement.clientHeight
    var ww = window.clientWidth
    var wh = window.clientHeight
    console.log(cw, ch, ww, wh)
    var x = 0, y = 0
    try {
        x = Math.random() * (cw - ww)
        y = Math.random() * (ch - wh)
    } finally {
        console.log(x, y)
        window.style.left = Math.floor(x) + "px"
        window.style.top = Math.floor(y) + "px"
    }
}

window.onload = function() {
    forEachElementClass("window", (window) => {
        setPosition(window)
        window.onclick = function() {
            sendToTop(window)
        }
    })
    forEachElementClass("resizable-window", (window) => {
        window.appendChild(createDivWithClasses("resize-zone top-resize"))
        window.appendChild(createDivWithClasses("resize-zone bottom-resize"))
        window.appendChild(createDivWithClasses("resize-zone left-resize"))
        window.appendChild(createDivWithClasses("resize-zone right-resize"))
    })
    forEachElementClass("title-bar", (titleBar) => {
        makeDraggable(titleBar)
    })
    forEachElementClass("resize-zone", (resizeZone) => {
        makeResizable(resizeZone)
    })
}
