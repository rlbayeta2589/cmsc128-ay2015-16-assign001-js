## numerus.js

### HAVE SOME [`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")
[`        DEMO        `](https://rlbayeta2589.github.io/cmsc128-ay2015-16-assign001-js "numerus.js DEMO")

#### Assign 001: Programming a Number Library

---
##### Outline
```javascript
numerus = {
	words
		==>		array of words corresponding the numbers
					in the ones and tens

		To get the word counter part of a number
			ones: 	numerus.words.ones[3] value is the string "three"
			tens:   numerus.words.tens[3] value is the string "thirty"

		Numbers from 10 to 19 are special and is place in the ones component
			of numerus.words

	convertTrio
		==>		convert a three digit number to words

		123123 >> "one hundred twenty three thousand one hundred twenty three"

		Numbers in the hundreds are used wherever it is in the thousands,
			millions etc, thefore this function was created

	numToWords
		==>		convert a number up ranging from zero to one million to words

		The number is divided into three groups, the million, thousand, and hundred
			groups by repeated division of 1000.

			Ex.
				987654321  >> 987 , 654 , 321

				|	data/1000	|	data%1000	|			READ AS				|	/\
				|---------------|---------------|-------------------------------|  /  \
				|	987654		|		321		|	three hundred twenty one	|	||
				|	987			|		654		|	six hundred fifty four		|	||
				|	0			|		987		|	nine hundred eighty seven	|	||	
		
		The way we read these three numbers are the same. The difference is they are
			followed by the name of the group they belong, so to convert this groups
			function convertTrio will be used.

	wordsToNum
		==>		convert a series of words to its number counterpart

		The words are split by space to create a collection of words.

			Ex.
				one hundred twenty three >> 123

		The collection of words are traverse and convert each of the word to its number
			counterpart by getting its index in numerus.words array.
		When the words 'hundred', 'thousand', and 'million' are encountered the value of
			the number is multiplied by 100, 1000, 1000000 respectively.

	wordsToCurrency
		==>		convert a series of words to its number counterpart and
					put a currency sign before it
		
		Use the wordsToNum function and append the result to the currency type.

	numberDelimited
		==>		separate a number by a given delimiter and the number of jumps when
					the delimiter will appear (from right most going to left most digit)

			Ex.
				number = 123456789		====\\
				delimiter = ','			======>	 1,23,45,67,89
				jumps = 2				====//

}

```
---
###### Reference of Ideas

<table>
<tr>
	<th><a href="http://stackoverflow.com/questions/5529934">Array of Words</a></th>
	<th>Others</th>
</tr>
<tr>
	<td>
	<a href="http://stackoverflow.com/questions/5529934">
		<img src="http://i.imgur.com/pszAeGh.png" alt="STACK OVERFLOW" width="200" height="50" border="10"/>
	</a><br/>
	</td>
	<td>
	<br/><img src="http://vignette2.wikia.nocookie.net/le-miiverse-resource/images/b/b1/Imagination-1-.gif/revision/latest?cb=20151212152505" alt="IMAGINATION" width="200" height="200" border="10" /><br/>
	</td>
</tr>
</table>
