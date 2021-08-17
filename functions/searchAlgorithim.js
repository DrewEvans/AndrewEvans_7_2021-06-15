const searchData = (array, key) => {
	let results = [];
	let newList = [];
	key = key.toLowerCase();

	if (key) {
		if (key.length >= 3) {
			for (const [i, element] of array.entries()) {
				// console.log(`${i}: ${element.name.toLowerCase()}`);
				if (
					element.name.toLowerCase().indexOf(key) > -1 ||
					element.description.toLowerCase().indexOf(key) > -1 ||
					element.appliance.toLowerCase().indexOf(key) > -1 ||
					element.ingredients.forEach((item) => {
						if (item.ingredient.toLowerCase().indexOf(key) > -1) {
							results.push(element);
						}
					}) ||
					element.ustensils.forEach((item) => {
						if (item.toLowerCase().indexOf(key) > -1) {
							results.push(element);
						}
					})
				) {
					results.push(i);
				}
			}
		}
	}

	results.forEach((result) => {
		newList.push(array[result]);
	});

	return newList;
};

export { searchData };
