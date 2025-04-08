// File: src/Compenents/Algorithm/nqueen.jsx
import { delay, disableAllButtons, MakeDelay } from "../Utils/utils";

// Recursive helper function
async function nqueenHelper(grid, i, n, col, leftD, rightD) {
	let c = i * n;

	if (i === n) {
		return true; // All queens placed
	}

	for (let j = 0; j < n; j++) {
		let l = c + j;
		let cell = grid[l];
		let originalColor = cell.style.background;

		// Check if the position is safe
		if (!col[j] && !leftD[i - j + n - 1] && !rightD[i + j]) {
			col[j] = leftD[i - j + n - 1] = rightD[i + j] = true;

			cell.style.background = "green";
			cell.innerHTML = "♕";
			await MakeDelay(delay);

			if (await nqueenHelper(grid, i + 1, n, col, leftD, rightD)) {
				return true;
			}

			// Backtrack
			await MakeDelay(delay);
			cell.style.background = "red";
			await MakeDelay(delay);
			cell.innerHTML = "";
			cell.style.background = originalColor;

			col[j] = leftD[i - j + n - 1] = rightD[i + j] = false;
		} else {
			await MakeDelay(delay);
			cell.style.background = "red";
			await MakeDelay(delay);
			cell.style.background = originalColor;
		}
	}

	return false; // No valid placement
}

// Main function
export async function Nqueen() {
	const button = document.getElementById("nqueen");
	if (!button) return;

	disableAllButtons(true);
	button.className = "btndisabled";

	const grid = document.querySelectorAll(".element-block");
	if (!grid || grid.length === 0) {
		disableAllButtons(false);
		return;
	}

	let n = Math.sqrt(grid.length); // Grid is flattened

	let col = new Array(n).fill(false);
	let leftD = new Array(2 * n - 1).fill(false);
	let rightD = new Array(2 * n - 1).fill(false);

	await nqueenHelper(grid, 0, n, col, leftD, rightD);

	button.className = "btn";
	disableAllButtons(false);
}
