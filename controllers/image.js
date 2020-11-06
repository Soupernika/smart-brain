const clarifai=require('clarifai')

const app = new Clarifai.App({
 apiKey: 'ff850dac50154d768a93cde6b0126c89'
});

const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("Unable to connect to API"))
}


const handleImage = (req,res,db) => {
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("OOPS..NOT FOUND"))
}

module.exports = {
	handleImage,
	handleApiCall
}