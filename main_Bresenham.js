import * as ani from '/src/animaster.js';
//variables for the animation
var fontRegular, fontBold;
let textPos = {
  x: 10,
  y: -20
};
let graphpos = {
  x: 816/3*2 - 175,
  y: 368/3*2 - 100
}
let processpos = {
  x: 816/5,
  y: 368/6
}
let keypointPosition = {
  x: 816/2 - 60,
  y: 368 + 100
}
let linienpunkte = {
  x1: 30,
  y1: 20,
  x2: 85,
  y2: 75
}
let graphPointerXAxis = {
  x: 1,
  y: 0
}
let graphPointerYAxis = {
  x: 0,
  y: 1
}
let markedProcess = 0;
let checkError = "0 = 0"
let textViaProcess = 'Der Startpixel wurde bereits\n im Koordinatensystem markiert';
var errorValue = "f = 2";
var scaleProcess = 0.7;
var scaleLogo = 0.4;
var logoPos = {
  x: 816*2.5-120,
  y: 368*2.5-130
}
//load the fonts
function preload(){
  fontRegular = loadFont('assets/Gill Sans.otf')
  fontBold = loadFont('assets/Gill Sans Bold.otf')
}

function setup() {
  var cnv = createCanvas(816, 368);
  fullscreen();
  frameRate(60);
  cnv.position(0, 0, 'fixed');

  //Create your timeline and set the start of the elements to true. Select the seconds in which you want it to start.
  ani.tl
        .add(function(){ ani.startnr[0] = true}) // 0 - Move Title
        .add(function(){ ani.startnr[1] = true},2) // 1 - Notebook;
        .add(function(){ ani.startnr[2] = true},3) // 2 - Notebookline;
        .add(function(){ ani.startnr[1] = ani.startnr[2] = false; ani.startnr[3] = true},6) //1 - Notebook; 2 - Notebookline; 3 - Move Title too
        .add(function(){ ani.startnr[0] = ani.startnr[3] = false},9) // 0 - Move Title; 3 - Move Title too;
        //next scene (Start- und Endpixel)
        .add(function(){ ani.startnr[5] = true},10) //5 - graph (Headline);
        .add(function(){ ani.startnr[6] = true},11) // 6 - Graph
        .add(function(){ ani.startnr[7] = true},14) // 7 - Move graph right
        .add(function(){ ani.startnr[8] = ani.startnr[12] = true},16)  // 8 - Fill Graph 1
        .add(function(){ ani.startnr[9] = true},20)  // 9 - Fill Graph 2
        .add(function(){ ani.startnr[10] = ani.startnr[13] = true},24) // 10 - Line in Graph
        .add(function(){ ani.startnr[5] = ani.startnr[7] = ani.startnr[12] = ani.startnr[13] = false}, 28) //5 - graph (Headline); // 7 - Move graph right; 12 - graph text; 13 - graph text
        // //next scene (Algorithmus Daten)
        .add(function(){ ani.startnr[11] = true},28) //11 - Move and scale graph;
        .add(function(){ ani.startnr[14] = ani.startnr[15] = true},32) //14 - Keypoints Algorithmusdaten (Headline); 15 - Keypoints;
        .add(function(){ ani.startnr[14] = ani.startnr[15] = false},55) //14 - Keypoints Algorithmusdaten (Headline); 15 - Keypoints;
        //next scene (Algorithmusschritte)
        .add(function(){ ani.startnr[16] = true},56) // 16 - Schritte (Headline)
        .add(function(){ ani.startnr[17] = true},56)//17 - Process
        .add(function(){ ani.startnr[18] = true; ani.startnr[16] = false},75)//18 - close process explaining; 16 - Schritte (Headline) schließen
        .add(function(){ ani.startnr[19] = true},77)//17 - move process
        .add(function(){ ani.startnr[20] = true},78)//20 - Keypoint Daten in miniversion starten
        .add(function(){ ani.startnr[21] = true},78)//21 - Keypoint Daten in miniversion moven
        //next scene (1. Schritt aus dem Prozess)
        .add(function(){ ani.startnr[22] = true},81)//22 - 1. Markierung der Schritt; Text; 1. Pfeil bei der X-Achse anzeigen
        .add(function(){ markedProcess = 1; textViaProcess = 'Mit schneller Richtung 1 Schritt vor'},85) // Im Prozess 1 Schritt weiter (2. Prozessschritt)
        .add(function(){ ani.animation.moveOnAxis(graphPointerXAxis, 2, 0, true)},88) //  Pfeil auf X Achse 1 Schritt weiter
        .add(function(){ ani.startnr[21] = false; markedProcess = 2; textViaProcess = 'Neuen Fehler berechnen'}, 91)// (3. Prozessschritt) Calculate new error
        .add(function(){ ani.startnr[23] = true}, 93)//move data for formula
        .add(function(){ ani.startnr[23] = false; ani.startnr[24] = true}, 100)//move data back
        .add(function(){ ani.startnr[24] = false; markedProcess = 3; textViaProcess = 'Mit langsamer Richtung 1 Schritt vorwärts,\n wenn neuer Fehler =< 0'}, 104) //(4. Prozessschritt)
        .add(function(){ ani.startnr[36] = true; ani.animation.moveOnAxis(graphPointerYAxis, 0, 2, true)},106)// Mit langsamer Richtung 1 Schritt vorwärts
        .add(function(){ ani.startnr[36] = false; markedProcess = 4; textViaProcess = 'Markiere den Pixel'}, 110) // Im Prozess 1 Schritt weiter (2. Markierung)
        .add(function(){ ani.startnr[25] = true; }, 112)
        .add(function(){ markedProcess = 5; textViaProcess = 'Neuen Fehler berechnen,\n wenn langsame Richtung vorwärts gegangen ist'}, 115) // Im Prozess 1 Schritt weiter (Fehler neu berechnen)
        .add(function(){ ani.startnr[26] = true}, 117)
        .add(function(){ ani.startnr[26] = false; ani.startnr[27] = true}, 124)
        .add(function(){ ani.graphics.focuseProcessArrow(255); markedProcess = 1; ani.animation.moveOnAxis(graphPointerXAxis, 3, 0, true); textViaProcess = 'Mit schneller Richtung 1 Schritt vor'}, 128)
        .add(function(){ ani.graphics.focuseProcessArrow(125)}, 130)
        .add(function(){ ani.startnr[27] = false; ani.startnr[28] = true; markedProcess = 2}, 130) // Calculate the new error (Prozessschritt 3)
        .add(function(){ ani.startnr[28] = false; ani.startnr[29] = true}, 135) // Moving data elements back, change error value
        .add(function(){ ani.startnr[29] = false; markedProcess = 3; textViaProcess = 'Mit langsamer Richtung 1 Schritt vorwärts,\n wenn neuer Fehler =< 0'}, 139) //change error
        .add(function(){ checkError = "2 > 0"; ani.startnr[36] = true;}, 141)
        .add(function(){ ani.startnr[36] = false; markedProcess = 4; textViaProcess = 'Markiere den Pixel'}, 144)
        .add(function(){ ani.startnr[30] = true}, 146)
        .add(function(){ markedProcess = 5; textViaProcess = 'Neuen Fehler berechnen,\n wenn langsame Richtung vorwärts gegangen ist'}, 150)
        .add(function(){ ani.graphics.focuseProcessArrow(255); markedProcess = 1; ani.animation.moveOnAxis(graphPointerXAxis, 3, 0, true); textViaProcess = 'Mit schneller Richtung 1 Schritt vor'}, 152)
        .add(function(){ ani.graphics.focuseProcessArrow(125); ani.animation.moveOnAxis(graphPointerXAxis, 4, 0, true)}, 154) // transparent processRepeatArrow and Pfeil auf X Achse 1 Schrit vorwärts
        .add(function(){ ani.startnr[31] = true; markedProcess = 2; textViaProcess = 'Neuen Fehler berechnen'},156) // Calculate new error (Prozessschritt 3)
        .add(function(){ ani.startnr[31] = false; ani.startnr[32]=true},162)
        .add(function(){ ani.startnr[32] = false; markedProcess = 3; textViaProcess = 'Mit langsamer Richtung 1 Schritt vorwärts,\n wenn neuer Fehler =< 0'}, 166) //change error
        .add(function(){ checkError = "0 = 0"; ani.startnr[36] = true; ani.animation.moveOnAxis(graphPointerYAxis, 0, 3, true)},168)// Mit langsamer Richtung 1 Schritt vorwärts
        .add(function(){ ani.startnr[36] = false; markedProcess = 4; textViaProcess = 'Markiere den Pixel'}, 172) // Im Prozess 1 Schritt weiter (2. Markierung)
        .add(function(){ ani.startnr[33] = true}, 173)
        // new scene
        .add(function(){ ani.startnr[16] = ani.startnr[17] =  ani.startnr[18] = ani.startnr[19] = ani.startnr[20] = ani.startnr[21] = ani.startnr[22] = false}, 175)
        .add(function(){ scaleProcess = 1; ani.startnr[11] = false; ani.animation.moveOnAxis(graphpos, 816/2 - 175, 368/2 - 100, true);}, 175)//change scale of graph and move it in the middle
        .add(function(){ ani.startnr[34] = true}, 175)
        // next scene
        .add(function(){ ani.startnr[6] = ani.startnr[8] = ani.startnr[9] = ani.startnr[10] = ani.startnr[25] = ani.startnr[30] = ani.startnr[33] = ani.startnr[34] = false;}, 180)
        .add(function(){ ani.startnr[35] = true},180)

  fill(255,255,255);
  textFont(fontRegular);

  //exporting the bresenham video as mp4
  //ani.exportAsMP4("bresenham", 15);

}

function draw(){
  background(5,0,58);
  strokeWeight(10);

  //animaster logo
  push();
  scale(scaleLogo);
  ani.icons.animasterlogo(logoPos.x, logoPos.y);
  pop();

  //display the animation title
  if(ani.startnr[0] == true){
    push();
    //move the title on the y-axis
    if(ani.startnr[3] == true){
      fill(0,244,197)
      ani.animation.moveOnAxis(textPos, textPos.x, 100, ani.startnr[3]);
    }
    textSize(50);
    translate(width/2, 30);
    textAlign(CENTER, CENTER);
    var title = text('MIT DEM \n BRESENHAM ALGORITHMUS', textPos.x, textPos.y);
    pop();
  }

  //settings for the following text
  textAlign(CENTER, CENTER);
  textSize(18);
  strokeWeight(1);
  //text
  if(ani.startnr[1] == true){
    push();
    text('Wie zeichnet der Computer eine Linie auf dem Bildschirm?', width/2, height/4);
    pop();
  }

  //notebook icon with a loading line
  push();
  ani.icons.notebook(width/2 - 100,height/2 - 50,200,ani.startnr[1]);
  stroke(229,23,131);
  strokeWeight(5);
  ani.icons.loadingline(width/2 - 50,height/2 + 20, width/2 + 50,height/2 - 20, ani.startnr[2]);
  pop();
  //text
  if(ani.startnr[5] == true){
    text('Wir gehen davon aus, das Koordinatensystem ist ein Bildschirm und die Kästen die einzelnen Pixel:', width/2, height/6);
  }
  //text
  if(ani.startnr[12] == true){
    textAlign(LEFT, BASELINE)
    text('Eine Reihe an Pixeln soll von Pixel 1 zu Pixel 2 erstellt werden.', width/8, height/3, 350, 200);
  }
  //text
  if(ani.startnr[13] == true){
    textAlign(LEFT, BASELINE)
    text('Hierzu wird eine Hilfslinie zwischen den Punkten erstellt.', width/8, height/2, 350, 200);
  }

  push();
  //move the coordinate system to the right
  ani.animation.moveOnAxis(graphpos, 816/2 + 60, graphpos.y, ani.startnr[7]);
  if(ani.startnr[11] == true){
    //scale the coordinate system and move it into the top-right corner
    scale(scaleProcess);
    ani.animation.moveOnAxis(graphpos, 816 - 30, height/5, ani.startnr[11]);
  }
  //create the coordinate system
  ani.graphics.graph(width/3,height/2-50,graphpos.x, graphpos.y,10, ani.startnr[6]);
  //fill the coordinate system
  ani.graphics.fillgraph(2,2, ani.startnr[8]);
  ani.graphics.fillgraph(6,4, ani.startnr[9]);

  //these squares come at a later time
  ani.graphics.fillgraph(3,3, ani.startnr[25]);
  ani.graphics.fillgraph(4,3, ani.startnr[30]);
  ani.graphics.fillgraph(5,4, ani.startnr[33]);

  stroke(229,23,131)
  strokeWeight(5)
  //create a line between the first an second (last) square
  ani.graphics.graphline(2,2,6,4, ani.startnr[10]);
  pop();

  //Headline
  if(ani.startnr[14] == true){
    textAlign(CENTER);
    text('Folgende Daten werden für den Algorithmus benötigt und vorher berechnet:', width/2, 30);
  }

  //the data (content) for the key points
  var data = {
    keyPoint1: {
      icon: "",
      textIcon: "dx",
      title: "",
      text: "Differenz zwischen den Werten der X-Achse: \ndx = x1 - x0",
      value: "4",
    },
    keyPoint2: {
      icon: "",
      textIcon: "dy",
      title: "",
      text: "Differenz zwischen den Werten der Y-Achse: \ndy = y1 - y0",
      value: "2",
    },
    keyPoint3: {
      icon: "icons.forewordArrow();",
      textIcon: "",
      title: "",
      text: "Die schnelle Richtung ist die Achsendifferenz die schneller ansteigt.",
      value: "dx",
    },
    keyPoint4: {
      icon: "icons.error();",
      textIcon: "",
      title: "",
      text: "Der Anfangsfehler ist die Halbierung der schnellen Richtung: \nf = dx/2",
      value: errorValue,
    },
  }
  //the key points filled with the data
  ani.graphics.keyPoints(data, width/7, height/3, ani.fullversion, ani.startnr[15]);

  //Headline
  if(ani.startnr[16] == true){
    textAlign(CENTER);
    text('Folgende Schritte sind zur Berechnung der Pixelpositionen notwenig:', width/2, 30);
  }
  //the content for the process graphic
  var processSteps = {
    step1: {
      title: "",
      text: "Markiere den 1. Pixel",
      icon: "icons.marker();",
    },
    step2: {
      title: "",
      text: "Gehe mit schneller Richtung 1 Schritt vorwärts",
      icon: "icons.forewordArrow();",
    },
    step3: {
      title: "",
      text: "Fehler neu berechnen: \nf1 = f - langsame Richtung",
      icon: "icons.error();",
    },
    step4: {
      title: "",
      text: "Wenn f1 =< 0, dann gehe mit langsamer Richtung 1 Schritt vorwärts",
      icon: "icons.forewordArrow();",
    },
    step5: {
      title: "",
      text: "Markiere den aktuellen Pixel",
      icon: "icons.marker();",
    },
    step6: {
      title: "",
      text: "Falls die langsame Richtung einen Schritt \nvorwärts gegangen ist, berechne den Fehler neu: \nf2 = f1 + schnelle Richtung",
      icon: "icons.error();",
    }
  }
  //process graphic filled with the data
  push();
  scale(0.8);
  ani.graphics.process(processSteps, processpos.x, processpos.y, ani.startnr[17]);
  ani.graphics.processRepeatArrow(1,5, ani.startnr[17]);
  pop();
  //minimize the process graphic
  ani.graphics.processClose(ani.startnr[18]);
  //move it to the left side
  ani.animation.moveOnAxis(processpos, 70, height/7, ani.startnr[19]);

  //display the key points in the mini-version and move them
  push();
  scale(0.8);
  ani.graphics.keyPoints(data, keypointPosition.x, keypointPosition.y, ani.mini, ani.startnr[20], ani.noAnimation);
  //mark the speficic process step
  ani.graphics.processMark(markedProcess, ani.startnr[22]);
  pop();
  //moves the keypoints in the canvas
  ani.animation.moveOnAxis(keypointPosition, width/2 - 60, height + 10, ani.startnr[21]);
  //explains the process step
  if(ani.startnr[22] == true){
    textAlign(CENTER);
    text(textViaProcess, width/2 - 100, height/8);
  }
  push();
  //the graph pointer are the arrows on the coordinate system
  scale(scaleProcess); // because the coordinate system was also scaled
  ani.graphics.graphPointer(graphPointerXAxis.x,0,"x",ani.startnr[22]);
  ani.graphics.graphPointer(0,graphPointerYAxis.y,"y",ani.startnr[22]);
  pop();

  push();
  scale(0.8);
  //circle(width/2 + 70, height/2 +40, 100);
  pop();
  // Calculate the error (Process step 3)
  if(ani.startnr[23] === true || ani.startnr[28] === true || ani.startnr[31] === true){
    push();
    //createCanvas(816, 368);
    ani.mathSymbols.equal(width/5 + 40,height/2,1, ani.startnr[22]);
    ani.graphics.keyPointMoving(3, width/2 - 80, height/2 +50, ani.startnr[22], 0.4);
    ani.mathSymbols.minus(width/3 + 50,height/2,1, ani.startnr[22]);
    ani.graphics.keyPointMoving(1, width/2+65, height/2 + 50, ani.startnr[22], 0.4);
    ani.mathSymbols.equal(width/2 + 30,height/2,1, ani.startnr[22]);
    stroke(0,244,197);
    fill(0,244,197);
    textSize(58);
    strokeWeight(2);
    //changes the error values
    if(ani.startnr[23] === true){
      text("f 1", width/5, height/2);
      text("0", width/2 + 65, height/2);
    }else if(ani.startnr[28] === true){
      text("f 3", width/5, height/2);
      text("2", width/2 + 65, height/2);
    }else if(ani.startnr[31] === true){
      text("f 4", width/5, height/2);
      text("0", width/2 + 65, height/2);
    }
    pop();
  }
  // Moving data elements back, change error value inside the key point
  if(ani.startnr[24] === true || ani.startnr[29] === true || ani.startnr[32] === true){
    ani.graphics.keyPointMoving(3, width/2 + 300, height + 10, true, 0.4);
    ani.graphics.keyPointMoving(1, width/2 + 60, height + 10, true, 0.4);
    if(ani.startnr[24] === true){
      errorValue = "f 1= 0";
    }else if(ani.startnr[29] === true){
      errorValue = "f 3= 2";
    }else if(ani.startnr[32] === true){
      errorValue = "f 4= 0";
    }
  }
  //calculate the new error
  if(ani.startnr[26] === true){
    push();
    ani.mathSymbols.equal(width/5 + 40,height/2,1, true);
    ani.graphics.keyPointMoving(3, width/2 - 80, height/2 +50, true, 0.4);
    ani.mathSymbols.plus(width/3 + 50,height/2,1, true);
    ani.graphics.keyPointMoving(0, width/2+65, height/2 + 50, true, 0.4);
    ani.mathSymbols.equal(width/2 + 30,height/2,1, true);
    stroke(0,244,197);
    fill(0,244,197);
    textSize(58);
    strokeWeight(2);
    text("f 2", width/5, height/2);
    text("4", width/2 + 65, height/2);
    pop();
  }
  if(ani.startnr[27] === true){
    ani.graphics.keyPointMoving(3, width/2 + 300, height + 10, true, 0.4);
    ani.graphics.keyPointMoving(0, width/2 - 60, height + 10, true, 0.4);
    errorValue = "f 2= 4";
  }
  //text
  if(ani.startnr[34] == true){
    textAlign(CENTER);
    text('Der letzte Pixel der Linie wurde erreicht und der Algorithmus abgeschlossen', width/2, 30);
  }
  //the end title and the logo (penguin)
  if(ani.startnr[35] === true){
      fill(0,244,197);
      textSize(54);
      text("Das war der Bresenham Algorithmus", width/2, height/2);
      scaleLogo = 1;
      ani.animation.moveOnAxis(logoPos,width-120,height-130, true, 0.3);
  }

  if(ani.startnr[36] === true){
    push();
    fill(0,244,197);
    textSize(58);
    text(checkError, width/2 - 100, height/3);
    pop();
  }

}


window.preload= preload;
window.setup = setup;
window.draw = draw;
