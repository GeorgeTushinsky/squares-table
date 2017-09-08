document.querySelectorAll(".squares_table").forEach(function(el){
    //table elements initiating
    let sTable = el,
        table = el.querySelector("table"),
        plusRowButt = sTable.querySelector(".plus_row"),
        plusColButt = sTable.querySelector(".plus_column"),
        minusRowButt = sTable.querySelector(".minus_row"),
        minusColButt = sTable.querySelector(".minus_column"),
        border = 2;

    //buttons appearance handling
    sTable.addEventListener("mouseover", function(){
        let targetName = event.target.tagName;
        if(targetName == "TD" || targetName == "BUTTON"){
            clearTimeout(this.timer);
            //change minus buttons position compared to selected cell and row
            if(targetName == "TD"){
                minusRowButt.style.top = event.target.offsetTop + event.target.offsetHeight + border + "px";
                minusColButt.style.left = event.target.offsetLeft + event.target.offsetHeight + border + "px";
            }
            //show minus buttons only if table have more then 1 row or cell
            if(table.rows.length > 1) minusRowButt.style.visibility = 'visible';
            if(table.rows[0].cells.length > 1) minusColButt.style.visibility = 'visible';
        }
    }, true);
    sTable.addEventListener("mouseout", function(){
        let targetName = event.target.tagName;
        if(targetName == "TD" || targetName == "BUTTON")
            //hide minus buttons after 200ms if cursor is out from table or buttons
            this.timer = setTimeout(function(){
                minusRowButt.style.visibility = 'hidden';
                minusColButt.style.visibility = 'hidden';
            }, 200);
    }, true);
    //adding and removing rows and cells
    plusRowButt.addEventListener("click", function(){
        let tr = table.insertRow();
        for(let i = 0; i < table.rows[0].cells.length; i++){
            tr.insertCell(i);
        }
    }, true);
    plusColButt.addEventListener("click", function(){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].insertCell(-1);
        }
    }, true);
    minusRowButt.addEventListener("click", function(){
        table.deleteRow(-1);
        //move button to the previous row if the last one is selected
        if(table.offsetHeight + minusRowButt.offsetHeight + border == minusRowButt.offsetTop) minusRowButt.style.top = minusRowButt.offsetTop - table.rows[0].cells[0].offsetHeight - border + "px";
        //hide button if rows length less then 2
        if(table.rows.length < 2) minusRowButt.style.visibility = 'hidden';
    }, true);
    minusColButt.addEventListener("click", function(){
        for(let i = 0; i < table.rows.length; i++){
            table.rows[i].deleteCell(-1);
        }
        if(table.offsetWidth + minusColButt.offsetHeight + border == minusColButt.offsetLeft) minusColButt.style.left = minusColButt.offsetLeft - table.rows[0].cells[0].offsetHeight - border + "px";
        if(table.rows[0].cells.length < 2) minusColButt.style.visibility = 'hidden';
    }, true);
});