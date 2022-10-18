let plusbtn=document.querySelector(".add-sheets");
let sheetlist=document.querySelector(".sheets-list");
let sheetid=0;


plusbtn.addEventListener("click",function(e){
     sheetid++;
     let activesheet=document.querySelector(".active-sheet");
     activesheet.classList.remove("active-sheet");


    let sheetdiv=document.createElement("div");
    sheetdiv.classList.add("sheet");
    sheetdiv.classList.add("active-sheet");
    sheetdiv.setAttribute("sheetid",sheetid);
    sheetdiv.textContent="Sheet-"+(sheetid+1);
    sheetlist.append(sheetdiv);
    initui();
    initdb();

})

sheetlist.addEventListener("click",function(e){
    let clickedsheet=e.target;
    if(clickedsheet.classList.contains("active-sheet")){
        return;
    }
    let activesheet=document.querySelector(".active-sheet");
    activesheet.classList.remove("active-sheet");
    clickedsheet.classList.add("active-sheet");
    initui();
    let sheetid=clickedsheet.getAttribute("sheetid");
    db=sheetdb[sheetid].db;
    visitedcell=sheetdb[sheetid].visitedcell;
    setui();
})


