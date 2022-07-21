const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
	const { url } = req.query
	if (!url)
		return res.status(404).json({
			succes: false,
			message: 'Url required!',
			error: `You need to send a url in the query parameter. e.g., https://${req.headers.host}?url=YOUR_URL`,
		})
	let _res
	try {
		_res = await axios.get(url, { headers: { ...req.headers } })
		res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.post('/', async (req, res, next) => {
	const { url } = req.query
	let _res
	try {
		_res = await axios.post(url, req.body, { headers: { ...req.headers } })
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})
app.put('/', async (req, res, next) => {
	const { url } = req.query
	let _res
	try {
		_res = await axios.put(url, req.body, { headers: { ...req.headers } })
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.delete('/', async (req, res, next) => {
	const { url } = req.query
	let _res
	try {
		_res = await axios.put(url, req.body, { headers: { ...req.headers } })
		return res.status(200).send(_res.data)
	} catch (error) {
		return res.status(500).json({ succes: false, message: 'Server error' })
	}
})

app.listen(process.env.PORT || 5000, err => {
	if (err) console.log(err)
	else console.log(`Server listening at port ${process.env.PORT || 5000}`)
})
