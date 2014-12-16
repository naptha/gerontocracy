function get(object, key){
	return object[key.toUpperCase()] || 0
}

function letter1 (possiblefirstletters) {
	return possiblefirstletters
		.split("")
		.sort(function(a,b){
			return -(get(onegrams,a.toUpperCase())-get(onegrams,b.toUpperCase()))
		})[0]
}

function letter2 (firstletter, possiblenextletters) {
	var probs = twograms[firstletter.toUpperCase()]
	return nextletters = possiblenextletters
		.split("")
		.sort(function(a,b){
			return get(probs,b)-get(probs,a)
		})[0]
}

function lastletter (previoustwo, possibilities) {
	var probs = threegrams_end[previoustwo.toUpperCase()]
	return possibilities
		.split("")
		.sort(function(a,b){
			return get(probs,b)-get(probs,a)
		})
		.map(function(a){
			return [a, get(probs,a)]
		})[0]
}

function middleletter (letterbefore, possibilities, letterafter) {
	var probs = threegrams_middle[(letterbefore+letterafter).toUpperCase()]
	return possibilities.split('')
		.sort(function(a,b){
			return get(probs,b)-get(probs,a)
		})
		.map(function(a){
			return [a, get(probs,a)]
		})[0]
}

function firstletter (possibilities, twoafter) {
	var probs = threegrams_middle[twoafter.toUpperCase()]
	return possibilities.split('')
		.sort(function(a,b){
			return get(probs,b)-get(probs,a)
		})
		.map(function(a){
			return [a, get(probs,a)]
		})[0]
}

function probability(letters, letter, index) {
	return [
			letter,
			lastletter(letters[index-2]+letters[index-1],letter)[1] *
			middleletter(letters[index-1],letter,letters[index+1])[1] *
			firstletter(letter,letters[index+1]+letters[index+2])[1]
		]
}

function bestpossibility(letters, index){
	var alphabet = 'abcdefghijklmnopqrstuvwxyz'

	var probofcurrent = probability(letters, letters[index], index)[1]

	return alphabet.split('').map(function(letter){
		var base = probability(letters, letter, index)
		return [base[0], base[1]-probofcurrent]
	})
	.sort(function(a,b){
		return b[1]-a[1]
	})[0]
}

function fixword (word) {
	var letters = word.split('')
	var possibilities = []
	for(var i = 2; i< letters.length-2; i++){
		possibilities.push([bestpossibility(letters, i),i])
		console.log('hello',bestpossibility(letters, i),i)
	}
	var replacement = possibilities.sort(function(a,b){
		return b[0][1]-a[0][1]
	})[0]
	letters[replacement[1]] = [replacement[0][0]]
	return letters.join('')
}

function fullword (possibilityarray) {
	var full = letter1(possibilityarray.shift())
	if(possibilityarray.length>1){
		full += letter2(full, possibilityarray.shift())
		while(possibilityarray.length>0){
			full += lastletter(full.slice(-2), possibilityarray.shift())[0]
		}
	}
	return full.toLowerCase()
}







