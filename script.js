const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const buttons = document.querySelectorAll("button");

//append suffix to each option
function appendSuffix() {
	options.forEach((option) => {
		let suffix = "";
		suffix = "th";
		if (option.value == 1 || option.value == 21) suffix = "st";
		if (option.value == 2 || option.value == 22) suffix = "nd";
		if (option.value == 3 || option.value == 23) suffix = "rd";

		option.textContent = option.value + suffix + " of December";
	});
}

appendSuffix();
