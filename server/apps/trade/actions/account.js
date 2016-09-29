const express          = require('express');
const co               = require('co');
const router           = express.Router();
const fs               = require('fs-extra');

router.get('/',(req,res)=>{
	res.sendFile(process.cwd() + '/dist/apps/account/index.html');
});

router.post('/',(req,res)=>{
	console.log(req.body);
	res.api({},{'msg':'success',code:1});
});

module.exports = router;