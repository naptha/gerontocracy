var fonts = [
	// 'sans-serif', 'Times New Roman', 'Verdana', 'Arial', 'Helvetica', 'Helvetica Neue'

	'Comic Sans MS', 'Comic Neue','Chalkboard', 'Comic Neue Angular', 'Tekton Pro',
	'Arial Black', 'Impact',
	'sans-serif', 'Helvetica', 'Helvetica Neue', 'Arial', 'Verdana', 'Source Sans Pro', 'Arial Narrow', 'Avenir', 'Avenir Next', 'Gill Sans', 'Lucida Grande', 'Myriad Pro', 'Segoe UI', 'Tahoma', 'Trebuchet MS',
	'Times New Roman', 'Garamond', 'Athelas', 'Baskerville', 'Chaparral Pro', 'CMU Serif', 'Cochin', 'Georgia', 'Marion', 'Minion Pro', 'Palatino', 
	'American Typewriter', 'Andale Mono', 'Arial Rounded',
	'Futura', 'Geneva', 
	'Hoefler Text', 'Menlo',
	'Hobo Std', 'Didot',
	'Brandon Grotesque',
	'Charter',
	'Courier', 'Courier New', 'DIN Alternate', 'DIN Condensed',
	'Kozuka Gothic Pro', 'Kozuka Mincho Pro', 'Letter Gothic Std', 'Marker Felt', 'Monaco',
	'Noteworthy', 'Optima', 'Prestige Elite Std', 'PT Serif', 'Seravek', 'Skia',
	'Superclarendon', 'Thonburi', 'Adobe Caslon Pro', 'Adobe Arabic', 'Adobe Song Std', 'Adobe Fangsong Std', 'Adobe Garamond Pro', 'Adobe Gothic Std', 
	'Aaargh', 'Alegreya Sans', 'Aller', 'Aller Light', 'Caviar Dreams', 'Existence', 'Josefin Sans', 'Lato', 'Open Sans', 'Quicksand', 'Roboto', 'Roboto Condensed', 'Source Code Pro', 'Source Serif Pro', 'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'Ubuntu Titling'
];
// fonts = ['Iowan Old Style']
// fonts = ['Arial Black', 'Impact']
var symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?():;&%$@#+-=*<>{}[]/"\''.split('');
var charset = "fullalpha+m+num+symbol+ext-tight-full";

var DIM = 24;
var canvas = document.createElement('canvas');
canvas.width = canvas.height = DIM;
var ctx = canvas.getContext('2d');
ctx.textBaseline = 'bottom';
ctx.textAlign = 'center';

function r(range){ return 2 * (Math.random() - 0.5) * range }

function sample_training_instance(){
	var fonfam = fonts[Math.floor(fonts.length * Math.random())]
	var label = Math.floor(symbols.length * Math.random())
	var pre = Math.floor(symbols.length * Math.random()),
      	post = Math.floor(symbols.length * Math.random());

	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, DIM, DIM);
	ctx.fillStyle = 'white'
	ctx.font = (100 * Math.floor(1 + 3 * Math.random())) + ' ' + (22 + r(2))+'px "'+fonfam+'"'

	ctx.save()
	ctx.translate(24 / 2 + r(4), 24);
	// ctx.rotate(r(0.1))
	ctx.letterSpacing = 4

	var w = ctx.measureText(symbols[label]).width,
		wa = ctx.measureText(symbols[pre]).width,
		wb = ctx.measureText(symbols[post]).width;

	var baseline = 2 * Math.random();

	ctx.fillText(symbols[label],  0,                                  r(0.1) + baseline);
	ctx.fillText(symbols[pre],   -(w + wa - 2 + 6 * Math.random())/2, r(0.1) + baseline);
	ctx.fillText(symbols[post],   (w + wb - 2 + 6 * Math.random())/2, r(0.1) + baseline);
	ctx.restore()

	var p = ctx.getImageData(0, 0, DIM, DIM).data;
	var x = new convnetjs.Vol(DIM, DIM, 1, 0);
	var W = DIM * DIM;
	for(var i = 0; i < W; i++) {
		x.w[i] = p[i * 4]/255.0;
	}
	return {
		x: x,
		font: fonfam,
		label: label,
		isval: Math.random() > 0.9
	}
}

// function sample_training_instance(){
//   var label = Math.floor(classes_txt.length * Math.random());
//   var pre = Math.floor(classes_txt.length * Math.random()),
//       post = Math.floor(classes_txt.length * Math.random());

//   // var famfam = famlist[label];
//   // var fonfam = fams[famfam][Math.floor(fams[famfam].length * Math.random())];
//   var fonfam = fonts[Math.floor(fonts.length * Math.random())]

//   var ctx = document.getElementById('blah').getContext('2d');
//   ctx.fillStyle = 'black'
//   ctx.fillRect(0, 0, 24, 24);
//   ctx.font = (21 + r(2))+'px "' + fonfam + '"'
//   ctx.textBaseline = 'middle'
//   ctx.textAlign = 'center'
//   // ctx.font = (100 * Math.floor(1 + 8 * Math.random())) + ' ' + (22 + r(3))+'px "'+fonfam+'"'
//   // // ctx.font = (23 + r(3))+'px "'+fonfam+'"'
//   ctx.fillStyle = 'white'
//   ctx.save()
//   ctx.translate(24 / 2, r(1))
//   // ctx.translate(13 + r(2), 12 + r(1))
//   ctx.rotate(r(0.1));
//   // // ctx.fillText(letters[label], 0, 0);
  
//   // var letter = letters[label][Math.floor(letters[label].length * Math.random())]
//   // // var letter = letters[label];
//   ctx.fillText(letters[pre] + letters[label] + letters[post], 0, 10);

//   ctx.restore()


//   return {
//     x: x, 
//     label: label, 
//     isval: Math.random() > 0.9
//   };
// }