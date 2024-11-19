const wrapper = document.querySelector(".wrapper");
const convertButton = document.querySelector(".convert");
const fromLenghtSelect = document.querySelector(".convert__input");
const toLenghtSelect = document.querySelector(".converted__result");
const convertFromArr = [
	{ item: "mm" },
	{ item: "cm" },
	{ item: "m" },
	{ item: "km" },
];
const convertToArr = [
	{ item: "in" },
	{ item: "ft" },
	{ item: "yd" },
	{ item: "ml" },
];

let selectFromBox = document.querySelector(".fromSelect__container");
let selectToBox = document.querySelector(".toSelect__container");
let selectFromInput = document.querySelector(".fromSelect");
let selectToInput = document.querySelector(".toSelect");

selectFromInput.addEventListener("click", function (e) {
	selectFromBox.classList.toggle("show");
});

window.addEventListener("click", (e) => {
	if (e.target !== selectFromInput && e.target !== selectToInput) {
		selectFromBox.classList.remove("show");
		selectToBox.classList.remove("show");
	}
});

document.addEventListener("DOMContentLoaded", (event) => {
	let selectFromList = "";
	let selectToList = "";
	for (let option of convertFromArr) {
		selectFromList += `
				<input class="convert_option_from" value= ${option.item}>`;
	}

	for (let option of convertToArr) {
		selectToList += `
				<input class="convert_option_to" value= ${option.item}>`;
	}

	selectFromBox.innerHTML = selectFromList;
	selectToBox.innerHTML = selectToList;

	let anchorFrom = selectFromInput.getBoundingClientRect();
	let anchorTo = selectToInput.getBoundingClientRect();

	selectFromBox.style.left = anchorFrom.left + "px";
	selectFromBox.style.top =
		anchorFrom.top + selectFromInput.offsetHeight + "px";

	selectToBox.style.left = anchorTo.left + "px";
	selectToBox.style.top = anchorFrom.top + 10 + "px";
});

selectFromBox.addEventListener("click", function (e) {
	if (e.target.classList.contains("convert_option_from")) {
		console.log(e.target.value);
		document.querySelector(".fromSelect").value = e.target.value;
	}
});

selectToBox.addEventListener("click", function (e) {
	if (e.target.classList.contains("convert_option_to")) {
		console.log(e.target.value);
		document.querySelector(".toSelect").value = e.target.value;
	}
});

selectToInput.addEventListener("click", function (e) {
	selectToBox.classList.toggle("show");
});

function convertLengths(data) {
	let fromMetric = document.querySelector(".fromSelect").value;
	let toMetric = document.querySelector(".toSelect").value;
	let result;

	if (fromMetric == "mm") {
		if (toMetric == "in") result = data / 25.4;
		else if (toMetric == "ft") result = data / 304.8;
		else if (toMetric == "yd") result = data / 914.4;
		else if (toMetric == "ml") result = data / 1.609e6;
	}

	if (fromMetric == "cm") {
		if (toMetric == "in") result = data * 0.3937;
		else if (toMetric == "ft") result = data * 0.032808;
		else if (toMetric == "yd") result = data * 0.010936;
		else if (toMetric == "ml") result = data * 0.0000062137;
	}

	if (fromMetric == "m") {
		if (toMetric == "in") result = data * 39.37;
		else if (toMetric == "ft") result = data * 3.2808;
		else if (toMetric == "yd") result = data * 1.0936;
		else if (toMetric == "ml") result = data * 0.00062137;
	}

	if (fromMetric == "km") {
		if (toMetric == "in") result = data * 39370;
		else if (toMetric == "ft") result = data * 3280.8;
		else if (toMetric == "yd") result = data * 1093.6;
		else if (toMetric == "ml") result = data * 0.62137;
	}

	toLenghtSelect.value = result;
	console.log(fromMetric, toMetric);
}

fromLenghtSelect.addEventListener("input", (e) =>
	convertLengths(e.target.value)
);

fromLenghtSelect.addEventListener("change", (e) =>
	convertLengths(e.target.value)
);
