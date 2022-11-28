const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");
const KEY = "s9vuPN6Q6PqaIyKPA4cdBFgXlWL5zwrP";
const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=christmas&limit=25`;

async function getGif() {
	const response = await fetch(`${API_URL}`);
	const data = await response.json();
	const gif = data.data[Math.floor(Math.random() * data.data.length)].images.original.url;
	return gif;
}

function appendGif() {
	const gif = getGif();
	buttons.forEach((button) => {
		button.style.display = "none";
	});

	gif.then((url) => {
		const img = document.createElement("img");
		img.src = url;
		document.body.appendChild(img);
	});
}

function appendSuffix() {
	options.forEach((option) => {
		let suffix = "";
		suffix = "th";
		if (option.textContent == 1 || option.textContent == 21) suffix = "st";
		if (option.textContent == 2 || option.textContent == 22) suffix = "nd";
		if (option.textContent == 3 || option.textContent == 23) suffix = "rd";

		option.textContent = option.textContent + suffix + " of December";
	});
}

function matchButtons() {
	buttons.forEach((button) => {
		button.disabled = true;
		if (button.dataset.button == select.dataset.select) button.disabled = false;
	});
}

appendSuffix();

select.addEventListener("change", () => {
	select.dataset.select = select.value[0];
	matchButtons();
});

buttons.forEach((button) => {
	button.addEventListener("click", appendGif);
});
