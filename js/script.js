/*
File: script.js
GUI Assignment: HW4 Multiplication Table Generator
Timothy Retelle, UMass Lowell Computer Science, timothy_retelle@student.uml.edu
Copyright (c) 2022 by Timothy Retelle. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author. This is a small site to generate multiplication tables.
updated on June 23rd, 2022
*/

//variables to hold user inputs
var topStart = 0;
var topEnd = 0;
var sideStart = 0;
var sideEnd = 0;

var table;
var tableRow;
var value;
$.validator.addMethod("greaterThan", function(value, element, param) {
	return (value >= $(param).val());
});
$(document).ready(function(){
	$('#inputForm').validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		rules: {
			field1: {
			required: true,
			range: [-50, 50]
			},
			field2: {
			required: true,
			range: [-50, 50],
			greaterThan: "#topStart"
			},
			field3: {
			required: true,
			range: [-50, 50]
			},
			field4: {
			required: true,
			range: [-50, 50],
			greaterThan: "#sideStart"
			}
		},
		messages: {
			field2: {
				greaterThan: "Cannot be smaller than the start value"
			},
			field4: {
				greaterThan: "Cannot be smaller than the start value"
			}
		},
		errorPlacement:function(error,element){
			error.appendTo(element.parent().parent().after());
		}
	});
});


//function called when the go button is clicked
function generate() {
	if(!$('#inputForm').valid()){ //don't run the rest of the function if the form isn't valid
		return;
	}
	topStart = document.getElementById("topStart").value;
	topEnd = document.getElementById("topEnd").value;
	sideStart = document.getElementById("sideStart").value;
	sideEnd = document.getElementById("sideEnd").value;
	sideEnd++;//fix off by one error
	table = document.getElementById("multTable");
	
	while(table.firstChild){//just in case there was already a table, remove it
		table.removeChild(table.firstChild);
	}
	
	tableRow = document.createElement("tr");
	
	var newElement = document.createElement("th");//create blank for the corner
	var text = document.createTextNode("");
	newElement.appendChild(text);
	tableRow.appendChild(newElement);
	var first = true;
	for (let j = sideStart; j <= sideEnd; j++){
		for (let i = topStart; i <= topEnd; i++) {
			if(first){
				value = i;
				newElement = document.createElement("th");
			}
			else{
				value = i* (j-1); //multiply by the column, if it isnt the header row
				newElement = document.createElement("td");
			}
			
			text = document.createTextNode(value);
			newElement.appendChild(text);
			tableRow.appendChild(newElement);
		}

		first = false;
		table.appendChild(tableRow);
		tableRow = document.createElement("tr");
		newElement = document.createElement("th");
		text = document.createTextNode(j);
		newElement.appendChild(text);
		tableRow.appendChild(newElement);
	}
	
	
	//create table
	
}
