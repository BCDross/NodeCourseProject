
var state = {
    balance: 0,
    betAmount: 0,
    currentFirstName: "",
    currentLastName: ""
}

// store PlayerObject objects here
var userArray = [];

// define a constructor to create player objects
var PlayerObject = function (pPlayerID, pFirstName, pLastName, pBalance) {
    this.PlayerID = pPlayerID;
    this.PlayerFirstName = pFirstName;
    this.PlayerLastName = pLastName;
    this.PlayerBalance = pBalance;
}

document.addEventListener("DOMContentLoaded", function () {
    state.isLoggedIn = false;
    userArray[userArray.length] = new PlayerObject(userArray.length, "Kaladin", "Stormblessed", 10);
    userArray[userArray.length] = new PlayerObject(userArray.length, "Elend", "Venture", 40);
    userArray[userArray.length] = new PlayerObject(userArray.length, "Godking", "Susebron", 30);

    createList();  // need this for first time index.html is pulled down

    // need this for when I go back to home page
    $(document).on("pagebeforeshow", "#home", function (event) {   // have to use jQuery 
        document.getElementById("IDparmHere").innerHTML = "";
        createList();
    });


    $(document).on("pagebeforeshow", "#pickbet", function (event) {     // have to use jQuery 
        //event.preventDefault();  // did not need this
        var currentID = document.getElementById("IDparmHere").innerHTML;
        state.currentFirstName = userArray[currentID].PlayerFirstName;
        state.currentLastName = userArray[currentID].PlayerLastName;
        state.balance = userArray[currentID].PlayerBalance;
        document.getElementById("user").innerHTML = "Welcome " + state.currentFirstName + ' ' + state.currentLastName + " Your Balance is: " + state.balance;
    });

    // now load up all the buttons
    document.getElementById("buttonLogin").addEventListener("click", function () {
        userArray[userArray.length] = new PlayerObject(userArray.length, document.getElementById('firstName').value, document.getElementById('lastName').value, 10);
        document.location.href = "#home";
    });
    document.getElementById("buttonNewAccount").addEventListener("click", function () {
        document.location.href = "#newaccount";
    });
    document.getElementById("ButtonBet").addEventListener("click", function () {
        buttonClicked();
    });
    document.getElementById("bet1").addEventListener("click", function () {
        state.betAmount = 1;
        setup();
    });
    document.getElementById("bet2").addEventListener("click", function () {
        state.betAmount = 2;
        setup();
    });
    document.getElementById("bet5").addEventListener("click", function () {
        state.betAmount = 5;
        setup();
    });
    document.getElementById("buttonLosePlayAgain").addEventListener("click", function () {
        document.location.href = "#home";
    });
    document.getElementById("buttonLoseQuit").addEventListener("click", function () {
        document.location.href = "#goodbye";
    });

});   // end of document on load

function createList() {
    var divUserlist = document.getElementById("userlist");
    while (divUserlist.firstChild) {    // remove any old data so don't get duplicates
        divUserlist.removeChild(divUserlist.firstChild);
    };
    var ul = document.createElement('ul');
    userArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // add player names with an anchor to get to next "page"  #pickbet
        // use the html5 all purpose data-parm to set and pass along, the playerID for the li that is clicked
        li.innerHTML = "<a data-transition='pop' class='onePlayer' data-parm=" + element.PlayerID + " href='#pickbet'> Pick your bet size. </a> " + element.PlayerFirstName + " " + element.PlayerLastName;
        ul.appendChild(li);
    });
    //$("#notes").listview('refresh');  // maybe ?need this so jquery mobile will apply the styling to the newly added li's  
    divUserlist.appendChild(ul);

    // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("onePlayer");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#pickbet";
        });
    });
};

function setup() {
    (document.getElementById("balance")).innerText = state.balance;
    (document.getElementById("ButtonBet")).style.visibility = 'visible';
    (document.getElementById("turnCount")).innerText = 0;
    (document.getElementById("status")).innerText = "";
    document.location.href = "index.html#game";
};

function buttonClicked() {
    state.balance = GetNewBalance(state.balance);
    (document.getElementById("balance")).innerText = state.balance;
    if (state.balance === 0) {
        (document.getElementById("ButtonBet")).style.visibility = 'hidden';
        document.location.href = "index.html#gamelost";
    }
    if (state.balance >= 100) {
        document.location.href = "index.html#gamewon";
    }
};

function GetNewBalance(balance) {
    var dice = [];
    RollDice(dice);
    var dice1txt = "images/dice-" + dice[0] + ".jpg";
    var dice2txt = "images/dice-" + dice[1] + ".jpg";
    document.getElementById("image1").src = dice1txt;
    document.getElementById("image2").src = dice2txt;
    //if (dice[0] == dice[1] || dice[0] + dice[1] == 7 || dice[0] + dice[1] == 11) {
    if (dice[0] + dice[1] == 7 || dice[0] + dice[1] == 11) {
        balance = balance + state.betAmount;
        (document.getElementById("status")).innerText = "You Win!";
    }
    else {
        balance = balance - state.betAmount;
        (document.getElementById("status")).innerText = "You Lost!";
    }


    var turnCount = (document.getElementById("turnCount")).innerText;
    var turnCountInt = parseInt(turnCount);
    turnCountInt++;
    (document.getElementById("turnCount")).innerText = turnCountInt;

    return balance;
}

function RollDice(dice) {
    dice[0] = Math.floor((Math.random() * 6) + 1);
    dice[1] = Math.floor((Math.random() * 6) + 1);
}

