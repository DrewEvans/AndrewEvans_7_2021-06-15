const searchRecipes = (object, string) => {
	let results = [];

	if (string) {
		if (string.length >= 3) {
			results = object
				.filter((el) => {
					return (
						el.name.toLowerCase().includes(string.toLowerCase()) ||
						el.appliance
							.toLowerCase()
							.includes(string.toLowerCase()) ||
						el.ustensils.some((ustensil) =>
							ustensil
								.toLowerCase()
								.includes(string.toLowerCase())
						) ||
						el.ingredients.filter((obj) =>
							obj.ingredient
								.toLowerCase()
								.includes(string.toLowerCase())
						).length > 0
					);
				})
				.map((obj) => {
					return obj;
				});
		}
		return results;
	}
};

const tagSearch = (object, searchItem) => {
	let results = [];

	let ingredientTags = [];
	let ustensilTags = [];
	let applianceTags = [];

	Array.from(searchItem).forEach((item) => {
		const { type, text } = item;

		console.log(item.type);

		type === "ingredient" ? (ingredientTags = text) : null;
		type === "utensil" ? (ustensilTags = text) : null;
		type === "appliance" ? (applianceTags = text) : null;
	});

	if (searchItem) {
		if (searchItem.length > 0 && ingredientTags.length > 0) {
			results = object
				.filter((obj) => {
					return (
						obj.ingredients.filter((el) =>
							el.ingredient
								.toLowerCase()
								.includes(ingredientTags.toLowerCase())
						).length > 0
					);
				})
				.map((obj) => {
					return obj;
				});
		}
		if (searchItem.length > 0 && applianceTags.length > 0) {
			results = object
				.filter((obj) => {
					return obj.appliance
						.toLowerCase()
						.includes(applianceTags.toLowerCase());
				})
				.map((obj) => {
					return obj;
				});
		}

		if (searchItem.length > 0 && ustensilTags.length > 0) {
			results = object
				.filter((obj) => {
					return obj.ustensils.some((ustensil) =>
						ustensil
							.toLowerCase()
							.includes(ustensilTags.toLowerCase())
					);
				})
				.map((obj) => {
					return obj;
				});
		}
	}
	return results;
};

export { tagSearch, searchRecipes };
