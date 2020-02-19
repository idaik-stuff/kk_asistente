'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const know = admin.database().ref('/entry');
const qty = know.child('quality');//iib graph

// a. the action name from the make_quality Dialogflow intent
const NAME_ACTION = 'make_quality';
// b. the parameters that are parsed from the make_quality intent 
const NUMBER_ARGUMENT = 'number';
const USER_ARGUMENT = 'username';


exports.caca = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  //const assistant = new Assistant({request: request, response: response});

/*function writeUserData(username, quality_in) {
 
	var entryRef = firebase.database().ref.child("entry");
    
	entryRef.push().set({
     user: username,
     quality: quality_in,
     timestamp :  admin.database.ServerValue.TIMESTAMP
      });
	
	
}	*/
	
// c. The function that Store data
  function SaveData (app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let username = app.getArgument(USER_ARGUMENT);
    
      //writeUserData(user, number);  
   // var entryRef = firebase.database().ref.child("entry");

    know.push().set({
        user: username,
        quality: number,
        timestamp: admin.database.ServerValue.TIMESTAMP
    });
	  
    app.tell('OK, ' +username + ' We log the visit. Quality of the poop ' +
       number +
      '! I am be waiting for you tomorrow. OK?.');
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, SaveData);


app.handleRequest(actionMap);
});