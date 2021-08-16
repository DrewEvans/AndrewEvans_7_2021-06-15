const renderCards = (array, node) => {
	const htmlString = array
		.map((el) => {
			const { id, name, ingredients, time, description } = el;

			return `
			<div key=${id} class="card">
			<div class="img-block"></div>
			<div class="card-body">
				<h2 class="card-title">${name}</h2>
				<p class="duration">
					<span class="fas fa-clock"></span>${" "}
					${time}min
				</p>
			</div>
			<div class="details">
				<div class="ingredients-container">
					<ul>
						${ingredients
							.map(
								(x) =>
									`<p><span class="bolder">${
										x.ingredient
									}:</span> ${x.quantity}${
										x.unit === undefined
											? " unités"
											: x.unit
									}</p>`
							)
							.join("")}
					</ul>
				</div>
				<div class="description">${description}</div>
			</div>
		</div>
					`;
		})
		.join("");
	node.innerHTML = htmlString;
};
export { renderCards };
