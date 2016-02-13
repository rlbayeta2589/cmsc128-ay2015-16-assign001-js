/*###############################################################################################/
*
*	numerus.js
*
*	Author : Bayeta Reynaldo, III
*			 CMSC128 AB-1L
*			 https://github.com/rlbayeta2589
*
*################################################################################################/
*
* 	Reference of ideas
* 		array of words			=> http://stackoverflow.com/questions/5529934
*		others					=> my imagination
*
*################################################################################################/
*
*	Outline
*
*		numerus = {
*			words 
*				==>		array of words corresponding the numbers
*							in the ones and tens
*
*				To get the word counter part of a number
*					ones: 	numerus.words.ones[3] value is the string "three"
*					tens:   numerus.words.tens[3] value is the string "thirty"
*
*				Numbers from 10 to 19 are special and is place in the ones component
*					of numerus.words
*
*			convertTrio
*				==>		convert a three digit number to words
*
*				123123 >> "one hundred twenty three thousand one hundred twenty three"
*
*				Numbers in the hundreds are used wherever it is in the thousands,
*					millions etc, thefore this function was created
*
*			numToWords
*				==>		convert a number up ranging from zero to one million to words
*
*				The number is divided into three groups, the million, thousand, and hundred
*					groups by repeated division of 1000.
*
*					Ex.
*						987654321  >> 987 , 654 , 321
*						+===============+===============+===============================+
*						|	data/1000	|	data%1000	|			READ AS				|	/\
*						+===============+===============+===============================+  /  \
*						|	987654		|		321		|	three hundred twenty one	|	||
*						|	987			|		654		|	six hundred fifty four		|	||
*						|	0			|		987		|	nine hundred eighty seven	|	||	
*						+===============+===============+===============================+	||
*				
*				The way we read these three numbers are the same. The difference is they are
*					followed by the name of the group they belong, so to convert this groups
*					function convertTrio will be used.
*
*			wordsToNum
*				==>		convert a series of words to its number counterpart
*
*				The words are split by space to create a collection of words.
*
*					Ex.
*						one hundred twenty three >> 123
*
*				The collection of words are traverse and convert each of the word to its number
*					counterpart by getting its index in numerus.words array.
*				When the words 'hundred', 'thousand', and 'million' are encountered the value of
*					the number is multiplied by 100, 1000, 1000000 respectively.
*
*			wordsToCurrency
*				==>		convert a series of words to its number counterpart and
*							put a currency sign before it
*				
*				Use the wordsToNum function and append the result to the currency type.
*
*			numberDelimited
*				==>		separate a number by a given delimiter and the number of jumps when
*							the delimiter will appear (from right most going to left most digit)
*
*					Ex.
*						number = 123456789		====\\
*						delimiter = ','			======>	 1,23,45,67,89
*						jumps = 2				====//
*
*		}
*
*################################################################################################*/
'use strict';

var numerus = {

	words : {
		ones : [null	, 'one'		, 'two'		, 'three'	, 'four'	, 'five'	,
				'six'	, 'seven'	, 'eight'	, 'nine'	, 'ten'		,'eleven'	,
				'twelve', 'thirteen', 'fourteen', 'fifteen'	, 'sixteen'	, 'seventeen',
				'eighteen', 'nineteen'
				],
		tens : [null	, null		, 'twenty'	, 'thirty'	, 'fourty'	, 'fifty'	,
				'sixty'	, 'seventy'	, 'eighty'	, 'ninety'
				]
	},

	convertTrio : function(data){
		var input = Number(data),
			numbers = [],
			words = "",
			convert,
			index;

		if(input==0){										//checkers
			return "";
		}

		if(input.toString().length > 3){
			return "Error in converting number";
		}

		while(input > 0){									//dividing the number
			numbers.unshift(input%10);						// to groups
			input = parseInt(input/10);
		}
															// 0-hundreds 1-tens 2-ones
		index = 3 - numbers.length;							//	get the starting index
															//	 that will determine
		for (var i = 0 ; i < numbers.length; i++) {			// 	 the number of digits
			convert = numerus.words.ones[numbers[i]];
															//in the tens index
			if(index==1){									// if the second digit is one
				if(numbers[i]==1){							// in falls between 10-19
					convert = numerus.words.ones[numbers[i]*10 + numbers[i+1]];
					i+=1;
				}else{
					convert = numerus.words.tens[numbers[i]];
				}
			}
			words += (convert || '') + " ";
			words = (index==0 ? words + "hundred " : words);//if the index is zero add
			index++;										// the word hundreds
		};

		return words.trim();								//return
	},

	numToWords : function(data){
		var regExCheck = new RegExp('^\\d+$'),
			input = Number(data),
			numbers = [],
			words = "",
			convert,
			index;

		if(!data){											//checkers
			return "Incomplete request data";
		}

		if(!regExCheck.test(data)){							//check the regex
			return "Invalid Input";
		}

		if(!input){											//catch the zero case
			return "zero";
		}

		if(input > 1000000){								//catch if number > 1million
			return "Number must be less than or equal to 1 million"
		}

		while(input > 0){									//dividing the number
			numbers.unshift(input%1000);					//	to groups
			input = parseInt(input/1000);
		}

															// 0-millions 1-thousand 2-hundreds
		index = 3 - numbers.length;							//	get the starting index
															//	 that will determine
		for (var i = 0 ; i < numbers.length; i++) {			// 	 the number of groups
			convert = numerus.convertTrio(numbers[i]);
			words += convert + " ";

			if(index == 0 && convert) words += "million ";  // add "million" if index==0
			if(index == 1 && convert) words += "thousand "; // add "thousand" if index==1
			index ++;
		};

		return words.trim();								//return

	},

	wordsToNum : function(data){
		var ones = numerus.words.ones,
			tens = numerus.words.tens,
			lower_state="",									//this states are just flags
			upper_state="",									// to determine what group was
			words = [],										// previously checked
			total = 0,
			num = 0,
			digit1 = 0,
			digit2 = 0;

		if(!data){											//checkers
			return "Incomplete request data";
		}

		if(data=="zero"){									//catch the zero case
			return '0';
		}

		words = data.trim().toLowerCase().split(' ');		//split the words

		while(words.length){
			temp = words.shift();

			if(temp == "hundred" || temp=="thousand" || temp== "million"){
				
				if(lower_state=="") return "Invalid input";
				
				if(temp=="hundred"){
					if(upper_state=="hundred") return "Invalid input";
					if((total > 9 && total <100)||total<1) return "Invalid input";
					upper_state = "hundred";
					total += (num * 100) - num;				//hundred state
					num = 0;
				}else if(temp=="thousand"){
					if(upper_state=="thousand") return "Invalid input";
					upper_state = "thousand";
					total = total * 1000;					//thousand state
					num = 0;
				}else if(temp=="million"){
					if(upper_state=="thousand" || upper_state=="million") return "Invalid input";
					upper_state = "million";
					total = total * 1000000;				//,illion state
					num = 0;
				}

				lower_state = (temp=="hundred" ? "hundred" : "");

			}else{
				digit1 = ones.indexOf(temp);				//get the word equivalent in the ones
				digit2 = tens.indexOf(temp);				//get the word equivalent in the tens

				if(digit1==-1 && digit2==-1){				//if the word do not exist in the array
					return "Invalid input";					//	return error statement
				}else if(digit2!=-1){
					if(lower_state=="tens" || lower_state=="ones") return "Invalid input";
					lower_state = "tens";
					num = digit2 * 10;						//multipy by 10 if it is in the second
				}else{										//digit
					if(lower_state=="ones" || (num>0 && digit1>9)) return "Invalid input";
					lower_state="ones";
					num = digit1;
				}

				total += num;								//add to the accumulator
			}

		}

		if(total > 1000000){								//if the result is greater than 1 million
			return "Number must be less than or equal to 1 million"
		}

		return total;										//return
	},

	wordsToCurrency : function(data,type){
		var money_types = ['USD','PHP','JPY'],				//valid currency types
			number = numerus.wordsToNum(data);				// convert the words to numbers

		if(!data || !type){									//checker
			return "Incomplete request data";
		}

		if(money_types.indexOf(type)==-1){					//if the given currency type 
			return "Invalid currency type";					//	do not exist in the list
		}

		if(isNaN(number)||number==""){						//if there are error in convertion
			return number;
		}

		return (type + ' ' + number);						//return
	},

	numberDelimited : function(data,limiter,jumps){
		var number = data.toString(),
			num_len = number.length,
			hops = Number(jumps),
			delimited = "";

		if(!data || !limiter || !jumps){					//checkers
			return "Incomplete request data";
		}

		if(isNaN(hops) || isNaN(number)){
			return "Invalid input";
		}
															//if the jump value is greater	
		if(number.length <= hops){							// than the length of the number
			return "Jump value must be less than the length of the input";
		}

		for (var i = 0; i < num_len; i++) {
			delimited += number[i];

			if(((num_len-1-i)%hops==0) && i!=num_len-1){	//place the delimiters
				delimited += limiter;
			}
		}

		return delimited;									//return
	}

}

/*################################################################################################*/
