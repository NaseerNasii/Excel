function solveformula(formula,selfcellobject){
    let formulacomponents=formula.split(" ");
    for(let i=0;i<formulacomponents.length;i++){
     let onecomp=formulacomponents[i];
     if(onecomp[0]>='A'&&onecomp[0]<='Z'){
         let {rowid,colid}=getrowcolIdFromAdress(onecomp);
         let cellobject=db[rowid][colid];
         let value=cellobject.value;
         if(selfcellobject){
            cellobject.children.push(selfcellobject.name);
            selfcellobject.parent.push(cellobject.name);
         }
         formula=formula.replace(onecomp,value);
     }
    }
    let computedvalue=eval(formula);
    return computedvalue;
 }

 function updatechildren(cellobject){
    for(let i=0;i<cellobject.children.length;i++){
        let childname=cellobject.children[i];
        let {rowid,colid}=getrowcolIdFromAdress(childname);
        let childcellobject=db[rowid][colid];
        let newval=solveformula(childcellobject.formula);
        let childcellui=document.querySelector(`div[rowid='${rowid}'][colid='${colid}']`);
        childcellui.textContent=newval;
        childcellobject.value=newval;
        updatechildren(childcellobject);
        
    }
 }
 

 function removeFormula(cellobject){
    for(let i=0;i<cellobject.parent.length;i++){
        let parentname=cellobject.parent[i];
        let {rowid,colid}=getrowcolIdFromAdress(parentname);
        let parentcellobject=db[rowid][colid];
        let updatedchildren=parentcellobject.children.filter(function(child){
           return child!=cellobject.name;
        })
        parentcellobject.children=updatedchildren;
    }
    cellobject.parent = [];
}



 function getrowcolId(element){
    let rowid=element.getAttribute("rowid");
    let colid=element.getAttribute("colid");
    return {
        rowid,colid
    }
}
function getrowcolIdFromAdress(adress){
    //A100
    let rowid=Number(adress.substring(1))-1;
    let colid=adress.charCodeAt(0)-65;
    return{
        rowid,colid
    }
}

function initui(){
    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){
            let cell=document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            cell.textContent="";
        }
    }
}

function setui(){
    for(let i=0;i<visitedcell.length;i++){
        let {rowid,colid}=visitedcell[i];
        let cellobject=db[rowid][colid];
        let cellui=document.querySelector(`div[rowid='${rowid}'][colid='${colid}']`);
        cellui.textContent=cellobject.value;
    }
}