const ingredientDropdown = (array) => {
	const element = document.getElementById("testDrop")
	const itemContainer = document.getElementById("testContainer")
    let isActive = false; 

    element.addEventListener("click", () => { 
                 
        isActive = isActive ? false : true;
        
        if(isActive){
            const htmlString = array.map((el)=>{
                return `<li>${el}</li>`
            }).join("");
            itemContainer.innerHTML = htmlString;
        } else {
            itemContainer.innerHTML = ""
        }
        
        // if(element.hasAttribute("active")){
        //     itemContainer.remove();
        //     element.setAttribute("active")
        //     console.log("alreacdy Act")
        // } else {
        //     element.classList.toggle("active")
        //     console.log("needs Act")
        // }

        

        // if(!toggle){
        //     element.classList.add("active")
            
        // } else {
        //     element.classList.remove("active")

        // }

    })    


   

	element.addEventListener("keyup", (e)=>{
        let searchTerm = e.target.value;
        console.log(!searchTerm)
        
		const htmlString = array.filter((el)=>{
            if (searchTerm == "" || searchTerm == null || undefined) {
                return el;
			} else if (
                el
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
                ) {
                    return el;
                    
                }
            }).map((el)=>{
                return`<li>${el}</li>`
            }).join("");
            itemContainer.innerHTML = htmlString
        })	
        
};

export default ingredientDropdown;