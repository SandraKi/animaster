import * as ani from '/src/animaster.js';
//The variable for the drawing
var fontRegular;
var fontBold;
var explainPush = '';
var explainPop = '';
var trail;
var trailMiddle;
var trailEnd;
var popLine;
var pushLine;
var explainText = "Die visuellen Einstellungen des grünen Bereichs werden zwischengespeichert";
var code2 = '';
var code3 = '';
var scaleLogo = 0.4;
var logoPos;
//load the font for the animation
function preload(){
  fontRegular = loadFont('assets/Gill Sans.otf')
  fontBold = loadFont('assets/Gill Sans Bold.otf')
}
//Setup is executed only once
function setup(){
  createCanvas(640,360);
  fullscreen();
  frameRate(60); //frames per second

  //position of the penguin
  logoPos = {
    x: width*2.5-120,
    y: height*2.5-130
  }

  //create a timeline for your video
  ani.tl.add(function(){ ani.startnr[0] = true}) // 0 - Title of video
        .add(function(){ ani.startnr[0] = false; ani.startnr[1] = true}, 3) // 0 - stop title of video; 1 - explain push()
        .add(function(){ explainPush = "Speichert die aktuellen Zeichen- und Transformationseinstellungen"}, 5) // explain push()
        .add(function(){ ani.startnr[2] = true}, 8)// 2 - explain pop()
        .add(function(){ explainPop = "Stellt die von push() gespeicherten Einstellungen wieder her"}, 10)// explain pop
        .add(function(){ explainPop = ''; explainPush = ''}, 14)
        .add(function(){ ani.startnr[3] = true}, 15)// 3 - explain code between push and pop
        //next scene
        .add(function(){ ani.startnr[1] = ani.startnr[2] = ani.startnr[3] = false; ani.startnr[4] = true}, 19)// 4 - explain code between push and pop
        .add(function(){ ani.startnr[5] = ani.startnr[9] = true}, 21) // push line
        .add(function(){ ani.startnr[6] = true}, 23) // Middle of the trail
        .add(function(){ ani.startnr[7] = true; explainText = "und nun wieder hergestellt."}, 26) // pop line
        .add(function(){ ani.startnr[8] = true}, 28) // End of the trail
        .add(function(){ ani.startnr[4] = ani.startnr[5] = ani.startnr[6] = ani.startnr[7] = ani.startnr[8] = ani.startnr[9] = false}, 36)
        .add(function(){ ani.startnr[10] = true}, 37) // Start coding example
        .add(function(){ ani.startnr[11] = true}, 39) // Coding example 1
        .add(function(){ ani.startnr[12] = true}, 48) // the first triangle
        .add(function(){ code2 = "\n\n push();\n strokeWeight(2);\n stroke(pink);\n fill(darkpink);\n tr2 = triangle(x1,y1,x2,y2,x3,y3);\n pop();";}, 50) // Coding example 2
        .add(function(){ ani.startnr[13] = true}, 59)// the second triangle
        .add(function(){ code3 = "\n\n tr3 = triangle(x1,y1,x2,y2,x3,y3);";}, 61) // Coding example 3
        .add(function(){ ani.startnr[14] = true}, 64) // the third triangle
        .add(function(){ ani.startnr[10] = ani.startnr[11] = ani.startnr[12] = ani.startnr[13] = ani.startnr[14] = false}, 66)
        .add(function(){ ani.startnr[15] = true}, 67) // the end

  //create new instances of the trail and ZigZagTrail
  trail = new ani.animation.Trail(0, height/2);
  trailMiddle = new ani.animation.ZigZagTrail(width/3, height/4);
  trailEnd = new ani.animation.Trail(width/3*2, 82);
  //create lines for push and pop
  pushLine = {
    x: width/3+3,
    y: 0
  }
  popLine = {
    x: width/3*2,
    y: 0
  }
  ani.exportAsMP4('push', 5);
}

function draw(){
  background(ani.darkblue);
  fill(255,255,255);
  textSize(21);
  textFont(fontRegular);
  strokeWeight(5);
  // ani.animation.look();

  //animster logo
  push();
  scale(scaleLogo);
  ani.icons.animasterlogo(logoPos.x, logoPos.y);
  pop();

  //title
  if(ani.startnr[0] === true){
    push();
    textAlign(CENTER, CENTER);
    textSize(50);
    var title = text('push() & pop()\n in p5.js', width/2, height/2);
    pop();
  }
  //explain push()
  if(ani.startnr[1] === true){
    push();
    textFont(fontBold);
    var title = text('push()', width/6, height/4);
    noFill();
    stroke(ani.green);
    ani.icons.save(width/12,height/4-15,true);
    pop();
    textAlign(LEFT);
    text(explainPush, width/5,height/3, width/3*2);
  }
  //explain pop()
  if(ani.startnr[2] === true){
    push();
    textFont(fontBold);
    var title = text('pop()', width/6, height/3*2);
    stroke(ani.green);
    ani.icons.restore(width/9,height/3*2,true);
    pop();
    textAlign(LEFT);
    text(explainPop, width/5,height/4*3, width/3*2);
  }
  //line for the area between push and pop
  push();
  stroke(ani.green);
  ani.icons.loadingline(width/5,height/4+20,width/5,height/3*2-20,ani.startnr[3]);
  pop();
  //TEXT code between push and pop
  if(ani.startnr[3] === true){
    push();
    textAlign(LEFT, CENTER);
    fill(ani.green);
    text("Der Code dazwischen ist unabhängig und kann individuell eingestellt werden.", width/4,height/4+(height/3*2-height/4)/2, width/4*3);
    pop();
  }
  //the start of the trail
  if(ani.startnr[4] === true){
    trail.update(width/3);
    trail.show(ani.green, 10);
  }
  //the middle of the trail
  if(ani.startnr[6] === true){
    trailMiddle.update(width/3);
    trailMiddle.show(ani.pink, 4);
  }
  //the end of the trail
  if(ani.startnr[8] === true){
    trailEnd.update(width/3);
    trailEnd.show(ani.green, 10);
  }
  //push() line
  if(ani.startnr[5] === true){
    push();
    strokeWeight(8);
    stroke(255,255,255);
    line(width/3+3, 0, pushLine.x, pushLine.y);
    ani.animation.moveOnAxis(pushLine, width/3+3, height/2, true, 0.2);
    noStroke();
    textAlign(CENTER);
    textFont(fontBold);
    text('push()', width/3+4, height/2 + 30);
    pop();
  }
  //pop()
  if(ani.startnr[7] === true){
    push();
    noStroke();
    textAlign(CENTER);
    textFont(fontBold);
    text('pop()', width/3*2, height/2 + 30);
    strokeWeight(8);
    stroke(255,255,255);
    line(width/3*2, 0, popLine.x, popLine.y);
    ani.animation.moveOnAxis(popLine, width/3*2, height/2, true, 0.2);
    pop();
  }
  //TEXT "Die Einstellungen werden zwischengespeichert und nun wiederhergestellt.""
  if(ani.startnr[9] === true){
    push();
    textAlign(CENTER, CENTER);
    text(explainText, width/8, height/4*3, width/4*3);
    pop();
  }
  //code example
  if(ani.startnr[10] ===  true){
    push();
    strokeWeight(3);
    stroke(20,20,26);
    fill(26,26,32);
    rect(width/16,height/8,width/8*3, height/8*6);
    rect(width/16,height/8*0.5,width/8*1, height/8*0.5);
    pop();
    textSize(12);
    text('draw(){', width/16+10 ,height/8+20);
    text('}', width/16+10 ,height/8*6.5);
  }
  // write the code in the example
  if(ani.startnr[11] ===  true){
    var code1 = " strokeWeight(5);\n stroke(green);\n noFill();\n tr1 = triangle(x1,y1,x2,y2,x3,y3);" + code2 + code3;
    ani.animation.typeWriter(code1, width/16+15, height/8+40);
  }
  // second triangle
  if(ani.startnr[13] ===  true){
    push();
    strokeWeight(2);
    stroke(ani.pink);
    fill(108,17,71);
    triangle(width/4*3.1, height/4*2.2,width/4*2.8, height/4*1.3,width/4*3.4, height/4*1.3);
    pop();
  }
  push();
  //first triangle
  if(ani.startnr[12] ===  true){
    stroke(ani.green);
    noFill();
    strokeJoin(ROUND);
    triangle(width/4*2.5, height/4*0.5, width/4*2.8, height/4*1.3, width/4*2.2, height/4*1.3);
  }
  // third triangle
  if(ani.startnr[14] ===  true){
    triangle(width/4*3.1, height/4*2.2, width/4*3.4, height/4*3, width/4*2.8, height/4*3);
  }
  pop();
  //the ending
  if(ani.startnr[15] === true){
    textAlign(CENTER);
    textSize(42);
    text("Viel Spaß beim Anwenden!", width/2, height/2);
    scaleLogo = 1;
    ani.animation.moveOnAxis(logoPos,width-120,height-130, true, 0.3);
  }

}

window.setup = setup;
window.draw = draw;
window.preload = preload;
