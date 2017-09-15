function palindrome(myString){
	/* strip off anything that's NOT letter or digit*/
	var formattedStr = myString.replace(/[^A-Z0-9]/ig, '').toLowerCase();
	var reversedStr = formattedStr.split('').reverse().join('');

	document.write("<div>"+ formattedStr+ "<br> "+reversedStr);
	if(formattedStr === reversedStr){
		document.write("<br>"+ myString + " is a Palindrome </div>");
	}
	else {
		document.write("<br>" + myString + " is not a Palindrome </div>");
	}
}

palindrome('"Oh who was it I saw, oh who?"');
palindrome('"Madam"');
palindrome('"Star Wars"');
palindrome('"2,3,4,3,2"');
palindrome('"7,10,7,8,9"');