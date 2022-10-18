let topleftcell=document.querySelector(".top-left-cell");
let toprow=document.querySelector(".top-row");
let leftcol=document.querySelector(".left-col");
let allcells=document.querySelectorAll(".cells");
let adresInp=document.querySelector("#adress");
let formulaInp=document.querySelector("#formula");
let lastSelectedcell;


cellscontdiv.addEventListener("scroll",function(e){
    let topscrol=e.target.scrollTop;
    let leftscrol=e.target.scrollLeft;
    toprow.style.top=topscrol+"px";
    leftcol.style.left=leftscrol+"px";
    topleftcell.style.top=topscrol+"px";
    topleftcell.style.left=leftscrol+"px";
   
})



for(let i=0;i<allcells.length;i++){
    allcells[i].addEventListener("click",function(e){
       
        let rowid=Number(e.target.getAttribute("rowid"));
        let colid=Number(e.target.getAttribute("colid"));

        e.target.classList.add("active-cell");
        document.querySelector(`div[trid="${colid}"]`).classList.add("active-top");
        document.querySelector(`div[lcid='${rowid}']`).classList.add("active-top");

        let adress=String.fromCharCode(65+colid)+(rowid+1)+"";
        adresInp.value=adress;
        let cellobject=db[rowid][colid];
        formulaInp.value=cellobject.formula;
        cellobject.fontStyle.bold?
        document.querySelector(".bold").classList.add("active-font-style"):
        document.querySelector(".bold").classList.remove("active-font-style");

        cellobject.fontStyle.italic?
        document.querySelector(".italic").classList.add("active-font-style"):
        document.querySelector(".italic").classList.remove("active-font-style");

        cellobject.fontStyle.underline?
        document.querySelector(".underline").classList.add("active-font-style"):
        document.querySelector(".underline").classList.remove("active-font-style");
    })

    allcells[i].addEventListener("blur",function(e){

        e.target.classList.remove("active-cell");
       
        

        lastSelectedcell=e.target;
        let cellvalue=e.target.textContent;
        let rowid=e.target.getAttribute("rowid");
        let colid=e.target.getAttribute("colid");

        document.querySelector(`div[trid="${colid}"]`).classList.remove("active-top");
        document.querySelector(`div[lcid='${rowid}']`).classList.remove("active-top");

        let cellobject=db[rowid][colid];
        if(cellobject.value==cellvalue){
            return;
        }
        cellobject.value=cellvalue;
        updatechildren(cellobject);
        if(cellobject.visited){
            return;
        }
        cellobject.visited=true;
        visitedcell.push({"rowid":rowid,"colid":colid});
     },true)

     allcells[i].addEventListener("keydown",function(e){
        
        if(e.key == 'Backspace'){
        
            let cell=e.target;
            let {rowid,colid}=getrowcolId(cell);
            let cellobject=db[rowid][colid];
            if(cellobject.formula){
                //update db
                cellobject.formula="";
                //update ui
                formulaInp.value="";
                removeFormula(cellobject);
                cell.textContent="";
            }
        }
     })
      
}


formulaInp.addEventListener("blur",function(e){
    let formula=e.target.value;
    if(formula){
        let{rowid,colid}=getrowcolId(lastSelectedcell);
        let cellobject=db[rowid][colid];
        if(cellobject.formula){
            removeFormula(cellobject);
        }
        cellobject.formula=formula;
        let computedvalue=solveformula(formula,cellobject);
        //updating db
        cellobject.value=computedvalue;
        //updating ui
        lastSelectedcell.textContent=computedvalue;
        updatechildren(cellobject);
    }
},true)

