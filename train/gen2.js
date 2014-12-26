var ascii = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?():;&%$@#+-=*<>{}[]/\\~"\''.split('');

var symbols = '_A|'

var ctx = c.getContext('2d')
var dtx = d.getContext('2d')

var common_fonts = ["Adobe Garamond Pro",
"Arial",
"Arial Black",
"Arimo",
"Avenir",
"Avenir Next",
"Clear Sans",
"Comic Sans MS",
"Courier",
"Courier New",
"DejaVu Sans",
"DejaVu Sans Mono",
"Droid Sans",
"Futura",
"Geneva",
"Georgia",
"Helvetica",
"Helvetica Neue",
"Impact",
"Lato",
"Lucida Grande",
"Menlo",
"Monaco",
"Myriad Pro",
"Open Sans",
"PT Mono",
"PT Sans",
"PT Serif",
"Roboto",
"Roboto Condensed",
"Segoe UI",
"Source Sans Pro",
"Source Serif Pro",
"Tahoma",
"Times",
"Times New Roman",
"Trebuchet MS",
"Verdana",
];

function gen(){
var fonfam = fonts[Math.floor(fonts.length * Math.random())]
// fonfam = 'Marion'
// fonfam  = 'Raanana'
var size = (9 + 70 * Math.random())
ctx.font = (100 * Math.floor(1 + 7 * Math.random())) + ' ' + size +'px ' + '"' +  fonfam + '"'

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

// if(Math.random() < 0.97){
	dtx.drawImage(c, -100 * s + 12 + r(Math.min(w * s / 4, 22 - w * s)), r(4), c.width * s, c.height * s)	
// }else{
// 	label = 0; // space!
// 	if(Math.random() < 0.5){
// 		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)
// 	}else{
// 		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)	
// 	}
// }


// dtx.fillStyle = 'green'
// dtx.fillRect(12, 0, 1, 24)

return {
	data: dtx.getImageData(0, 0, 24, 24),
	label: label,
	font: fonfam
}
}



function gen_wumbo(){
var fonfam = fonts[Math.floor(fonts.length * Math.random())]
// fonfam = 'Marion'
// fonfam  = 'Raanana'
var size = (9 + 70 * Math.random())
ctx.font = (100 * Math.floor(1 + 7 * Math.random())) + ' ' + size +'px ' + '"' +  fonfam + '"'

var middle = Math.floor(ascii.length * Math.random());
if(Math.random() < 0.05){
	middle = 0;  // make space disproportionately common
}
var pre = Math.floor(ascii.length * Math.random()),
  	post = Math.floor(ascii.length * Math.random());
// middle = ascii.indexOf('M')
var text = 'ayb';

var m = ctx.measureText(text);
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, c.width, c.height)

function r(range){ return 2 * (Math.random() - 0.5) * range }

var w = ctx.measureText(ascii[middle]).width,
	wa = ctx.measureText(ascii[pre]).width,
	wb = ctx.measureText(ascii[post]).width;

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
ctx.fillText(ascii[middle],  0,              r(0.1));
ctx.fillText(ascii[pre],   -(w + wa - w / 4 + pregap)/2, r(0.1));
ctx.fillText(ascii[post],   (w + wb - w / 4 + postgap)/2, r(0.1));


var edgesub = Math.floor(Math.random() * 4)
// var strokewidth = ctx.measureText('l').width;
// console.log(strokewidth)
if(size > 60 && edgesub > 0){
ctx.strokeStyle = 'black'
if(boldfonts.indexOf(fonfam) == -1){
	edgesub = 1
}
ctx.lineWidth = edgesub
ctx.strokeText(ascii[middle],  0,              r(0.1));
ctx.strokeText(ascii[pre],   -(w + wa - w / 4 + pregap)/2, r(0.1));
ctx.strokeText(ascii[post],   (w + wb - w / 4 + postgap)/2, r(0.1));
// console.log(edgesub)
}

ctx.restore()
var s = 16 / m.actualBoundingBoxAscent
dtx.fillStyle = 'black'
dtx.fillRect(0, 0, d.width, d.height)

var label;

if(Math.random() < 0.5 && middle != 0){

	label = 2;
	// middle = 0; // space!
	if(Math.random() < 0.5){
		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)
	}else{
		dtx.drawImage(c, -100 * s + 12 - (w * s / 2 + (postgap / 2 * s) * Math.random()), 0, c.width * s, c.height * s)	
	}
}else{

	label = 1;
	
	if(middle == 0) label = 0;

	dtx.drawImage(c, -100 * s + 12 + r(Math.min(w * s / 4, 22 - w * s)), r(4), c.width * s, c.height * s)	
}


// dtx.fillStyle = 'green'
// dtx.fillRect(12, 0, 1, 24)

return {
	data: dtx.getImageData(0, 0, 24, 24),
	label: label,
	font: fonfam
}
}


// var charset = "ascii-resized-common-noise";
var charset = "ascii-cleft-noise";


function sample_training_instance(){
	var merp = gen_wumbo()
	var p = merp.data.data;
	var x = new convnetjs.Vol(DIM, DIM, 1, 0);
	var W = DIM * DIM;
	for(var i = 0; i < W; i++) {
		x.w[i] = p[i * 4]/255.0;
		if(Math.random() < 0.05){
			x.w[i] = Math.random();
		}
	}
	return {
		x: x,
		font: merp.font,
		label: merp.label,
		isval: Math.random() > 0.9
	}
}