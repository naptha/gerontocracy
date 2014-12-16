if(typeof console == 'undefined') console = {};

;['log', 'time', 'timeEnd'].forEach(function(fn){
    if(typeof console[fn] == 'undefined') console[fn] = function(){};
})

/**
 * Display an image in the console.
 * @param  {string} url The url of the image.
 * @param  {int} scale Scale factor on the image
 * @return {null}
 * http://dunxrion.github.io
 */
console.image = function(url, log) {
	var img = new Image();
	function getBox(width, height) {
		return {
			string: "+",
			style: "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
		}
	}
	img.onload = function() {
		var dim = getBox(this.width, this.height);
		// console.log(log, url)
		console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size: " + (this.width) + "px " + (this.height) + "px; color: transparent;");
	};

	img.src = url;
};
