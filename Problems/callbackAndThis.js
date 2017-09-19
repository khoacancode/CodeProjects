 // global variable​
​var allUserData = [];
​var generalLastName = "Clinton";
​
​// generic logStuff function that prints to console​
​function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }
​
    }​
}
​
​// A function that takes two parameters, the last one a callback function​
​function getInput (options, callback) {
    allUserData.push (options);
    callback (options);
}
​
​// When we call the getInput function, we pass logStuff as a parameter.​
​// So logStuff will be the function that will called back (or executed) inside the getInput function​
getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);
​​
​function getInput (options, callback) {
    allUserData.push (options);
​// Pass the global variable generalLastName to the callback function​
    callback (generalLastName, options);
}

function getInput(options, callback) {
    allUserData.push(options);
​
    // Make sure the callback is a function​
    if (typeof callback === "function") {
    // Call it, since we have confirmed it is callable​
        callback(options);
    }
}

/*
This
*/

// Define an object with some properties and a method​
​// We will later pass the method as a callback function to another function​
​var clientData = {
    id: 094545,
    fullName: "Not Set",
    
    setUserName: function (firstName, lastName)  {
      this.fullName = firstName + " " + lastName;
    }
}
clientData.setUserName("Khoa", "Vo");
console.log(clientData.fullName); //Khoa Vo

​function getUserInput(firstName, lastName, callback)  {
    callback (firstName, lastName);
}

getUserInput ("Barack", "Obama", clientData.setUserName);​
console.log (clientData.fullName);// Not Set​
​
​// The fullName property was initialized on the window object​
console.log (window.fullName); // Barack Obama