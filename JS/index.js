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

console.log(tags)

let recipesToDisplay = [];
let filterTags = []; 

//add event listener on the searchbar
searchBar.addEventListener("keyup", (e) => {
	//get input from searchbar
	let searchTerm = e.target.value;
	//filter objects based on searched input
	const filteredRecipes = recipesToDisplay.filter((el) => {
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
	createCard(filteredRecipes);
	//return new filtered lists in the dropdowns
	dropdownFilter(
		ingredientsDropDown,
		1,
		uniqueIngredientList(filteredRecipes)
	);
	dropdownFilter(utensilsDropDown, 2, uniqueUtensils(filteredRecipes));
	dropdownFilter(appliancesDropDown, 3, uniqueAppliances(filteredRecipes));
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
				`<div class="ingredient-tag tag">
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
				`<div class="ustensil-tag tag">
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
				`<div class="appliance-tag tag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}

		console.log(e.target.classList)

	});
}



document.addEventListener("click", (e)=>{
	
	if(e.target.className === "far fa-times-circle closeCross"){
		console.log(e.target.parentNode)
		e.target.parentNode.remove()
	}

	if(e.target.id == "tagItem"){
		console.log("name")
	}
})


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
