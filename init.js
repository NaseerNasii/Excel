let cellscontdiv=document.querySelector(".cells-content");



function initcells(){
    //top left cell div
    let cellcontent="<div class='top-left-cell'></div>";
    
    //top row
    cellcontent+="<div class='top-row'>"
    for(let i=0;i<26;i++){
        cellcontent+=`<div class='top-row-cell' trid='${i}'>${String.fromCharCode(65+i)}</div>`
    }
    cellcontent+="</div>"
    
    //left coloumn
    cellcontent+="<div class='left-col'>"
    for(let i=0;i<100;i++){
        cellcontent+=`<div class='left-col-cell' lcid='${i}'>${i+1}</div>`
    }
    cellcontent+="</div>"
    
    //cells
    cellcontent+="<div class='cells'>"
    for(let i=0;i<100;i++){
        cellcontent+="<div class='cell-row'>"
        for(let j=0;j<26;j++){
            cellcontent+=`<div class= 'cell-col' rowid='${i}' colid='${j}'  contentEditable='true'></div>`
        }
        cellcontent+="</div>"
    }
    cellcontent+="</div>"
    cellscontdiv.innerHTML=cellcontent;
}
initcells();

let sheetdb=[];
let db;
let visitedcell;
function initdb(){
    let newsheetdb=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let name=String.fromCharCode(65+j)+(i+1)+"";
            let cellobject={
                name:name,
                value:"",
                formula:"",
                children:[],
                parent:[],
                visited:false,
                fontStyle:{bold:false,italic:false,underline:false}
            }
            row.push(cellobject);
        }
        newsheetdb.push(row);
    }
    visitedcell=[];
    db=newsheetdb;
    sheetdb.push({db:newsheetdb,visitedcell:visitedcell});
   
}
initdb();