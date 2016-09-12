const express          = require('express');
const co               = require('co');
const router           = express.Router();
const fs               = require('fs-extra');

router.get('/',(req,res)=>{
	res.sendFile(process.cwd() + '/dist/apps/account/index.html');
});

module.exports = router;