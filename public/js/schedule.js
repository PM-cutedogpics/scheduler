function changeSchedule(checkboxElem) {
	console.log(checkboxElem);
	// Searching for ID in element
	// var idName = checkboxElem.id;
	var id = "L1" + checkboxElem.substring(1);
	console.log(id);
	var label = document.getElementById(id).innerHTML;
	var timeFrame = label.substring(label.length - 11, label.length);
	var low = parseInt(timeFrame.substring(0, 2));
	var high = parseInt(timeFrame.substring(6, 8));
	console.log(label);
	console.log(timeFrame);
	if (timeFrame.substring(9, 11) == "00")
		high = high - 1;
	// Finding days
	var label_cnt = 8;
	var dates = [];
	do {
		var date_label = label.substring(label_cnt, label_cnt + 1);
		if (date_label != ' ')
			dates.push(date_label);
		label_cnt = label_cnt + 1;
	} while (date_label != ' ');
	var subjectName = label.substring(0, 7);
	console.log(dates)
	console.log(subjectName);
	// Filling up the schedule
	if (document.getElementById(checkboxElem).checked) {
		for (var i = low; i <= high; i++){
			for (var j = 0; j < dates.length; j++){
				var gridID = dates[j] + i;
				console.log("add: " + gridID);
				var name = document.getElementById(gridID);
				name.innerHTML = name.innerHTML + " " + subjectName;
			}
		}
	}
	else {
		for (var i = low; i <= high; i++){
			for (var j = 0; j < dates.length; j++){
				var gridID = dates[j] + i;
				console.log("remove: " + gridID);
				var name = document.getElementById(gridID);
				name.innerHTML = name.innerHTML.replace(subjectName, "");
			}
		}
	}
}

function addToClassList(){
	var addList = document.getElementsByName("add");
	console.log(addList);
	var checked = [];
	for (var i = 0; i < addList.length; i++)
		if (document.getElementById(addList[i].id).checked) 
        	checked.push(addList[i].id);
	console.log(checked);

	for (var i = 0; i < checked.length; i++){
		// Creating elements for the new classes
		var button = document.createElement('input')
		button.className = "form-check-input";
		button.type = "checkbox";
		button.id = 'M' + checked[i].substring(1, checked[i].length);
		console.log(button.id);
		button.addEventListener("change", function(){
			changeSchedule(button.id);
		});
		// Adding Checkboxes to Class List
		var classLabel = document.createElement('label')
		classLabel.className = 'form-check-label';
		classLabel.id = 'L1' + checked[i].substring(1, checked[i].length);
		var labelID = 'L2' + checked[i].substring(1, checked[i].length);
		var newInnerHTML = document.getElementById(labelID).innerHTML;
		classLabel.innerHTML =  newInnerHTML;
		console.log(button);
		console.log(classLabel);
		// Assigning New Classes to Class List
		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		var li = document.createElement("li");
		var classList = document.getElementById("classList");
		div1.className = 'container p-0';	
		div2.className = 'form-check';
		li.className = 'list-group-item';
		classList.appendChild(li);
		li.appendChild(div2);
		div2.appendChild(div1);
		div1.appendChild(button);
		div1.appendChild(classLabel);
	}
}



// $("input[type='checkbox']").each(function(){
//   var name = $(this).attr('name'); // grab name of original
//   var value = $(this).attr('value'); // grab value of original
//   var ischecked = $(this).is(":checked"); //check if checked
// });
// $(document).ready(function() {
// 	function addToSchedule(){

// 	}


// 	function submitExpense(){
// 		var desc_field = document.getElementById("item");
// 		var amount_field = document.getElementById("amount");
// 		desc_field.style.borderColor = "#DDDDDD";
// 		amount_field.style.borderColor = "#DDDDDD";
// 		document.getElementById('error').innerHTML = '';

// 		if (desc_field.value == "") {
// 			document.getElementById('error').innerHTML = 'Please enter a description for the expense.';
// 			desc_field.style.borderColor = "#B00000";
// 		}
// 		else if (amount_field.value == "") {
// 			document.getElementById('error').innerHTML = 'Please enter an amount';
// 			amount_field.style.borderColor = "#B00000";
// 		} 
// 		else {
// 			var date_field = document.getElementById("date");
// 			var date_value = document.createTextNode(date_field.value);
// 			var date_label = document.createElement('label')
// 				date_label.className = 'datecol';
// 				date_label.appendChild(date_value);

// 			var desc_value = document.createTextNode(desc_field.value);
// 			var desc_label = document.createElement('label')
// 				desc_label.className = 'itemcol';
// 				desc_label.appendChild(desc_value);

// 			var amount_value = document.createTextNode(amount_field.value);
// 			var amount_label = document.createElement('label')
// 				amount_label.className = 'amountcol';
// 				amount_label.appendChild(amount_value);

// 				// Updates Total Expenses
// 				sum = parseFloat(sum) + parseFloat(amount_field.value);
// 				document.getElementById('total').innerHTML = parseFloat(sum).toFixed(2);
				
// 			var expense_list = document.getElementById("list");
// 		    var div = document.createElement("div");
// 		    div.id = "container";
// 		    var category_level = document.getElementById("category").value;
// 		    if (category_level.localeCompare("food") == 0){
// 		    	div.className = 'food expenseItem';
// 		    }
// 		    else if (category_level.localeCompare("transpo") == 0){
// 		    	div.className = 'transpo expenseItem';
// 		    }
// 		    else if (category_level.localeCompare("bills") == 0){
// 		    	div.className = 'bills expenseItem';
// 		    }
// 		    expense_list.appendChild(div);
// 		    div.appendChild(date_label);
// 		    div.appendChild(desc_label);
// 		    div.appendChild(amount_label);

// 		    var temp = new Object()
// 		    temp.date = date_field.value;
// 		    temp.category = category_level;
// 		    temp.description = desc_field.value;
// 		    temp.amount = amount_field.value;
// 		    expenses.push(temp);
// 		    console.log(temp);

// 		    // Reset Values
// 		    document.getElementById("date").value = formattedDate;
// 		    document.getElementById("item").value = "";
// 		    document.getElementById("amount").value = "";
// 		    document.getElementById("category").value = "food";
// 		}
// 	}
// 	var button = document.getElementById("submit");
// 		button.onclick = submitExpense;

// 		function filterList(){
// 			var filter_by= document.getElementById("filter").value;
// 			sum = 0;
// 			document.getElementById("list").innerHTML = "";
// 			document.getElementById('total').innerHTML = parseFloat(0).toFixed(2);
// 			var filtered = expenses.filter(function(expense){
// 				if (filter_by == expense.category){
// 					var date_value = document.createTextNode(expense.date);
// 				var date_label = document.createElement('label');
//    				date_label.className = 'datecol';
//    				date_label.appendChild(date_value);
   				
//    				var desc_value = document.createTextNode(expense.description);
// 				var desc_label = document.createElement('label');
//    				desc_label.className = 'itemcol';
//    				desc_label.appendChild(desc_value);

//    				var amount_value = document.createTextNode(expense.amount);
// 				var amount_label = document.createElement('label');
//    				amount_label.className = 'amountcol';
//    				amount_label.appendChild(amount_value);

//    				// Updates Total Expenses
//    				sum = parseFloat(sum) + parseFloat(expense.amount);
//    				document.getElementById('total').innerHTML = parseFloat(sum).toFixed(2);
   				
// 				var expense_list = document.getElementById("list");
// 			    var div = document.createElement("div");
// 			    div.id = "container";
// 			    if (expense.category.localeCompare("food") == 0){
// 			    	div.className = 'food expenseItem';
// 			    }
// 			    else if (expense.category.localeCompare("transpo") == 0){
// 			    	div.className = 'transpo expenseItem';
// 			    }
// 			    else if (expense.category.localeCompare("bills") == 0){
// 			    	div.className = 'bills expenseItem';
// 			    }
// 			    expense_list.appendChild(div);
// 			    div.appendChild(date_label);
// 			    div.appendChild(desc_label);
// 			    div.appendChild(amount_label);
// 			}
// 			else if (filter_by == "all") {
// 				var date_value = document.createTextNode(expense.date);
// 				var date_label = document.createElement('label');
//    				date_label.className = 'datecol';
//    				date_label.appendChild(date_value);
   				
//    				var desc_value = document.createTextNode(expense.description);
// 				var desc_label = document.createElement('label');
//    				desc_label.className = 'itemcol';
//    				desc_label.appendChild(desc_value);

//    				var amount_value = document.createTextNode(expense.amount);
// 				var amount_label = document.createElement('label');
//    				amount_label.className = 'amountcol';
//    				amount_label.appendChild(amount_value);

//    				// Updates Total Expenses
//    				sum = parseFloat(sum) + parseFloat(expense.amount);
//    				document.getElementById('total').innerHTML = parseFloat(sum).toFixed(2);
   				
// 				var expense_list = document.getElementById("list");
// 			    var div = document.createElement("div");
// 			    div.id = "container";
// 			    if (expense.category.localeCompare("food") == 0){
// 			    	div.className = 'food expenseItem';
// 			    }
// 			    else if (expense.category.localeCompare("transpo") == 0){
// 			    	div.className = 'transpo expenseItem';
// 			    }
// 			    else if (expense.category.localeCompare("bills") == 0){
// 			    	div.className = 'bills expenseItem';
// 			    }
// 			    expense_list.appendChild(div);
// 			    div.appendChild(date_label);
// 			    div.appendChild(desc_label);
// 			    div.appendChild(amount_label);
// 			}
// 			});
// 		}
// 	var select = document.getElementById("filter");
// 		select.onchange = filterList;
// 	})