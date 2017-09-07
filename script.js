squares_table();

function squares_table(){
    let sTable = document.querySelector(".squares_table"),
        table = sTable.querySelector("table"),
        plusRowButt = sTable.querySelector(".plus_row"),
        plusColButt = sTable.querySelector(".plus_column"),
        minusRowButt = sTable.querySelector(".minus_row"),
        minusColButt = sTable.querySelector(".minus_column"),
        border = 2;
    
    plusRowsCells(table, plusColButt, plusRowButt);
    removeCellsRows(table, minusRowButt, minusColButt, border);
    buttonsPosition(sTable, table, minusRowButt, minusColButt, border);
};

function plusRowsCells(table, plusCol, plusRow){
    plusRow.addEventListener("click", function(){
        let tr = table.insertRow();
        for(let i = 0; i < table.rows[0].cells.length; i++){
            tr.insertCell(i);
        }
    }, true);
    plusCol.addEventListener("click", function(){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].insertCell(-1);
        }
    }, true);
}

function removeCellsRows(table, minusRow, minusCol, border){
    minusRow.addEventListener("click", function(){
        table.deleteRow(-1);
        if(table.offsetHeight + minusRow.offsetHeight + border == minusRow.offsetTop) minusRow.style.top = minusRow.offsetTop - table.rows[0].cells[0].offsetHeight - border + "px";
        if(table.rows.length < 2) minusRow.style.visibility = 'hidden';
    }, true);
    minusCol.addEventListener("click", function(){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].deleteCell(-1);
        }
        if(table.offsetWidth + minusCol.offsetHeight + border == minusCol.offsetLeft) minusCol.style.left = minusCol.offsetLeft - table.rows[0].cells[0].offsetHeight - border + "px";
        if(table.rows[0].cells.length < 2) minusCol.style.visibility = 'hidden';
    }, true);
}

function buttonsPosition(sTable, table, minusRow, minusCol, border){
    sTable.addEventListener("mouseover", function(){
        let targetName = event.target.tagName;
        if(targetName == "TD" || targetName == "BUTTON"){
            clearTimeout(this.timer);
            if(table.rows.length > 1) minusRow.style.visibility = 'visible';
            if(table.rows[0].cells.length > 1) minusCol.style.visibility = 'visible';
        }
        if(targetName == "TD"){
            minusRow.style.top = event.target.offsetTop + event.target.offsetHeight + border + "px";
            minusCol.style.left = event.target.offsetLeft + event.target.offsetHeight + border + "px";
        }
    }, true);
    sTable.addEventListener("mouseout", function(){
        let targetName = event.target.tagName;
        if(targetName == "TD" || targetName == "BUTTON")
            this.timer = setTimeout(function(){
                minusRow.style.visibility = 'hidden';
                minusCol.style.visibility = 'hidden';
            }, 200);
    }, true);
};