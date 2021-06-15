// import { library, icon } from "@fortawesome/fontawesome-svg-core";
// import { faClock } from "@fortawesome/free-solid-svg-icons";

// library.add(faClock);

const generateCard = (arr) => {
	arr.map((obj) => {
		// console.log(obj);
		const createCard = (obj) => {
			const {
				id,
				name,
				servings,
				ingredients,
				time,
				appliance,
				utensils,
				description,
			} = obj;

			let card = document.createElement("div");
			card.classList.add("card");
			card.classList.add("w-25");
			card.classList.add("m-3");

			let imageContainer = document.createElement("img");
			imageContainer.classList.add("card-img-top");
			card.appendChild(imageContainer);

			let cardHeader = document.createElement("div");
			cardHeader.classList.add("card-header");
			cardHeader.classList.add("container");
			cardHeader.classList.add("d-flex");
			cardHeader.classList.add("row");
			cardHeader.classList.add("justify-content-between");
			imageContainer.after(cardHeader);

			let recipeTitle = document.createElement("h2");
			recipeTitle.classList.add("col");
			let title = document.createTextNode(name);
			recipeTitle.appendChild(title);
			cardHeader.appendChild(recipeTitle);

			let duration = document.createElement("p");
			duration.classList.add("duration-container");
			duration.classList.add("col");
			let durationText = document.createTextNode(`clock ${time} min`);
			duration.appendChild(durationText);
			recipeTitle.after(duration);

			let ingredientsContainer = document.createElement("div");
			ingredientsContainer.classList.add("ingredients-container");
			let unorderedList = document.createElement("ul");
			unorderedList.classList.add("list-unstyled");
			ingredientsContainer.appendChild(unorderedList);

			ingredients.map((obj) => {
				const { ingredient, quantity, unit } = obj;

				let listItem = document.createElement("li");
				unorderedList.appendChild(listItem);

				if (!quantity) {
					let listItemText = document.createTextNode(
						`${ingredient}: ${unit}`
					);
					listItem.appendChild(listItemText);
				} else if (!unit) {
					let listItemText = document.createTextNode(
						`${ingredient}: ${quantity}`
					);
					listItem.appendChild(listItemText);
				} else if (!quantity && !unit) {
					let listItemText = document.createTextNode(`${ingredient}`);
					listItem.appendChild(listItemText);
				} else if (!!ingredient && !!unit && !!quantity) {
					let listItemText = document.createTextNode(
						`${ingredient}: ${quantity} ${unit}`
					);
					listItem.appendChild(listItemText);
				}
			});

			cardHeader.after(ingredientsContainer);

			let instructions = document.createElement("div");
			instructions.classList.add("description");
			instructions.classList.add("text-truncate");
			let instructionText = document.createTextNode(description);
			instructions.appendChild(instructionText);
			ingredientsContainer.after(instructions);

			let container = document.querySelector("#card-container");
			container.appendChild(card);
		};
		createCard(obj);
	});
};

export { generateCard };
