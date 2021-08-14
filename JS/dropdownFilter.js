const dropdownFilter = (element, id, array) => {
	let isActive = false;

	element.onclick = () => {
		element.classList.toggle("active");
		isActive = element.classList.contains("active");

		if (isActive) {
			let searchBox = document.createElement("div");
			searchBox.classList.add(`search-container-${id}`);

			element.appendChild(searchBox);

			array.forEach((item) => {
				let listItem = document.createElement("li");
				let itemName = document.createTextNode(item);

				listItem.classList.add("tag-item");
				id === 1 ? listItem.classList.add("ingredients") : null;
				id === 2 ? listItem.classList.add("ustensil") : null;
				id === 3 ? listItem.classList.add("appliance") : null;

				listItem.appendChild(itemName);
				searchBox.appendChild(listItem);
			});
		} else {
			let box = document.querySelector(`.search-container-${id}`);
			box.remove();
		}
	};
};

export default dropdownFilter;
