const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
	const { url } = req.query
	var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	if (url) {
		// if (!pattern.test(url)) {
		// 	return res.status(404).json({
		// 		succes: false,
		// 		message: 'Invalid URL format!',
		// 		error: 'correct URL format:  https://www.google.com/',
		// 	})
		// }
	} else {
		return res.status(404).json({
			succes: false,
			message: 'Url required!',
			error: `You need to send a url in the query parameter. e.g., https://${req.headers.host}?url=YOUR_URL`,
		})
	}
	let _res
	try {
		_res = await axios.get(url)
		res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.post('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let headrs = {}
	if (headers) headrs = { ...headrs, headers }
	if (!data)
		return res.status(404).json({
			succes: false,
			message: 'data required!',
			error: 'You need to send an object of data: {} in your request',
		})

	let _res
	try {
		_res = await axios.post(url, data, { ...headrs })
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})
app.put('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let _res
	try {
		_res = await axios.put(url, data, { ...headers })
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.delete('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let _res
	try {
		_res = await axios.put(url)
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.listen(process.env.PORT || 5000, err => {
	if (err) console.log(err)
	else console.log(`Server listening at port ${process.env.PORT || 5000}`)
})
