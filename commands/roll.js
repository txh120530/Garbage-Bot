module.exports = {
	name: 'roll',
	description: 'Roll a dice',
	execute(message, args) {

function roll() {
  var numberOfDice = 0;
  var numberOfSides = 0;
  var total = 0;


  if (arguments.length==2) {
    numberOfDice = arguments[0];
    numberOfSides = arguments[1];
  } else if (arguments.length==1) {
    var arg = arguments[0] + "";
    if (arg.indexOf("d") > 0)  {
      numberOfDice = arg.substring(0,arg.indexOf("d"));
      numberOfSides = arg.substr(arg.indexOf("d")+1);
    } else {
      numberOfDice = 1;
      numberOfSides = arguments[0];
    }
  }

  for (i=numberOfDice; i>0; i--) {
    total += Math.floor(Math.random()*numberOfSides) + 1;
  }

  return total;
}

const result = roll(args);

message.channel.send(result);
	
}
};