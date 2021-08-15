import {
	recipes,
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";
import dropdownFilter from "./dropdownFilter.js";

//DOM Elements
const ingredientsDropDown = document.querySelector(".ingredients-dropdown");
const utensilsDropDown = document.querySelector(".utensils-dropdown");
const appliancesDropDown = document.querySelector(".appliances-dropdown");
const searchBar = document.querySelector(".form-control");

const dropdowns = document.querySelectorAll("#dropdownFilter");

const cardContainer = document.getElementById("card-container");
const tagContainer = document.getElementById("tagContainer");
const closeCross = document.querySelectorAll("closeCross");
const tags = document.getElementById("tagItem");

//empty arrays
let recipesToDisplay = [];
let recipesFiltered = [];
let filterTags = []; 



//add event listener on the searchbar
searchBar.addEventListener("keyup", (e) => {
	//get input from searchbar
	let searchTerm = e.target.value;
	//filter objects based on searched input
	recipesFiltered = recipesToDisplay.filter((el) => {
		return (
			el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			el.appliance.toLowerCase().includes(searchTerm.toLowerCase()) ||
			el.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(searchTerm.toLowerCase())
			) ||
			el.ingredients.filter((obj) =>
				obj.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
			).length > 0
		);
	});
	//return new cards based on input
	createCard(recipesFiltered);
	//return new filtered lists in the dropdowns
	dropdownFilter(
		ingredientsDropDown,
		1,
		uniqueIngredientList(recipesFiltered)
	);
	dropdownFilter(utensilsDropDown, 2, uniqueUtensils(recipesFiltered));
	dropdownFilter(appliancesDropDown, 3, uniqueAppliances(recipesFiltered));
});


for (let i = 0; i < dropdowns.length; i++) {
	dropdowns[i].addEventListener("click", (e) => {
		
		if (e.target.className === "tag-item ingredients") {
			filterTags.push({
				name: e.target.innerText,
				type: "ingredient",
			})
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="ingredient-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}

		if (e.target.className === "tag-item ustensil") {
			filterTags.push({
				name: e.target.innerText,
				type: "ustensil",
			})
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="ustensil-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}

		if (e.target.className === "tag-item appliance") {
			filterTags.push({
				name: e.target.innerText,
				type: "appliance",
			})
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="appliance-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}
	});
}

document.addEventListener("click", (e)=>{

	if(e.target.className === "far fa-times-circle closeCross"){
		let term = e.target.previousElementSibling.innerText;
		 filterTags = arrayRemove(filterTags, term)
		}
		
	if(e.target.className === "far fa-times-circle closeCross"){
		e.target.parentNode.remove()
	}

	if(e.target.tagName === "LI" && !recipesFiltered.length ){
		
		console.log("added tag, searchbar not added")
		
		let ingredientTags = [];
		let ustensilTags = [];
		let applianceTags = [];

		
		Array.from(filterTags).forEach((el)=>{
			const {type, name} = el;
			
			
			type === "ingredient" ? ((ingredientTags = name), console.log("ing")) : null;
			type === "utensil" ? (ustensilTags = name) : null;
			type === "appliance" ? (applianceTags = name) : null;
		})
	
		if(ingredientTags.length){
			recipesFiltered = recipesToDisplay.filter((el)=>{
				return (
					el.ingredients.filter((obj) =>
						obj.ingredient.toLowerCase().includes(ingredientTags.toLowerCase())
					).length > 0
				);
			})
		}
		if(applianceTags.length){
			recipesFiltered = recipesToDisplay.filter((el)=>{
				return (
					el.appliance.toLowerCase().includes(applianceTags.toLowerCase())
				);
			})
		}
		if(ustensilTags.length){
			recipesFiltered = recipesToDisplay.filter((el)=>{
				return el.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(ustensilTags.toLowerCase())
			)
			})
		}

		createCard(recipesFiltered);

	} 
})

const arrayRemove = (arr, value) => { 
	return arr.filter(function(ele){ 
		return ele.name != value; 
	});
}

//fetch json data
const loadRecipes = async () => {
	try {
		const res = await fetch("/public/data.json");
		recipesToDisplay = await res.json();
		createCard(recipesToDisplay);
		dropdownFilter(
			ingredientsDropDown,
			1,
			uniqueIngredientList(recipesToDisplay)
		);
		dropdownFilter(utensilsDropDown, 2, uniqueUtensils(recipesToDisplay));
		dropdownFilter(
			appliancesDropDown,
			3,
			uniqueAppliances(recipesToDisplay)
		);
	} catch (err) {
		console.error(err);
	}
};

// generate recipe cards from provided data
const createCard = (recipes) => {
	const htmlString = recipes
		.map((recipe) => {
			const { id, name, ingredients, time, description } = recipe;

			return `
			<div key=${id} class="card">
			<div class="img-block"></div>
			<div class="card-body">
				<h2 class="card-title">${name}</h2>
				<p class="duration">
					<span class="fas fa-clock"></span>${" "}
					${time}min
				</p>
			</div>
			<div class="details">
				<div class="ingredients-container">
					<ul>
						${ingredients
							.map(
								(x) =>
									`<p><span class="bolder">${
										x.ingredient
									}:</span> ${x.quantity}${
										x.unit === undefined
											? " unités"
											: x.unit
									}</p>`
							)
							.join("")}
					</ul>
				</div>
				<div class="description">${description}</div>
			</div>
		</div>
					`;
		})
		.join("");
	cardContainer.innerHTML = htmlString;
};

loadRecipes();