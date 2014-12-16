import json

alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

def defaultdict(default = lambda: 0, keys = alphabet):
	return dict([(b,default()) for b in keys])

def normalize(freq):
	for key in freq:
		val = freq[key]
		total = sum(val.itervalues())
		if total>0:
			for k in val:
				v=val[k]
				val[k] = float(v)/total
		freq[key] = val

def twograms():
	f = open('ngrams/2grams.txt','r').read()
	output = open('2grams.js','w')


	lines = [k.split('\t') for k in f.split('\n')]

	freq = defaultdict(defaultdict)


	for line in lines:
		freq[line[0][0]].update( [ [line[0][1], int(line[1])] ] )

	normalize(freq)

	output.write('var twograms = ')
	output.write(json.dumps(freq, indent=4, sort_keys=True))

def threegramsSetup(postfix):
	f = open('ngrams/3grams.txt','r').read()
	output = open('threegrams_'+postfix+'.js','w')
	output.write('var threegrams_'+postfix+' = ')

	lines = [k.split('\t') for k in f.split('\n')]
	pairs = [a+b for a in alphabet for b in alphabet]
	freq = defaultdict(defaultdict, pairs)
	return lines, freq, output


def threegrams_end():
	lines, freq, output = threegramsSetup('end')

	for line in lines:
		firstandmiddle = line[0][:2]
		end = line[0][2]
	 	freq[firstandmiddle][end] = int(line[1])

	normalize(freq)
	output.write(json.dumps(freq, indent=4, sort_keys=True))

def threegrams_middle():
	lines, freq, output = threegramsSetup('middle')

	for line in lines:
		firstandlast = line[0][0] + line[0][2]
		middle = line[0][1]
	 	freq[firstandlast][middle] = int(line[1])

	normalize(freq)

	output.write(json.dumps(freq, indent=4, sort_keys=True))

def threegrams_start():
	lines, freq, output = threegramsSetup('start')

	for line in lines:
		middleandlast = line[0][1] + line[0][2]
		first = line[0][0]
	 	freq[middleandlast][first] = int(line[1])

	normalize(freq)

	output.write(json.dumps(freq, indent=4, sort_keys=True))


# twograms()
threegrams_start()
threegrams_middle()
threegrams_end()