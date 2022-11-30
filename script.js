const key = "s9vuPN6Q6PqaIyKPA4cdBFgXlWL5zwrP";
const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=christmas&limit=200`;
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");

// <==== MAIN FUNCTIONS ====>

async function getGif() {
	if (!localStorage.getItem("gifs")) return;
	const response = await fetch(`${apiUrl}`);
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	const data = await response.json();
	localStorage.setItem("giphyStored", JSON.stringify(data));
}

function appendGif(e) {
	const randomGif = getRandomGif();
	e.target.textContent = "";
	e.target.style.backgroundImage = `url(${randomGif})`;
	e.target.classList.add("has-gif");
}

function toggleButton() {
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

function getRandomGif() {
	const gifs = JSON.parse(localStorage.getItem("giphyStored")).data;
	const randomIndex = Math.floor(Math.random() * gifs.length);
	return gifs[randomIndex].images.original.url;
}

const assignSelectData = () => (select.dataset.select = select.value.replace(/\D/g, ""));

// <==== Main Program ====>

getGif();
suffix();
assignSelectData();

select.addEventListener("change", () => {
	assignSelectData();
	toggleButton();
});

buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (!button.classList.contains("has-gif")) {
			appendGif(e);
			button.disabled = true;
		}
	});
});
