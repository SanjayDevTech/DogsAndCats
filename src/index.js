var model;

(async () => {
	model = await tf.loadLayersModel('/model.json');
})();

const classes = ['Cat', 'Dog'];

function btnClick() {
	const source = document.getElementById('source');
	const custom = document.getElementById('custom');
	const ctx = custom.getContext('2d');
	const result = document.getElementById('result');
	
	ctx.drawImage(source, 0, 0);

	// const mydataURL = myCanvas.toDataURL('image/jpg');
	// console.log(source);

	const image = tf.browser.fromPixels(custom);

	const prediction = model.predict(image.expandDims(0));
	prediction.array().then((array) => {
		const pred = array[0];
		const index = pred.indexOf(Math.max(...pred));
		result.innerText = classes[index] || "Nothing";
	});
//	let i = prediction.indexOf(Math.max(...prediction[0]));

	//result.innerText = classes[i] || "Nothing";


}

document.getElementById('btn').addEventListener('click', btnClick);
