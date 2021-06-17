const openFilter = (element, id, array) => {
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

				listItem.appendChild(itemName);
				searchBox.appendChild(listItem);
			});
		} else {
			let box = document.querySelector(`.search-container-${id}`);
			box.remove();
		}
	};

	return console.log(isActive);
};

export default openFilter;
