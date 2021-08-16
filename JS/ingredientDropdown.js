const ingredientDropdown = (array) => {
	const element = document.getElementById("ingredientDropdown");
	const itemContainer = document.getElementById("ingItemContainer");
	let isActive = false;

	element.addEventListener("click", () => {
		isActive = isActive ? false : true;

		if (isActive) {
			const htmlString = array
				.map((el) => {
					return `<li class="tag-item ingredients">${el}</li>`;
				})
				.join("");
			itemContainer.innerHTML = htmlString;
		} else {
			itemContainer.innerHTML = "";
		}
	});

	element.addEventListener("keyup", (e) => {
		let searchTerm = e.target.value;

		const htmlString = array
			.filter((el) => {
				if (searchTerm == "" || searchTerm == null || undefined) {
					return el;
				} else if (
					el.toLowerCase().includes(searchTerm.toLowerCase())
				) {
					return el;
				}
			})
			.map((el) => {
				return `<li class="tag-item ingredients">${el}</li>`;
			})
			.join("");
		itemContainer.innerHTML = htmlString;
	});
};

export default ingredientDropdown;
