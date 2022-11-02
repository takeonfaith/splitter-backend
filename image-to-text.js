const fetch = require('node-fetch')
fs = require('fs');

const imageToText = async (url) => {
	let myHeaders = new fetch.Headers();
	myHeaders.append("apikey", process.env.API_LAYER_KEY);

	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	};

	const data = await fetch(`https://api.apilayer.com/image_to_text/url?url=${url}`, requestOptions)
	const result = await data.json();
	console.log(result);
	fs.writeFile('./text-from-image.txt', JSON.stringify(result), function (err, data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
	})
	return data
}

module.exports = imageToText



