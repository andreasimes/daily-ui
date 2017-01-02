/**** script file for Daily UI challenge 002 - credit card checkout ****/
// December 2016
// Andrea Simes


/** Script used to determine credit card type and validate input fields **/

/* CREDIT CARD */

var card_type; //global to hold credit card type

/*these values come from Wikipedia https://en.wikipedia.org/wiki/Payment_card_number*/

var cards = {"amex":[[34],[37]], "discover":[[6011],[622126, 622925],[644, 649], [65]], "mastercard":[[50, 55]], "visa":[[4]] }
var cardnames = Object.keys(cards);

$('input#cardnumber').on('input', function() { 
    var cardnames = Object.keys(cards);
    var input = $('input#cardnumber').val();
    //console.log("input " + typeof input);
   
    var result;
    result = cardQuerier(input);
    //console.log("result: " + result);
    $("input#cardnumber").css('background-color', '#FFFFFF');
    if (result == undefined){
         $("input#cardnumber").css('background', 'url("./Visa.png") no-repeat scroll 490px 4px/44.8px 28px, url("./AMEX.png") no-repeat scroll 590px 4px/44.8px 28px, url("./MC.png") no-repeat scroll 540px 4px/44.8px 28px, url("./Discover.png") no-repeat scroll 640px 4px/44.8px 28px');
    }
    if (result == "mastercard"){
        $("input#cardnumber").css('background', 'url("./MC.png") no-repeat scroll 440px 4px/44.8px 28px'); //reset field with corresponding card icon
    }
    if (result == "visa"){
         $("input#cardnumber").css('background', 'url("./Visa.png") no-repeat scroll 440px 4px/44.8px 28px'); //reset field with corresponding card icon
    }
    if (result == "discover"){
         $("input#cardnumber").css('background', 'url("./Discover.png") no-repeat scroll 440px 4px/44.8px 28px'); //reset field with corresponding card icon
    }
    if (result == "amex"){
         $("input#cardnumber").css('background', 'url("./AMEX.png") no-repeat scroll 440px 4px/44.8px 28px'); //reset field with corresponding card icon
    }
    
    
    input = numberSpacer(input);
    console.log("input" + input);
    
    $("input#cardnumber").val(input);
    
    $("input#cardnumber").css('background-color', '#FFFFFF'); //reset default format
    $("input#cardnumber").css('border', '1px solid');
    $("input#cardnumber").css('border-color', '#B0B0B0');
});

/* NAME */

$('input#name').on('input', function() {
    console.log("typed something");
    console.log($('input#name').val());
    if($('input#name').val() == ""){ //no input
        $("input#name").css('background', 'url("./x.png") no-repeat scroll 460px 8px/19.2px 19.25px'); //display "x" icon
        $('input#name').tooltip(); //instantiate tooltip to help user deal with error
    }
    else {
        $("input#name").css('background', '');
        $('input#name').tooltip('dispose');
        $("input#name").css('border-color', '#B0B0B0');
    }
    $("input#name").css('background-color', '#FFFFFF');
});

/* EXPIRATION DATE */


$('input#expiration').on('input', function() {
    console.log("typed something");
    console.log($('input#name').val());
    if($('input#expiration').val() == "" || $('input#expiration').val().length > 4 || $('input#expiration').val().length < 4 || $('input#expiration').val().match(/([^\d])+/) ){ //invalid inputs
        $('input#expiration').css('background', 'url("./x.png") no-repeat scroll 64px 8px/19.2px 19.25px'); //"x" icon
        $('input#expiration').tooltip(); //instantiate tooltip to help user deal with error
    }
    else {
        $('input#expiration').css('background', '');
        $('input#expiration').tooltip('dispose')
    }
    $('input#expiration').css('background-color', '#FFFFFF');
});

/* SECURITY CODE */

$('input#security').on('input', function() {
    //console.log("typed something");
    //console.log($('input#name').val());
    if($('input#security').val() == "" || $('input#security').val().match(/([^\d])+/) || $('input#security').val().length > 3 || $('input#security').val().length < 3 ){ //no input
        $('input#security').css('background', 'url("./x.png") no-repeat scroll 45px 8px/19.2px 19.25px'); //"x" icon
        $('input#security').tooltip(); //instantiate tooltip to help user deal with error
    }
    else {
        $('input#security').css('background', '');
        $('input#security').tooltip('dispose')
    }
    $('input#security').css('background-color', '#FFFFFF');
});

//initialize popover
$(function () { 
    $('[data-toggle="popover"]').popover();
});

//method to add spaces between each group of 4 digits

function numberSpacer(num){ 
    num = removeWhitespace(num);
    console.log("initial numberspacer " + num);
    
    if (num.length > 4){
        for (var y = 0; y < num.length; y += 1){
            console.log(y + " " + num);
            console.log(y + "charAt(y)" + num.charAt(y));
            if (y%5 == 3){
                num = num.substr(0, y+1) + " " + num.substr(y+1, num.length);
            } 
        }
    }
    return num;
}

function removeWhitespace(n){ //recursive helper method to remove whitespace
    if(n.match(/[\s]/)){
        var whiteindex = /\b([\s])+/g.exec(n);
        console.log("n" + n);
        console.log("whiteindex " + whiteindex.index);
        n = n.substr(0,whiteindex.index) + n.substr(whiteindex.index+1, n.length);
        return removeWhitespace(n); //recursive call
    }
    else { //base case
        return n;
    }
    
}

function cardQuerier(input) { //assign correct cardname based on number
    var cardname;
    for (var i = 0; i < cardnames.length; i += 1){
        cardname = cardnames[i];
        //console.log(cards[cardnames[i]]);
        for (var z = 0; z < cards[cardnames[i]].length; z += 1){
            //console.log(cards[cardnames[i]][z]);
            var current = cards[cardnames[i]][z];
            if (current.length > 1){ //multiple elements
                //console.log("more than 1 " + current);
                //console.log(range(cards[cardnames[i]][z][0], cards[cardnames[i]][z][1]));
                var gen_array = range(cards[cardnames[i]][z][0], cards[cardnames[i]][z][1]);
                for (var t = 0; t < gen_array.length; t += 1){
                    var len = String(gen_array[t]).length;
                    if(input.substr(0,len).includes(String(gen_array[t]))){
                      
                        cardname = cardnames[i];
                        //console.log(cardname);
                        return cardname;
                    }
                }

            }
            else{ //only one element in array
                //console.log("current" + typeof current[0]);
                if(input.includes(String(current[0]))){
                        //console.log("yay!");
                        cardname = cardnames[i];
                        //console.log(cardname);
                        return cardname;
                    }
            }
            /*for (var x = 0; x < cards[cardnames[i]][z].length; x += 1 ){
                console.log(cards[cardnames[i]][z][x])
                /*if (cards[cardnames[i]][z][x].includes('n')){
                    console.log('hi');
                }*/
            //}*/

        }
    }
}


function range(start, end) {
     var diff = end-start+1;
  return Array.apply(0, Array(diff))
    .map(function (element, index) { 
      return index + start;  
  });
}

