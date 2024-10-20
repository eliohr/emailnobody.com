// Copyright (c) 2019 Daybrush
// licensed under MIT License in LICENSE.txt; modified for this project

var z = 0;
export function dragElement(elmnt, header=null, istop=false) {
    var pos1 = 0
      , pos2 = 0
      , pos3 = 0
      , pos4 = 0;
    if (header === null) {
        elmnt.onmousedown = dragMouseDown;
    } else {
        header.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.tagName === "A" || e.target.tagName === "INPUT" || (e.target.className.baseVal || e.target.className).search("close-button") >= 0)
            return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        if (istop)
            elmnt.style.zIndex = ++z;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}