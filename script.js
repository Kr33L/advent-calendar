const select = document.querySelector("select");
const dates = document.querySelectorAll("option");
const windows = document.querySelectorAll(".window");

const enableWindow = (i) => (windows[i].disabled = false);
const disableWindow = (i) => (windows[i].disabled = true);

function toggleWindow(currentSelection) {
	for (let i = 0; i < dates.length; i++) {
		if (currentSelection === dates[i].value) {
			enableWindow(i);
		} else {
			disableWindow(i);
		}
	}
}

select.addEventListener("change", () => toggleWindow(select.value));
