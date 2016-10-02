'use strict'

const router = require('express').Router();

const multerConfig = require('../../config/multer.js');
const imageProcessor = require('../../model/image.js');
const unzipper = require('../../model/zip.js');
const db = require('../../model/database.js');

router.use((req, res, next)=>{
	next();
})

router.get('/:id', (req, res)=>{
	db.read(req.params.id, (result)=>{
		console.log(result);
		res.send('<h1>Original</h1><img src='+result+'>'+
				 '<h1>Thumbnail Big</h1><img src='+result.split('.')[0]+'_thumb-big.'+result.split('.').pop()+'>'+
				 '<h1>Thumbnail Small</h1><img src='+result.split('.')[0]+'_thumb-small.'+result.split('.').pop()+'>')
	})
})

router.post('/image', multerConfig.image().single('file'), (req, res)=>{
	console.log(req.file)
	res.send(imageProcessor.process(req.file))
	console.log("processed")
});

router.post('/zip', multerConfig.zip().single('file'), (req, res)=>{
	console.log(req.file);
	res.send(unzipper.process(req.file));
});


module.exports = router;