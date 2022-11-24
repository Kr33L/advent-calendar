const select = document.querySelector("select");
const selectDate = document.querySelectorAll("option");
const windows = document.querySelectorAll(".window");

const toggleWindow = (index, bool) => (windows[index].disabled = bool);

// working name...
function linkWindowToDate(currentSelection, newSelection) {
	selectDate.forEach((date, index) => {
		toggleWindow(index, true);
		if (currentSelection.value === newSelection[index].value) toggleWindow(index, false);
	});
}

// get a random youtube video from a christmas playlist (and lock it in local storage?)
// function getRandomVideo() {}
// get a random christmas image (and lock it in local storage?)
// function getRandomImage() {}

select.addEventListener("change", () => linkWindowToDate(select, selectDate));
