"use strict";

let xray = require('x-ray');
let fs   = require('fs');
let path = require('path');


let x    = new xray();
let num  = 177;

x(`http://tympanus.net/codrops/collective/collective-${num}`, '.ct-coll-item',[{
	title : 'h2',
	content : 'p',
	img :  'article img@src',
	url : 'article a@href'
}])
.paginate('.ct-coll-nav-bottom-next a@href')
.limit(10)
((err,results) => {

	if(!err) {
		results = results.filter((result) => {
			return result.title !== undefined;
		});

		fs.writeFile(path.join(__dirname + "/results.json"), JSON.stringify(results, null, '\t'));
	}
	else{
		fs.writeFile(path.join(__dirname + "/results.json"), JSON.stringify(err, null, '\t'));
	}

});
