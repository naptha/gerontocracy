var ascii = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?():;&%$@#+-=*<>{}[]/\\~"\''.split('');
var symbols = ascii;

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


fonts = common_fonts

function gen(){
var fonfam = fonts[Math.floor(fonts.length * Math.random())]
// fonfam = 'Marion'
// fonfam  = 'Raanana'
var size = (9 + 70 * Math.random())
ctx.font = (100 * Math.floor(1 + 7 * Math.random())) + ' ' + size +'px ' + '"' +  fonfam + '"'

var label = Math.floor(symbols.length * Math.random())

// label = symbols.indexOf('M')
var text = 'ayb';

var m = ctx.measureText(text);
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, c.width, c.height)

function r(range){ return 2 * (Math.random() - 0.5) * range }

var w = ctx.measureText(symbols[label]).width;
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

ctx.textAlign = 'center';
ctx.fillText(symbols[label],  0,              r(0.1));


var edgesub = Math.floor(Math.random() * 4)
// var strokewidth = ctx.measureText('l').width;
// console.log(strokewidth)
if(size > 60 && edgesub > 0){
	ctx.strokeStyle = 'black'
	if(boldfonts.indexOf(fonfam) == -1){
		edgesub = 1
	}
	ctx.lineWidth = edgesub
	ctx.strokeText(symbols[label],  0, r(0.1));
}

ctx.restore()
var s = 16 / m.actualBoundingBoxAscent
dtx.fillStyle = 'black'
dtx.fillRect(0, 0, d.width, d.height)

dtx.drawImage(c, -100 * s + 12 + r(Math.min(w * s / 6, 22 - w * s)), r(2), c.width * s, c.height * s)	

return {
	data: dtx.getImageData(0, 0, 24, 24),
	label: label,
	font: fonfam
}
}



// var charset = "ascii-resized-common-noise";
var charset = "ascii-common-noise";


function sample_training_instance(){
	var merp = gen()
	var p = merp.data.data;
	var x = new convnetjs.Vol(DIM, DIM, 1, 0);
	var W = DIM * DIM;
	for(var i = 0; i < W; i++) {
		x.w[i] = p[i * 4]/255.0;
		if(Math.random() < 0.08){
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