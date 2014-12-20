var symbols = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?():;&%$@#+-=*<>{}[]/\\~"\''.split('');

var ctx = c.getContext('2d')
var dtx = d.getContext('2d')


function gen(){
var fonfam = fonts[Math.floor(fonts.length * Math.random())]
// fonfam = 'Marion'
// fonfam  = 'Raanana'
var size = (9 + 70 * Math.random())
ctx.font = '800 ' + size +'px ' + '"' +  fonfam + '"'

var label = Math.floor(symbols.length * Math.random())
var pre = Math.floor(symbols.length * Math.random()),
  	post = Math.floor(symbols.length * Math.random());
// label = symbols.indexOf('M')
var text = 'ayb';

var m = ctx.measureText(text);
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, c.width, c.height)

function r(range){ return 2 * (Math.random() - 0.5) * range }

var w = ctx.measureText(symbols[label]).width,
	wa = ctx.measureText(symbols[pre]).width,
	wb = ctx.measureText(symbols[post]).width;

// ctx.fillStyle = 'red'
// ctx.fillRect(100, 0, 1, 100)

ctx.fillStyle = 'white'
// ctx.fillText(text, 0, m.fontBoundingBoxAscent - m.fontBoundingBoxDescent)

// var baseline = 2 * Math.random();
var baseline = 0;

ctx.save()
// ctx.translate(100, 1.2 * (m.fontBoundingBoxAscent - m.fontBoundingBoxDescent));
ctx.translate(100, 1.2 * (m.actualBoundingBoxAscent));
ctx.rotate(r(0.03))

var pregap = Math.random() * wa,
	postgap = Math.random() * wb;

ctx.textAlign = 'center';
ctx.fillText(symbols[label],  0,              r(0.1));
ctx.fillText(symbols[pre],   -(w + wa - w / 4 + pregap)/2, r(0.1));
ctx.fillText(symbols[post],   (w + wb - w / 4 + postgap)/2, r(0.1));


var edgesub = Math.floor(Math.random() * 4)
// var strokewidth = ctx.measureText('l').width;
// console.log(strokewidth)
if(size > 60 && edgesub > 0){
ctx.strokeStyle = 'black'
if(boldfonts.indexOf(fonfam) == -1){
	edgesub = 1
}
ctx.lineWidth = edgesub
ctx.strokeText(symbols[label],  0,              r(0.1));
ctx.strokeText(symbols[pre],   -(w + wa - w / 4 + pregap)/2, r(0.1));
ctx.strokeText(symbols[post],   (w + wb - w / 4 + postgap)/2, r(0.1));
// console.log(edgesub)
}

ctx.restore()
var s = 16 / m.actualBoundingBoxAscent
dtx.fillStyle = 'black'
dtx.fillRect(0, 0, d.width, d.height)

if(Math.random() < 0.97){
	dtx.drawImage(c, -100 * s + 12 + r(Math.min(w * s / 4, 22 - w * s)), 0, c.width * s, c.height * s)	
}else{
	label = 0; // space!
	if(Math.random() < 0.5){
		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)
	}else{
		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)	
	}
}


// dtx.fillStyle = 'green'
// dtx.fillRect(12, 0, 1, 24)

return {
	data: dtx.getImageData(0, 0, 24, 24),
	label: label,
	font: fonfam
}
}


var charset = "ascii-resized";


function sample_training_instance(){
	var merp = gen()
	var p = merp.data.data;
	var x = new convnetjs.Vol(DIM, DIM, 1, 0);
	var W = DIM * DIM;
	for(var i = 0; i < W; i++) {
		x.w[i] = p[i * 4]/255.0;
	}
	return {
		x: x,
		font: merp.font,
		label: merp.label,
		isval: Math.random() > 0.9
	}
}