'use strict';
let sTable = document.querySelector('.squares_table'),
    table = sTable.querySelector('table'),
    plusRowButt = sTable.querySelector(".plus_row"),
    plusColButt = sTable.querySelector(".plus_column"),
    minusRowButt = sTable.querySelector(".minus_row"),
    minusColButt = sTable.querySelector(".minus_column"),
    border = 2;

sTable.addEventListener("mouseover", function(){
    clearTimeout(this.fadeOutTimer);
    if(event.target.tagName == "TD" || event.target.tagName == "BUTTON"){
        if(event.target.tagName == "TD"){
            //change minus buttons position compared to selected cell and row
            minusRowButt.style.top = event.target.offsetTop + event.target.offsetHeight + border + "px";
            minusColButt.style.left = event.target.offsetLeft + event.target.offsetHeight + border + "px";
        }
        if(table.rows.length > 1) minusRowButt.style.visibility = "visible";
        if(table.rows[0].cells.length > 1) minusColButt.style.visibility = "visible";
    }
}, true);
sTable.addEventListener("mouseout", function(){
    if(event.target.tagName == "TD" || event.target.tagName == "BUTTON"){
        //hide minus buttons after 200ms if cursor is out from the table or buttons
        this.fadeOutTimer = setInterval(function(){
            minusColButt.style.visibility = "hidden";
            minusRowButt.style.visibility = "hidden";
        }, 200);
    }
}, true);
sTable.addEventListener("click", function(){
    if(event.target.className == minusRowButt.className){
        table.deleteRow(-1);
        //move button to the previous row if the last one is selected
        if(table.offsetHeight + minusRowButt.offsetHeight + border == minusRowButt.offsetTop) minusRowButt.style.top = minusRowButt.offsetTop - table.rows[0].cells[0].offsetHeight - border + "px";
        if(table.rows.length < 2) minusRowButt.style.visibility = "hidden";
    }else if(event.target.className == minusColButt.className){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].deleteCell(-1);
        }
        if(table.offsetWidth + minusColButt.offsetHeight + border == minusColButt.offsetLeft) minusColButt.style.left = minusColButt.offsetLeft - table.rows[0].cells[0].offsetHeight - border + "px";
        if(table.rows[0].cells.length < 2) minusColButt.style.visibility = "hidden";
    }else if(event.target.className == plusColButt.className){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].insertCell(-1);
        }
    }else if(event.target.className == plusRowButt.className){
        let tr = table.insertRow(-1);
        for(let i = 0; i < table.rows[0].cells.length; i++){
            tr.insertCell(i);
        }
    }
}, true);