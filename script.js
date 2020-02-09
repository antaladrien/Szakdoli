function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
	x.className += " responsive";
  } else {
	x.className = "topnav";
  }
}

//memory játék
Array.prototype.memory_tile_shuffle = function(){
		var i = this.length, j, temp;
		while(--i > 0){
			j = Math.floor(Math.random() * (i+1));
			temp = this[j];
			this[j] = this[i];
			this[i] = temp;
		}
	}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
	memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				memory_values = [];
				memory_tile_ids = [];
				if(tiles_flipped == memory_array.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.style.background = 'url(kepek/hatter.jpg) no-repeat';
					tile_1.innerHTML = "";
					tile_2.style.background = 'url(kepek/hatter.jpg) no-repeat';
					tile_2.innerHTML = "";
					memory_values = [];
					memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

//társalgási quiz
function _(x){
	return document.getElementById(x);
}
function renderQuestion(){
	test = _("test");
	if(pos >= questions.length){
		test.innerHTML = "<h3>"+correct+" helyes válaszod volt a "+questions.length+"-ből</h3>";
		_("test_status").innerHTML = "Vége a tesztnek";
		pos = 0;
		correct = 0;
		return false;
	}
	_("test_status").innerHTML = "Az "+(pos+1)+". kérdés a "+questions.length +"-ből";
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	test.innerHTML = "<h5>"+question+"</h5>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Következő kérdés</button>";
}
function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}
	if(choice == questions[pos][4]){
		correct++;
	}
	pos++;
	renderQuestion();
}

//nyelvtani teszt
function getScore(form) {
	var score = 0;
	var currElt;
	var currSelection;
	for (i=0; i<numQues; i++) {
		currElt = i*numChoi;
		answered=false;
		for (j=0; j<numChoi; j++) {
			currSelection = form.elements[currElt + j];
			if (currSelection.checked) {
				answered=true;
				if (currSelection.value == answers[i]) {
				score++;
				break;
				}
			}
		}
		if (answered ===false){alert("Hupsz! Még nem válaszoltál az összes kérdésre!") ;return false;}
	}
	var scoreper = Math.round(score/numQues*100);
	form.percentage.value = scoreper + "%";
	form.mark.value=score;
}