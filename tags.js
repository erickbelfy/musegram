'use strict';

var http = require('http');

var response = null;
var ig = require('instagram-node').instagram();
ig.use({
			client_id: '48da50c666fb4516bb21f11d73f4d97d',
			client_secret: 'd8105f9e7e6d46c28be730b72847625d' });

var onResourceLoaded = function(err, medias, pagination, limit) {
	response.write(renderPage(medias));
	nextPagination(pagination);
	console.log(limit);
};

function onRequest(req, res) {
	response = res;
	res.writeHead(200, {'content-type': 'text/html'});
	ig.tag_media_recent('rock', onResourceLoaded );
}

function nextPagination(pagination) {
	pagination.next(onResourceLoaded);
}

function renderPage(medias) {
	var renderHTML = '';

	for (var x = 0, len =  medias.length; x < len; x++) {
		renderHTML += '<img src="' + medias[x].images.low_resolution.url + '" />';
	}
	return renderHTML;
}

http.createServer(onRequest).listen(8888);
console.log('server started');
