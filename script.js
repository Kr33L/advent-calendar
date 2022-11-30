const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");
const KEY = "s9vuPN6Q6PqaIyKPA4cdBFgXlWL5zwrP";
const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=christmas&limit=200`;

const storedGifs = JSON.parse(localStorage.getItem("giphyStored"));

const getRandomGif = () => storedGifs.data[Math.floor(Math.random() * storedGifs.data.length)].images.original.url;

// <==== MAIN FUNCTIONS ====>

async function getGif() {
	if (storedGifs) return;
	const response = await fetch(`${API_URL}`);
	const data = await response.json();
	localStorage.setItem("giphyStored", JSON.stringify(data));
}

function appendGif(e) {
	const randomGif = getRandomGif();
	e.target.textContent = "";
	e.target.style.backgroundImage = `url(${randomGif})`;
	e.target.classList.add("has-gif");
}

function matchButtons() {
	buttons.forEach((button) => {
		button.disabled = true;
		if (button.dataset.button === select.dataset.select) button.disabled = false;
	});
}

//<==== HELPER FUNCTIONS ====>

function suffix() {
	options.forEach((option) => {
		let suffix = "";
		suffix = "th";
		if (option.textContent == 1 || option.textContent == 21) suffix = "st";
		if (option.textContent == 2 || option.textContent == 22) suffix = "nd";
		if (option.textContent == 3 || option.textContent == 23) suffix = "rd";

		option.textContent = option.textContent + suffix + " of December";
	});
}

// <==== Main Program ====>

getGif();
suffix();

select.addEventListener("change", () => {
	select.dataset.select = select.value.replace(/\D/g, "");
	matchButtons();
});

buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (!e.target.classList.contains("has-gif")) appendGif(e);
		button.disabled = true;
	});
});
