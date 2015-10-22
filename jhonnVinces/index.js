"use strict";

let xray = require('x-ray');
let fs   = require('fs');
let path = require('path');


let x    = new xray();

x(`http://www.jhonnvinces.com`, 'html',[{
	title             : 'title',
  author            : 'meta[name="author"]@content',
  description       : 'meta[name="description"]@content',
  stylesheets       : ['link[rel="stylesheet"]@href'],
  scripts           : ['script@src'],
  images            : ['img@src'],
  h1                : ['h1'],
  h2                : ['h2'],
}])
((err,results) => {

	if(!err) {
		 results.map((item) => {
        item.stylesheets = item.stylesheets.length;
        item.scripts     = item.scripts.length;
        item.images      = item.images.length;
        item.h1          = item.h1.length;
        item.h2          = item.h2.length;
        return item;
      })

		fs.writeFile(path.join(__dirname + "/results.json"), JSON.stringify(results, null, '\t'));
	}
	else{
		fs.writeFile(path.join(__dirname + "/results.json"), JSON.stringify(err, null, '\t'));
	}


});
