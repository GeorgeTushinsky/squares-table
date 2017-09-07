squares_table();

function squares_table(){
    let sTable = document.querySelector(".squares_table");
    
    buttonsAppearing(sTable);
    buttonsPosHandler(sTable);
};

function buttonsAppearing(element){
    let minusRowButt = element.querySelector(".minus_row"),
        minusColButt = element.querySelector(".minus_column"),
        timer;

    element.addEventListener("mouseover", function(){
        if(event.target.tagName == "TD" || event.target.tagName == "BUTTON"){
            clearTimeout(timer);
            minusRowButt.style.visibility = 'visible';
            minusColButt.style.visibility = 'visible';
        }
    }, true);
    element.addEventListener("mouseout", function(){
        if(event.target.tagName == "TD" || event.target.tagName == "BUTTON")
            timer = setTimeout(function(){
                minusRowButt.style.visibility = 'hidden';
                minusColButt.style.visibility = 'hidden';
            }, 200);
    }, true);
};