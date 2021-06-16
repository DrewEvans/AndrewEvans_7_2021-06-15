import {
	recipes,
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";
import { generateCard } from "./generateCard.js";

// uniqueIngredientList(recipes);
// uniqueUtensils(recipes);
// uniqueAppliances(recipes);

generateCard(recipes);
