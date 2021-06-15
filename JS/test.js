const randomInt = (max) => {
	return Math.floor(Math.random() * max);
};

const generateCard = (arr) => {
	arr.map((obj) => {
		console.log(obj);
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

			const newDiv = document.createElement("div");
			const newContent = document.createTextNode(name);

			newDiv.appendChild(newContent);

			const currentDiv = document.querySelector("main");
			document.body.insertBefore(newDiv, currentDiv);
		};
		createCard(obj);
	});
};

export { randomInt, generateCard };
