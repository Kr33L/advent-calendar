const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");
const optionsData = document.querySelectorAll("data-option");
const buttonsData = document.querySelectorAll("data-button");

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
