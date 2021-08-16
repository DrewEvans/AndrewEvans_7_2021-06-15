const tagSearch = (array, key) => {
	let results = [];

	let ingredientTags = [];
	let ustensilTags = [];
	let applianceTags = [];

	Array.from(key).forEach((el) => {
		const { type, name } = el;

		type === "ingredient" ? (ingredientTags = name) : null;
		type === "ustensil" ? (ustensilTags = name) : null;
		type === "appliance" ? (applianceTags = name) : null;
	});

	if (ingredientTags.length) {
		results = array.filter((el) => {
			return (
				el.ingredients.filter((obj) =>
					obj.ingredient
						.toLowerCase()
						.includes(ingredientTags.toLowerCase())
				).length > 0
			);
		});
	}
	if (applianceTags.length) {
		results = array.filter((el) => {
			return el.appliance
				.toLowerCase()
				.includes(applianceTags.toLowerCase());
		});
	}
	if (ustensilTags.length) {
		results = array.filter((el) => {
			return el.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(ustensilTags.toLowerCase())
			);
		});
	}
	return results;
};

export { tagSearch };
