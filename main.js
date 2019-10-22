//DOM elements
const resultEL=document.getElementById('result');
const lengthEL=document.getElementById('length');
const uppercaseEL=document.getElementById('uppercase');
const lowercaseEL=document.getElementById('lowercase');
const numbersEL=document.getElementById('numbers');
const symbolsEL=document.getElementById('symbols');
const generateEL=document.getElementById('generate');
const clipboardEL=document.getElementById('clipboard');



const randomfunc={
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

//generate event
generateEL.addEventListener('click', () => {
	//convert it to number type, i.e. add + sign 
	const length=+lengthEL.value;
	const hasLower=lowercaseEL.checked;
	const hasUpper=uppercaseEL.checked;
	const hasNumber=numbersEL.checked;
	const hasSymbol=symbolsEL.checked;

	resultEL.innerText=generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy password to clipboard
clipboardEL.addEventListener('click',() => {
	const textarea=document.createElement('textarea');
	const password=resultEL.innerText;

	if(!password){
		return;
	}

	textarea.value=password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('password copied to clipboard');
})



//generate password function
function generatePassword(lower, upper, number, symbol, length){
	//1. init pw var
	//2. filter out unchecked types
	//3. loop over the length  call generator funtion for each type
	//4. Add final pw to pw var and return 

	let generatedPassword='';
	const typeCount= lower+upper+number+symbol;
		//to generate array of objects
	const typesArr=[{lower}, {upper}, {number}, {symbol} ].filter(
		item=>Object.values(item)[0]
		);

	if(typeCount===0){
		return '';
	}

	for(let i=0; i<length; i+=typeCount){
		typesArr.forEach(type=>{
			const funcName=Object.keys(type)[0];
			//	console.log('funcName: ', funcName);
			generatedPassword+=randomfunc[funcName]();
		})
	}

	const finalPassword=generatedPassword.slice(0, length);
	return finalPassword;

}

// generator functions

function getRandomLower(){
		return String.fromCharCode(Math.floor(Math.random()*26)+97)
}

function getRandomUpper(){
		return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomNumber(){
		return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol(){
		const symbols='!@#$%^&*(){}=[]<>/,.';
		return symbols[Math.floor(Math.random() * symbols.length)];
}


