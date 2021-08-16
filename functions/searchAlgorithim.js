const searchData = (array, keyword) => {
	let results = [];

	results = array.filter((el) => {
		return (
			el.name.toLowerCase().includes(keyword.toLowerCase()) ||
			el.appliance.toLowerCase().includes(keyword.toLowerCase()) ||
			el.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(keyword.toLowerCase())
			) ||
			el.ingredients.filter((obj) =>
				obj.ingredient.toLowerCase().includes(keyword.toLowerCase())
			).length > 0
		);
	});
	return results;
};

export { searchData };
