const operators = ["*", "/", "-", "+", "."];
const input = document.querySelector(".result");
let newInput = "";
let results = "";
let buttonsArr = [...document.querySelectorAll(".operator")];

input.addEventListener("input", function (event) {
	calcNums(event.inputType == "deleteContentBackward" ? "<" : event.data);
	return false;
});

input.addEventListener("keyup", function (event) {
	if (event.key == "Enter") calcNums("=");
});

buttonsArr.forEach(function (item) {
	item.addEventListener("click", calcNums);
});

function calcNums(data) {
	let attr = this.attributes["isNum"]
		? this.attributes["isNum"]
		: this.attributes["isOperator"];

	let value = typeof data == "string" ? data : attr.value;

	if (value == "C") {
		if (!newInput && input.value) newInput = input.value;

		if (newInput) return (input.value = results = newInput = "");

		return false;
	}

	if (value == "=") {
		if (input != input.value) newInput = input.value;

		newInput = operators.includes(newInput[newInput.length - 1])
			? newInput.slice(0, -1)
			: newInput;
		newInput = operators.includes(newInput[newInput.length - 1])
			? newInput.slice(0, -1)
			: newInput;

		let string = results
			? `(${results.split("=")[0]})${newInput.replace(
					results.split("=")[1],
					""
			  )}`
			: newInput;

		let result = strToMath(string);
		results = `${string}=${result}`;
		newInput = input.value = result;

		return false;
	}

	if (value == "<") {
		newInput = input.value = newInput.slice(0, -1);
		return false;
	}

	if (!input && value == ".") {
		value = "0.";
	}

	if (
		operators.includes(newInput[newInput.length - 1]) &&
		operators.includes(value)
	) {
		if (value != "-" && operators.includes(newInput[newInput.length - 1]))
			newInput = newInput.slice(0, -1);
		if (
			(value == "-" && newInput[newInput.length - 1] == "-") ||
			(value == "-" && newInput[newInput.length - 1] == "+")
		)
			newInput = newInput.slice(0, -1);
		if (value != "-" && operators.includes(newInput[newInput.length - 1]))
			newInput = newInput.slice(0, -1);
	}

	if (newInput == "" && operators.includes(value) && value != "-") {
		value = "";
	}

	newInput += value;
	input.value = newInput;
}

function strToMath(string) {
	string = string
		.replaceAll(" ", "")
		.replace(/[-+/*]/g, " $& ")
		.split(" ");

	for (let i = 0; i < string.length; i++) {
		if (string[i] == "") {
			string.splice(i, 2);
			string[i] = "-" + string[i];
		}
	}

	let calc = document.createElement("calc");
	calc.style["opacity"] = `calc(${string.join(" ")})`;
	let calcResult = parseFloat(
		calc.style["opacity"].replace("calc(", "").replace(")", "")
	);
	calc.remove();

	return calcResult;
}
