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

		if(input==0){
			return "";
		}

		if(input.toString().length > 3){
			return "Error in converting number";
		}

		while(input > 0){
			numbers.unshift(input%10);
			input = parseInt(input/10);
		}

		index = 3 - numbers.length;

		for (var i = 0 ; i < numbers.length; i++) {
			convert = numerus.words.ones[numbers[i]];
			if(index==1){
				if(numbers[i]==1){
					convert = numerus.words.ones[numbers[i]*10 + numbers[i+1]];
					i+=1;
				}else{
					convert = numerus.words.tens[numbers[i]];
				}
			}
			words += (convert || '') + " ";
			words = (index==0 ? words + "hundred " : words);
			index++;
		};

		return words.trim();
	},

	numToWords : function(data){
		var regExCheck = new RegExp('^\\d+$'),
			input = Number(data),
			numbers = [],
			words = "",
			convert,
			index;

		if(!data){
			return "Incomplete request data";
		}

		if(!regExCheck.test(data)){
			return "Invalid Input";
		}

		if(!input){
			return "zero";
		}

		if(input > 1000000){
			return "Number must be less than or equal to 1 million"
		}

		while(input > 0){
			numbers.unshift(input%1000);
			input = parseInt(input/1000);
		}

		index = 3 - numbers.length;

		for (var i = 0 ; i < numbers.length; i++) {
			convert = numerus.convertTrio(numbers[i]);
			words += convert + " ";

			if(index == 0 && convert) words += "million "; 
			if(index == 1 && convert) words += "thousand ";
			index ++;
		};

		return words.trim();

	},

	wordsToNum : function(data){
		var ones = numerus.words.ones,
			tens = numerus.words.tens,
			lower_state="",
			upper_state="",
			words = [],
			total = 0,
			num = 0,
			digit1 = 0,
			digit2 = 0;

		if(!data){
			return "Incomplete request data";
		}

		if(data=="zero"){
			return '0';
		}

		words = data.trim().toLowerCase().split(' ');

		while(words.length){
			temp = words.shift();

			if(temp == "hundred" || temp=="thousand" || temp== "million"){
				
				if(lower_state=="") return "Invalid input";
				
				if(temp=="hundred"){
					if(upper_state=="hundred") return "Invalid input";
					if((total > 9 && total <100)||total<1) return "Invalid input";
					upper_state = "hundred";
					total += (num * 100) - num;
					num = 0;
				}else if(temp=="thousand"){
					if(upper_state=="thousand") return "Invalid input";
					upper_state = "thousand";
					total = total * 1000;
					num = 0;
				}else if(temp=="million"){
					if(upper_state=="thousand" || upper_state=="million") return "Invalid input";
					upper_state = "million";
					total = total * 1000000;
					num = 0;
				}

				lower_state = (temp=="hundred" ? "hundred" : "");

			}else{
				digit1 = ones.indexOf(temp);
				digit2 = tens.indexOf(temp);

				if(digit1==-1 && digit2==-1){
					return "Invalid input";
				}else if(digit2!=-1){
					if(lower_state=="tens" || lower_state=="ones") return "Invalid input";
					lower_state = "tens";
					num = digit2 * 10;
				}else{
					if(lower_state=="ones" || (num>0 && digit1>9)) return "Invalid input";
					lower_state="ones";
					num = digit1;
				}

				total += num;
			}

		}

		if(total > 1000000){
			return "Number must be less than or equal to 1 million"
		}

		return total;
	},

	wordsToCurrency : function(data,type){
		var money_types = ['USD','PHP','JPY'],
			number = numerus.wordsToNum(data);

		if(money_types.indexOf(type)==-1){
			return "Invalid currency type";
		}

		if(isNaN(number)||number==""){
			return number;
		}

		return (type + ' ' + number);
	},

	numberDelimited : function(data,limiter,jumps){
		var number = data.toString(),
			num_len = number.length,
			hops = Number(jumps),
			delimited = "";

		if(!data || !limiter || !jumps){
			return "Incomplete request data";
		}

		if(isNaN(hops) || isNaN(number)){
			return "Invalid input";
		}

		if(number.length <= hops){
			return "Jump value must be less than the length of the input";
		}

		for (var i = 0; i < num_len; i++) {
			delimited += number[i];

			if(((num_len-1-i)%hops==0) && i!=num_len-1){
				delimited += limiter;
			}
		}

		return delimited;
	}

}

// Reference of ideas
// 	array of words			=> http://stackoverflow.com/questions/5529934
//	onkeyup function		=> http://www.w3schools.com/jsref/event_onkeyup.asp
