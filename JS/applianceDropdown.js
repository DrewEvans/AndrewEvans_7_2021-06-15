const applianceDropdown = (array) => {
	const element = document.getElementById("applianceDropdown");
	const itemContainer = document.getElementById("appItemContainer");
	const dropdownArrow = element.childNodes[3];
	let isActive = false;

	element.addEventListener("click", () => {
		isActive = isActive ? false : true;

		if (isActive) {
			const htmlString = array
				.map((el) => {
					return `<li class="tag-item appliance">${el}</li>`;
				})
				.join("");
			itemContainer.innerHTML = htmlString;
			dropdownArrow.classList.remove("fa-angle-down");
			dropdownArrow.classList.add("fa-angle-up");
		} else {
			itemContainer.innerHTML = "";
			dropdownArrow.classList.remove("fa-angle-up");
			dropdownArrow.classList.add("fa-angle-down");
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
				return `<li class="tag-item appliance">${el}</li>`;
			})
			.join("");
		itemContainer.innerHTML = htmlString;
	});
};

export default applianceDropdown;
