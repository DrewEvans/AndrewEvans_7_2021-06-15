import {
	recipes,
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";
import openFilter from "./openFilter.js";
import { generateCard } from "./generateCard.js";

//DOM Elements
const ingredientsDropDown = document.querySelector(".ingredients-dropdown");
const utensilsDropDown = document.querySelector(".utensils-dropdown");
const appliancesDropDown = document.querySelector(".appliances-dropdown");

//display user filterable Items
openFilter(ingredientsDropDown, 1, uniqueIngredientList(recipes));
openFilter(utensilsDropDown, 2, uniqueUtensils(recipes));
openFilter(appliancesDropDown, 3, uniqueAppliances(recipes));

//render cards from recipes array
generateCard(recipes);
