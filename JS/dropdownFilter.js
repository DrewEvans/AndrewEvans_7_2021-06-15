const dropdownFilter = (element, id, array) => {
	let isActive = false;
	let results = [];
	let filteredList = array;

	filteredList = element.addEventListener("keyup", (e) => {
		let searchTerm = e.target.value;

		filteredList = array.filter((el) => {
			if (searchTerm == "" || searchTerm == null || undefined) {
				return el;
			} else if (el.toLowerCase().includes(searchTerm.toLowerCase())) {
				results.push(el);
			}
		});
		return results;
	});

	element.onclick = () => {
		element.classList.toggle("active");
		isActive = element.classList.contains("active");

		if (isActive) {
			let searchBox = document.createElement("div");
			let itemContainer = document.createElement("ul");
			searchBox.classList.add(`search-container-${id}`);
			searchBox.classList.add(`item-container`);

			element.appendChild(searchBox);
			searchBox.appendChild(itemContainer);

			array.forEach((item) => {
				let listItem = document.createElement("li");
				let itemName = document.createTextNode(item);

				listItem.classList.add("tag-item");
				id === 1 ? listItem.classList.add("ingredients") : null;
				id === 2 ? listItem.classList.add("ustensil") : null;
				id === 3 ? listItem.classList.add("appliance") : null;

				listItem.appendChild(itemName);
				itemContainer.appendChild(listItem);
			});
		} else {
			let box = document.querySelector(`.search-container-${id}`);
			box.remove();
		}
	};
};

export default dropdownFilter;
