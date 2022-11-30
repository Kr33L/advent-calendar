const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");
const KEY = "s9vuPN6Q6PqaIyKPA4cdBFgXlWL5zwrP";
const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=christmas&limit=200`;

const storedGifs = JSON.parse(localStorage.getItem("giphyStored"));

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
		button.disabled = button.dataset.button !== select.dataset.select;
	});
}

//<==== HELPER FUNCTIONS ====>

function getSuffix(dataValue) {
	let suffix = "th";
	if (dataValue == 1 || dataValue == 21) suffix = "st";
	if (dataValue == 2 || dataValue == 22) suffix = "nd";
	if (dataValue == 3 || dataValue == 23) suffix = "rd";
	return suffix;
}

function suffix() {
	options.forEach((option) => {
		option.textContent = option.textContent + getSuffix(option.dataset.option) + " of December";
	});
}

const getRandomGif = () => storedGifs.data[Math.floor(Math.random() * storedGifs.data.length)].images.original.url;
const assignSelectData = () => (select.dataset.select = select.value.replace(/\D/g, ""));

// <==== Main Program ====>

getGif();
suffix();
assignSelectData();

select.addEventListener("change", () => {
	assignSelectData();
	matchButtons();
});

buttons.forEach((button) => {
	if (button.classList.contains("has-gif")) return;
	button.addEventListener("click", (e) => {
		appendGif(e);
		button.disabled = true;
	});
});
