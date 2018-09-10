function format(fileString){
	for(let i=0; i<fileString.length; i++){
		//console.log(fileString.charAt(i));
		if(fileString.charAt(i) == '/'){

			let ii = i-1;
			let firstNum = "";
			while(fileString.charAt(ii) != '"'){
				firstNum += fileString.charAt(ii);
				ii--;
			}
			if(firstNum = firstNum.split("")){
				if(firstNum = firstNum.reverse()){
					firstNum = firstNum.join("");
				}
			}

			ii = i+1;
			let secondNum = "";
			while(fileString.charAt(ii) != '"'){
				secondNum += fileString.charAt(ii);
				ii++;
			}

			let result = parseFloat(firstNum) / parseFloat(secondNum);
			//console.log(secondNum);
			//console.log(firstNum+"/"+secondNum);
			//console.log(result);
			fileString = fileString.replace(firstNum+"/"+secondNum, result);
		}
	}
	return fileString;
}



reader = require('fs');
var resultString = "";
reader.readFile('zila_data.json', 'utf8', (err, data) => {
	if(!err){
		resultString = format(data);
	}
})

console.log(resultString);
