// roulette wheel
var startAngle = 0;
var arc;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

// initiates spin animation
document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
}

function RGB2Color(r, g, b) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

// Creates color gradient through each arc
function getColor(item, maxitem) {
  var phase = 0;
  var center = 127;
  var width = 127;
  var frequency = (Math.PI * 2) / maxitem;

  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}

// Create Roulette Wheel
function drawRouletteWheel() {
  arc = Math.PI / (restaurantOptions.length / 2);
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 240;
    var textRadius = 135;
    var insideRadius = 29;

    ctx = canvas.getContext("2d");
    ctx.clearRect(500, 500, 500, 500);

    // styles text in each arc
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = "13px Lato";

    // fill sections with restaurantOptions
    for (var i = 0; i < restaurantOptions.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = getColor(i, restaurantOptions.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = "black";
      ctx.translate(
        250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 150);
      var text = restaurantOptions[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

// spin rotation time is randomized
function spin() {
  $("#details").empty();
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 3000;
  rotateWheel();
}

// rotates wheel and stops wheel rotation if spin time is greater or = to total spin time
function rotateWheel() {
  spinTime += 40;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawRouletteWheel();
  spinTimeout = setTimeout("rotateWheel()", 20);
}

// Stops rotation of wheel
function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = (startAngle * 180) / Math.PI + 90;
  var arcd = (arc * 180) / Math.PI;
  var index = Math.floor((360 - (degrees % 360)) / arcd);
  ctx.save();
  ctx.font = "15px lato";
  var text = restaurantOptions[index];
  var textLoc = restaurantCoord[index];
  var textUrl = restaurantUrl[index];

  // Appends picked restaurant into text div
  $("#details").append("<h2>" + "The Wheel Has Chosen:  " + text + "</h2>");

  var yelpLink = $('<a target="_blank">Find out more on Yelp!</a>').attr(
    "href",
    textUrl
  );
  $("#details").append(yelpLink);
  ctx.restore();

  var locationTag = $(
    "<script> setCords(" + JSON.stringify(textLoc) + ") </script>"
  );
  $("body").append(locationTag);

  var googleTag = $(
    '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uq660sOqIWpWFdN6tGwKUYR07jmx-Ww&callback=initMap">'
  );
  $("body").append(googleTag);
}

// slows down rotation of wheel smoothly
function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}
