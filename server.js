const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
	const { url } = req.query
	let _res
	try {
		_res = await axios.get(url)
		return res.status(200).send(_res)
	} catch (error) {
		return res
			.status(500)
			.json({ succes: false, message: 'Server error', error })
	}
})

app.post('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let _res
	try {
		_res = await axios.post(url, data, { ...headers })
		return res.status(200).send(_res)
	} catch (error) {
		return res
			.status(500)
			.json({ succes: false, message: 'Server error', error })
	}
})
app.put('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let _res
	try {
		_res = await axios.put(url, data, { ...headers })
		return res.status(200).send(_res)
	} catch (error) {
		return res
			.status(500)
			.json({ succes: false, message: 'Server error', error })
	}
})

app.delete('/', async (req, res, next) => {
	const { url } = req.query
	const { data, headers } = req.body
	let _res
	try {
		_res = await axios.put(url)
		return res.status(200).send(_res)
	} catch (error) {
		return res
			.status(500)
			.json({ succes: false, message: 'Server error', error })
	}
})

app.listen(process.env.PORT || 5000, err => {
	if (err) console.log(err)
	else console.log(`Server listening at port ${process.env.PORT || 5000}`)
})
