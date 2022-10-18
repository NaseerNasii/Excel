let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");

bold.addEventListener("click",function(){
   setFontStyle("bold",bold);
})

italic.addEventListener("click",function(){
    setFontStyle("italic",italic);
})

underline.addEventListener("click",function(){
    setFontStyle("underline",underline);
})

function setFontStyle(stylename,element){
    if(lastSelectedcell){
        let {rowid,colid}=getrowcolId(lastSelectedcell);
        let cellobject=db[rowid][colid];
        if(cellobject.fontStyle[stylename]){

            if(stylename == "bold"){
                lastSelectedcell.style.fontWeight="normal";
            }
            else if(stylename == "italic"){
                lastSelectedcell.style.fontStyle="normal";
            }
            else if(stylename == "underline"){
                lastSelectedcell.style.textDecoration="none";
            }
            element.classList.remove("active-font-style");

        }else{
            if(stylename == "bold"){
                lastSelectedcell.style.fontWeight="bold";
            }
            else if(stylename == "italic"){
                lastSelectedcell.style.fontStyle="italic";
            }
            else if(stylename == "underline"){
                lastSelectedcell.style.textDecoration="underline";
            }
            element.classList.add("active-font-style");
        }
        cellobject.fontStyle[stylename]=!cellobject.fontStyle[stylename];
    }
}