//Beim Pogrammieren des Codes, orientierte ich mich als Hilfestellung
//an dem Code von Herrn Shiffmann aus dem Buch "Nature of code" sowie aus seinen YouTube Tutorials, um
//einen genaueren Eindruck von P5.js zu bekommen.
//Des Weitern orientierte ich mich an Codebeispielen der Seite https://p5js.org/reference/.
//Als eine zusätzliche Hilfestellung bei der Programmierung verwendete ich
//die Dokumentation der GSAP-Bibliothek https://greensock.com/docs/.
//Für die Canvas-Aufnahme orientierte ich mich an folgender Quelle: https://medium.com/@amatewasu/how-to-record-a-canvas-element-d4d0826d3591

import * as p5 from '../node_modules/p5/lib/p5.js';
import { gsap, TweenLite, TweenMax, TimelineLite, TimelineMax, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ } from '../node_modules/gsap/index.js';

//The queue for the individual animations
var startnr = [];
for(var i = 0; i <=100; i++){
 startnr.push(false);
}

//creates a timeline named "tl"
var tl = gsap.timeline({
  defaults: {ease: "power1.inOut"}
})

//Variables that are exported for the user
//These variables are used in the function keyPoints()
var mini= "mini";
var fullversion= "fullversion";
var withAnimation= "withAnimation";
var noAnimation= "noAnimation";

//Main colors
var green = 'rgb(0,244,197)';
var darkblue= 'rgb(5,0,58)';
var blue= 'rgb(0,0,137)';
var pink= 'rgb(229,23,131)';

//graphics for content visualization
var graphics = {
  //Variables for the graph and the fill-animation
  growGraph: 2,
  growGraphX: 0,
  growGraphY: 0,
  graphpositionx: undefined,
  graphpositiony: undefined,
  steps: undefined,
  xlength: undefined,
  ylength: undefined,
  //Variables to load the graph
  loadingstartX: 0,
  loadingstartY: 0,
  loadingstopX: false,
  loadingstopY: false,
  //Variables for the keypoint graphic
  firstkeypointpos: {},
  keypointParameter: {},
  keypointpos: [],
  count: 0,
  countloop: 0,
  keystep: 120,
  //Variables for the process graphic
  processColor: {
    color0: {
      r: 153,
      g: 0,
      b: 79
    },
    color1: {
      r: 230,
      g: 208,
      b: 46
    },
    color2: {
      r: 229,
      g: 23,
      b: 131
    },
    color3: {
      r: 0,
      g: 203,
      b: 230
    },
    color4: {
      r: 8,
      g: 136,
      b: 153
    },
  },
  processRectangleSize: {},
  processStepPositions: [],
  processSize: 50,
  processContent: {},
  saveContentOneTime:0,
  countProcess: 0,
  arrowAlpha: 125,

  //The graph (coordinate system)
  graph: function(xl,yl,positionx, positiony, xSteps, startnr){
    if(startnr === true){
      push();
      //Position wird global gespeichert um sie gegebenenfalls animieren zu können
      this.graphpositionx = positionx;
      this.graphpositiony = positiony;

      //x and y length, and the grid number
      this.xlength = this.graphpositionx + xl;
      this.ylength = this.graphpositiony + yl;
      this.steps = xl / xSteps;

      //load x and y
      this.growGraph += 4;
      let loadx = this.graphpositionx + this.growGraph;
      let loady = this.ylength - this.growGraph;
      if(loadx >= this.xlength){
        loadx = this.xlength;
      }
      if(loady <= this.graphpositiony){
        loady = this.graphpositiony;
      }

      //Grid
      stroke(0,0,137);
      strokeWeight(5);
      //Grid lines for the y-direction
      for(let y = this.ylength; y >= this.graphpositiony; y -= this.steps){
        line(this.graphpositionx, y, loadx, y);
      }
      //Grid lines for the x-direction
      for(let x = this.graphpositionx; x <= this.xlength; x += this.steps){
        line(x, loady, x, this.ylength);
      }
      pop();

      push();
      //x- and y-axis
      stroke(255);
      strokeWeight(10);
      //x-axis line
      var xaxis = line(positionx, this.ylength, loadx, this.ylength);
      //y-axis line
      var yaxis = line(positionx, loady, positionx, this.ylength);

      //x- and y-arrows
      fill(0,0,137);
      stroke(0,0,137);
      strokeJoin(ROUND);
      circle(positionx, this.ylength, 20);
      //y-arrow
      triangle(positionx, positiony - 5, positionx + 15, positiony + 30, positionx - 15, positiony + 30);
      //x-arrow
      triangle(this.xlength  + 5, this.ylength, this.xlength - 30, this.ylength + 15, this.xlength - 30, this.ylength - 15);
      pop();

    }
  },
  //Fill the graph
  fillgraph: function(xValue,yValue, startnr){
    if(startnr === true){
      push();
      //Calculate the x and y position
      var xpos = this.graphpositionx - this.steps + (this.steps*xValue);
      var ypos = this.ylength - (this.steps*yValue);
      //If the position is outside the coordinate system
      if(xpos >= this.xlength || ypos < this.graphpositiony){
        noLoop();
        console.error("The selected area of the square with the values: (" + xValue + "," + yValue + ") is not within the diagram." );
      }else{
      fill(0,244,197);
      stroke(0,0,137);
      strokeWeight(5);
      square(xpos,ypos,this.steps);
      fill(0,255,70);
      }
      pop();
    }
  },
  //Create a line in the graph between points
  graphline: function(xValueStart,yValueStart,xValueEnd,yValueEnd,startnr){
    if(startnr == true){
      push()

      let startX = this.graphpositionx + (this.steps*xValueStart) - this.steps/2;
      let startY = this.ylength - (this.steps*yValueStart) + this.steps/2;
      let endX = this.graphpositionx + (this.steps*xValueEnd) - this.steps/2;
      let endY = this.ylength - (this.steps*yValueEnd) + this.steps/2;

      let stepsX = Math.abs((startX - endX) / 100);
      let stepsY = Math.abs((startY - endY) / 100);
      this.growGraphX += stepsX;
      this.growGraphY += stepsY;

      //load the pointline
      //Load the X-axis
      if(Math.ceil(this.loadingstartX) === Math.ceil(endX) || this.loadingstopX == true){
        this.loadingstartX = endX;
        this.loadingstopX = true;
      } else if(startX > endX){
        this.loadingstartX = startX - this.growGraphX;
      } else if(startX < endX){
        this.loadingstartX = startX + this.growGraphX;
      }

      //Load the Y-axis
      if(Math.ceil(this.loadingstartY) === Math.ceil(endY) || this.loadingstopY == true){
        this.loadingstartY = endY;
        this.loadingstopY = true;
      } else if(startY > endY){
        this.loadingstartY = startY - this.growGraphY;
      } else if(startY < endY){
        this.loadingstartY = startY + this.growGraphY;
      }

      //Create the line with the parameter
      var pline = line(startX, startY, this.loadingstartX, this.loadingstartY);
      pop();
    }
  },
  //An arrow pointing to a specific value of the X or Y axis
  Pointer: function(x,y,r){
    push();
    noFill();
    strokeWeight(3);
    stroke(0,244,197);
    translate(x,y);
    angleMode(DEGREES);
    rotate(r);
    line(-5,0,5,-10);
    line(5,-10,15,0);
    line(5,-10,5,25);
    pop();
  },
  graphPointer: function(xposition, yposition, axis, startnr){
    if(startnr === true){
      let x = this.graphpositionx + (this.steps*xposition) + this.steps/2;
      let y = this.ylength - (this.steps*yposition) - this.steps/2;
      //create a new pointer instance
      if(axis === "x"){
        var pointerX = new graphics.Pointer(x,this.ylength + this.steps, 0);
      }else if(axis === "y"){
        var pointerY = new graphics.Pointer(this.graphpositionx - this.steps,y, 90);
      }
    }
  },

  //Graphic for processes
  process: function(content, posx, posy, startnr, pwidth=400, pheight=50){
    if(startnr === true){
      push();
      this.processSize = pheight;
      let distance = 0;
      let count = 0;
      const numberOfContent = Object.keys(content).length;
      let colorCount = 0;
      //save the rectanglesize for the processClose function
      if(this.saveContentOneTime < 1){
        this.processContent = content;
        this.processRectangleSize = {
            width: pwidth,
            height: pheight
        }
        this.saveContentOneTime +=1;
      }

      //For each step of the process create the following:
      for (var step in this.processContent) {
        //5 colors
        if(colorCount > 4){
          colorCount = 0;
        }

        //Grey rectangle in the background
        noStroke();
        fill(100,100,100);
        rect(posx + 3, posy + 3 + distance, this.processRectangleSize.width, this.processRectangleSize.height, 50);

        //a connecting line is created between each step
        //change color for every line (stroke)
        if(count < Object.keys(this.processColor).length){
          strokeWeight(4);
          stroke(Object.values(this.processColor)[colorCount].r,Object.values(this.processColor)[colorCount].g,Object.values(this.processColor)[colorCount].b);
          line(posx + 25, posy + distance + (pheight/2), posx + (pheight/2), posy + distance + 60);
        }
        //White rectangle in the foreground
        noStroke();
        fill(255,255,255);
        rect(posx, posy + distance, this.processRectangleSize.width, this.processRectangleSize.height, 50);

        //save the position of every step
        this.processStepPositions[count] = {
          step: {
            positionx: posx,
            positiony: posy + distance
          }
        }

        //create a circle containing the respective icon
        fill(Object.values(this.processColor)[colorCount].r,Object.values(this.processColor)[colorCount].g,Object.values(this.processColor)[colorCount].b);
        ellipseMode(CORNER);
        circle(posx, posy + distance, pheight);
        for (var key in content[step]) {
          textAlign(CENTER, BASELINE)
          textSize(12);
          fill(100,100,100);
          var input = text(this.processContent[step].text, posx + 50, posy + distance + 15, 350);
          push();
          translate(posx + (pheight/5)+5,posy + distance + pheight/5);
          var img = eval(content[step].icon);
          pop();
        }
        distance += 60;
        colorCount += 1;
        count +=1;
      }
      pop();
    }
  },
  //Minimize the process graphic
  processClose: function(startnr){
    if(startnr === true){
      //get the old width and height
      let oldwidth = this.processRectangleSize.width;
      let oldheight = this.processRectangleSize.height;
      let newsize = this.processRectangleSize.height;
      //animate the old bar size to the new one
      gsap.fromTo(this.processRectangleSize, {width: oldwidth, height: oldheight, duration: 0.5}, {width: newsize, height: newsize, duration: 1});
      for(var step in this.processContent){
        this.processContent[step].text = "";
      }
    }
  },
  //An arrow for a step repetition
  processRepeatArrow: function(step1, step2, startnr){
    if(startnr === true){
      push();
      //get the positions of the start- and end step
      var step1 = this.processStepPositions[step1];
      var step2 = this.processStepPositions[step2];
      strokeWeight(5);
      stroke(255,255,255,this.arrowAlpha);
      noFill();
      //create an arrow from the start to the end step
      arc(Object.values(step1)[0].positionx, (Object.values(step1)[0].positiony+Object.values(step2)[0].positiony)/2 + this.processSize/2, (Object.values(step2)[0].positiony - Object.values(step1)[0].positiony)/2, Object.values(step2)[0].positiony - Object.values(step1)[0].positiony, radians(90), radians(270));
      translate(Object.values(step1)[0].positionx - 10, Object.values(step1)[0].positiony + 10);
      icons.arrow(this.arrowAlpha);
      pop();
    }
  },
  //Focus the arrow when a step is repeated
  focuseProcessArrow: function(alpha){
    //set the transparency of the arrow
    this.arrowAlpha= alpha;
    return this.arrowAlpha
  },
  //Mark a specific step to highlight it
  processMark: function(markedStep, startnr, pheight=50){
    if(startnr === true ){
      push();
      noFill();
      strokeWeight(8);
      stroke('rgba(255,255,255, 0.7)');
      ellipseMode(CORNER);
      circle(this.processStepPositions[markedStep].step.positionx - 2, this.processStepPositions[markedStep].step.positiony - 2, pheight + 4);
      pop();
    }
  },

  //Create a graphic for key points
  keyPoints: function(content, positionx, positiony, type=fullversion, startnr, animationStatus = withAnimation){
    if(startnr === true){
      push();
      var x = positionx;
      var y = positiony;
      var countPoints = 0;
      //The positions are saved globally to be able to animate them later if necessary
      if(this.keypointParameter.x !== x || this.keypointParameter.y !== y){
        this.firstkeypointpos.x = x;
        this.firstkeypointpos.y = y;
        this.keypointParameter.x = x;
        this.keypointParameter.y = y;
        this.countloop = 0;
      }

      var contentLength = Object.keys(content).length;
      //"shading" changes the shading of the color from point to point
      var shadingG = 0;
      var shadingB = 0;
      var distance = 0;
      //As many key points as specified in the content
      for(var point in content){
        var xposition = x + distance;
        var yposition = y;

        //set the position of the speficic key point
        if(this.countloop < contentLength){
          this.keypointpos[countPoints] = {
            x: xposition,
            y: yposition
          }
          this.countloop += 1;
        }
        if(countPoints > contentLength){
          var shadingG = 0;
          var shadingB = 0;
          var countPoints = 0;
        }
        //create a circle at the specific position
        xposition = this.keypointpos[countPoints].x;
        yposition = this.keypointpos[countPoints].y;
        noStroke();
        fill(0,244 - shadingG, 197 - shadingB);
        var c = circle(xposition, yposition, 100);

        if(type === fullversion){
          stroke(0,244 - shadingG, 197 - shadingB);
          strokeWeight(5);
          line(xposition, yposition, xposition, yposition + 75);
        }

        push();
        fill(255,255,255);
        push();
        //if icon is empty, create the alternative texticon
        if(content[point].icon === ""){
          textSize(38);
          translate(xposition, yposition - 20);
          var icon = text(content[point].textIcon, 0, 0);
        }else{
          translate(xposition - 10, yposition - 30);
          var icon = eval(content[point].icon);
        }
        pop();

        noStroke();
        //if the type is "fullversion", display the text
        if(type === fullversion){
          textSize(14);
          var input = text(content[point].text, xposition - 50, yposition + 100, 100);
        }
        textSize(28);
        fill(5,0,58);
        var value = text(content[point].value, xposition, yposition + 20);
        pop();

        shadingG += 43;
        shadingB += 32;
        countPoints += 1;
        distance += 120;
      }
      if(animationStatus === withAnimation){
        this.keyPointMark(contentLength, positionx, positiony, true);
      }
      pop();
    }
  },
  //Mark a specific key point
  keyPointMark: function(contentLength, positionx, positiony, startnr){
    if(startnr === true ){
      push();
      noFill();
      strokeWeight(3);
      stroke('rgba(255,255,255, 0.7)');
      //create a circle around the keyPoint-circle
      circle(this.firstkeypointpos.x, this.firstkeypointpos.y, 110);
      //move the circle from the first point to the last point
      if(Math.floor(this.firstkeypointpos.x) <= positionx + (120 * contentLength) - 240){
        this.keystep = this.keystep * this.countMove;
        gsap.to(this.firstkeypointpos, {x: this.firstkeypointpos.x + 120, y: this.firstkeypointpos.y, duration: 1, delay: 5});
      }
      pop();
    }
  },
  //move the keypoint-graphic from the current position to a new position
  keyPointMoving: function(keypointNumber, newXposition, newYposition, startnr, d=0.5){
    if(startnr === true){
      animation.moveOnAxis(this.keypointpos[keypointNumber], newXposition, newYposition, true, d);
    }
  },
}

//mathematical symbols
var mathSymbols = {
  //Create mathematical symbols
  // +
  plus: function(x, y, size, startnr){
    push();
    if(startnr === true){
      stroke(229,23,131);
      strokeWeight(4+size);
      line(x, y - 10 * size, x, y + 10 * size);
      line(x - 10 * size, y, x + 10 * size, y);
    }
    pop();
  },
  // =
  equal: function(x, y, size, startnr){
    push();
    if(startnr === true){
      stroke(229,23,131);
      strokeWeight(4+size);
      line(x - 10 * size, y - 5 * size, x + 10 * size, y - 5 * size);
      line(x - 10 * size, y + 5 * size, x + 10 * size, y + 5 * size);
    }
    pop();
  },
  // *
  multiply: function(x, y, size, startnr){
    push();
    if(startnr === true){
      fill(229,23,131);
      strokeWeight(2*size);
      textSize(60 * size);
      text('*', x, y);
    }
    pop();
  },
  // ÷
  divide: function(x, y, size, startnr){
    push();
    if(startnr === true){
      fill(229,23,131);
      strokeWeight(4+size);
      line(x - 10 * size, y, x + 10 * size, y);
      strokeWeight(8+size);
      point(x, y - 10 * size);
      point(x, y + 10 * size);
    }
    pop();
  },
  // -
  minus:function(x, y, size, startnr){
    push();
    if(startnr === true){
      stroke(229,23,131);
      strokeWeight(4+size);
      line(x - 10 * size, y, x + 10 * size, y);
    }
    pop();
  },
}

//different icons (for example a "marker" or the "animasterlogo")
var icons = {
  //Variables for the loadingline
  loadinglineX: 0,
  loadinglineY: 0,
  growLineX: 0,
  growLineY: 0,

  //the animasterlogo (a penguin)
  animasterlogo: function(x,y){
    push();
    //Head and eyes
    noStroke();
    fill(0,0,0);
    circle(x, y+2, 100);
    fill(255,255,255);
    circle(x+26, y, 41);
    circle(x-26, y, 41);
    fill(0,0,0);
    circle(x+22, y, 8);
    circle(x-22, y, 8);

    //Belly
    stroke(255,255,255);
    fill(255,255);
    strokeWeight(2);
    beginShape();
    curveVertex(x, y);
    curveVertex(x-30, y+10);
    curveVertex(x+38, y+10);
    curveVertex(x+30, y+30);
    curveVertex(x+40, y+105);
    curveVertex(x-40, y+105);
    curveVertex(x-30, y+30);
    curveVertex(x-40, y+10);
    curveVertex(x, y);
    endShape();
    pop();


    //left flipper
    stroke(0,0,0);
    fill(0);
    strokeWeight(2);
    push();
    beginShape();
    curveVertex(x, y+20);
    curveVertex(x-32, y+36);
    curveVertex(x-47, y+100);
    curveVertex(x-53, y+115);
    curveVertex(x-57, y+75);
    curveVertex(x-32, y+36);
    curveVertex(x+32, y+55);
    endShape();
    pop();

    //right flipper
    push();
    beginShape();
    curveVertex(x+60, y+20);
    curveVertex(x+33, y+38);
    curveVertex(x+67, y);
    curveVertex(x+81, y-15);
    curveVertex(x+76, y+25);
    curveVertex(x+33, y+38);
    curveVertex(x+92, y+55);
    endShape();
    pop();

    //right foot
    fill(255,24,0);
    noStroke();
    beginShape();
    curveVertex(x+25,y+100);
    curveVertex(x+5,y+120);
    curveVertex(x+20,y+105);
    curveVertex(x+35,y+120);
    curveVertex(x+25,y+117);
    curveVertex(x+20,y+120);
    curveVertex(x+15,y+117);
    curveVertex(x+5,y+120);
    curveVertex(x, y+100);
    endShape();

    //left foot
    beginShape();
    curveVertex(x-25,y+100);
    curveVertex(x-5,y+100);
    curveVertex(x-20,y+115);
    curveVertex(x-35,y+100);
    curveVertex(x-25,y+103);
    curveVertex(x-20,y+100);
    curveVertex(x-15,y+103);
    curveVertex(x-5,y+100);
    curveVertex(x, y+100);
    endShape();

    //beak
    push();
    noStroke();
    fill(255,136,0);
    translate(x, y);
    angleMode(RADIANS)
    rotate(PI/4.0);
    square(0, 0, 20);
    pop();
  },
  //a save-icon (a disc)
  save: function(positionx, positiony, startnr, size=1){
    if(startnr === true){
      push();
      strokeWeight(3);
      beginShape();
      vertex(positionx,positiony);
      vertex(positionx+25*size,positiony);
      vertex(positionx+35*size,positiony+10*size);
      vertex(positionx+35*size,positiony+35*size);
      vertex(positionx,positiony+35*size);
      vertex(positionx,positiony);
      endShape();
      strokeWeight(2);
      rect(positionx+5, positiony, 15*size, 10*size,2);
      rect(positionx+5, (positiony+35*size)-(15*size), 20*size, 15*size,2);
      pop();
    }
  },
  //a restore-icon (circle arrow)
  restore: function(positionx, positiony, startnr, size=1){
    strokeWeight(3);
    noFill();
    arc(positionx, positiony, 35*size, 35*size, PI + QUARTER_PI, HALF_PI);
    line(positionx-12*size, positiony-12*size, positionx-10*size, positiony-20*size);
    line(positionx-12*size, positiony-12*size, positionx-5*size, positiony-10*size);

  },
  //a notebook
  notebook: function(positionx, positiony, size, startnr){
    if(startnr === true){
      push();
      let ax = positionx;
      let ay = positiony;
      let bx = positionx + size;
      let by = positiony;
      let cx = positionx + size;
      let cy = positiony + size/2;
      let dx = positionx;
      let dy = positiony + size/2;

      noFill();
      strokeWeight(4);
      strokeCap(ROUND);
      stroke(255,255,255);
      stroke(0,244,197);
      rect(ax, ay, size, size/2, 5, 5, 0, 0);
      // quad(ax, ay, bx, by, cx, cy, dx, dy);
      quad(dx, dy, cx, cy, cx + (size/5),  cy + (size/5), dx - (size/5), dy + (size/5));
      fill(255,255,255);
      noStroke();
      rect(ax + (size*5/100), ay + (size*5/100), (size*90/100), (size/2) - (size*10/100), 5);
      // quad(ax + (size*5/100), ay + (size*5/100), bx - (size*5/100), by + (size*5/100), cx - (size*5/100), cy - (size*5/100), dx + (size*5/100), dy - (size*5/100));
      pop();
    }
  },
  //a loading line that begins and ends as desired
  loadingline: function(xValueStart,yValueStart,xValueEnd,yValueEnd,startnr){
    if(startnr == true){
      push()
      let stepsX = Math.abs((xValueStart - xValueEnd) / 100);
      let stepsY = Math.abs((yValueStart - yValueEnd) / 100);
      this.growLineX += stepsX;
      this.growLineY += stepsY;

      //load the pointline
      //Load the X-axis
      if(Math.ceil(this.loadinglineX) === Math.ceil(xValueEnd) || xValueStart === xValueEnd){
        this.loadinglineX = xValueEnd;
      } else if(xValueStart > xValueEnd){
        this.loadinglineX = xValueStart - this.growLineX;
      } else if(xValueStart < xValueEnd){
        this.loadinglineX = xValueStart + this.growLineX;
      }
      //Load the Y-axis
      if(Math.ceil(this.loadinglineY) === Math.ceil(yValueEnd) || yValueStart === yValueEnd){
        this.loadinglineY = yValueEnd;
      } else if(yValueStart > yValueEnd){
        this.loadinglineY = yValueStart - this.growLineY;
      } else if(yValueStart < yValueEnd){
        this.loadinglineY = yValueStart + this.growLineY;
      }

      //Create the line with the parameter
      var li = line(xValueStart, yValueStart, this.loadinglineX, this.loadinglineY);
      pop();
    }
  },
  //a marker
  marker: function(size=1){
    push();
    noStroke();
    scale(size);
    angleMode(RADIANS)
    rotate(-1.0);
    translate(-30,10);
    fill(255,255,255);
    rect(10, 0, 30, 12, 3); //14
    fill(230, 228, 228);
    rect(10, 0, 30, 5, 3);
    fill(88,88,88);
    triangle(10, 1, 10, 11, 1, 6);
    fill(255,255,255);
    beginShape();
    vertex(0,4);
    vertex(4,4);
    vertex(4,8);
    vertex(1, 8);
    endShape(CLOSE);
    pop();
  },
  //a foreword arrow (two arrows in a row)
  forewordArrow: function(size=1){
    push();
    scale(size);
    noFill();
    strokeWeight(6);
    stroke(255,255,255);
    beginShape();
    vertex(0,0);
    vertex(10,15);
    vertex(0,30);
    endShape();

    beginShape();
    vertex(10,0);
    vertex(20,15);
    vertex(10,30);
    endShape();
    stroke(230, 228, 228);

    stroke(230, 228, 228);
    line(0,0,8,12);
    line(10,0,18,12);
    pop();
  },
  //an arrow
  arrow: function(r = 255){
    push();
    noFill();
    strokeWeight(6);
    stroke(255,255,255, r);
    beginShape();
    vertex(0,0);
    vertex(10,15);
    vertex(0,30);
    endShape();
    pop();
  },
  //an error-icon (triangle with exclamation mark)
  error: function(size=1){
    push();
    scale(size);
    fill(255,255,255);
    stroke(255);
    strokeWeight(5);
    strokeJoin(ROUND);
    triangle(10,0,25,25,-5,25);
    stroke(88,88,88);
    line(10,5,10,15);
    point(10, 22);
    pop();
  }
}

//create an animation or animate your graphic
var animation = {
  //Variables for the typeWriter-function
  textindex: 0,
  lastMillis: 0,

  //function for a typewriter effect
  typeWriter: function(sentence, x, y) {
    //add a letter every 100th millisecond
    if (millis() > this.lastMillis + 100) {
  		this.textindex = this.textindex + 1;
  		this.lastMillis = millis();
  	}
    text(sentence.substring(0, this.textindex), x, y);
  },

  //Create a path with a random y-direction and a selected length
  Trail: function(x,y, xoff=0, ){
    console.log(xoff);
    this.x = x;
    this.y = y;
    //In the array all positions of the last circle are stored
    this.history = [];

    this.update = function(length){
    //when the x-value of the last circle has reached the value of the total length, the path ends
      if(this.history.length > length){
        this.y = this.y;
        this.x = this.x;
        window.lastTrailValueX = this.x;
        window.lastTrailValueY = this.y;
      }else{
        //else extend x by 1 and y by a random value (noise)
        this.x += 1;
        this.y = noise(xoff) * height/2;
      }
      xoff += 0.01;
      var v = createVector(this.x, this.y);
      this.history.push(v);
    }
    this.show = function(color, size){
      push();
      noStroke();
      fill(color);
      //create a circle with the specific position
      circle(this.x, this.y, size);
      for(var i = 0; i< this.history.length; i++){
        //show all circles with the positions from the array
        var position = this.history[i];
        circle(this.history[i].x, this.history[i].y, size);
      }
      pop();
    }

  },

  //Create a ZigZag-Trail with a selected length
  ZigZagTrail: function(x,y, down = true, count = 10){
    this.x = x;
    this.y = y;
    //In the array all positions of the last circle are stored
    this.history = [];

    this.update = function(length, size = 20){
      //when the x-value of the last circle has reached the value of the total length, the path ends
      if(this.history.length > length){
        this.y = this.y;
        this.x = this.x;
        window.lastZigZagTrailValueX = this.x;
        window.lastZigZagTrailValueY = this.y;
      }else{
        this.x += 1;
        if(down === true){
          this.y -= 1;
        }else{
          this.y += 1;
        }
      }
      //if down is false, the path grows upwards
      if(count === size && down === true){
        down = false;
        count = 0;
      }else if(count === size && down === false){
        down = true;
        count = 0;
      }
      count += 1;

      var v = createVector(this.x, this.y);
      this.history.push(v);
    }
    this.show = function(color, size){
      push();
      noStroke();
      fill(color);
      circle(this.x, this.y, size);
      for(var i = 0; i< this.history.length; i++){
        //show all circles with the speficic position from the history-array
        var position = this.history[i];
        circle(this.history[i].x, this.history[i].y, size);
      }
      pop();
    }

  },

  //move the position of an element or object with gsap.to
  moveOnAxis: function(variable, moveX, moveY, startnr, d=0.5){
    //move the variable/element/objekt to the new x- and y-position
    if(startnr === true){
        let moving = gsap.to(variable, {
        x: moveX,
        y: moveY,
        ease: "sine.inOut",
        duration: d,
        });
        return moving;
    }
  }

}

//save your animation in mp4 and download it
function exportAsMP4(name, end, framerate = 60){
  var videoStream = canvas.captureStream(framerate);
  //creates mediaStreams
  var mediaRecorder = new MediaRecorder(videoStream);
  //chunks of the recording
  var chunks = [];
  //Event Handler, when the recorder has data available
  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = function(e) {
    //stores the data
   var blob = new Blob(chunks, { 'type' : 'video/mp4' });
    var videoURL = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style = 'display: none';
    a.href = videoURL;
    //download the video
    a.download = name + '.mp4';
    a.click();
    window.URL.revokeObjectURL(videoURL);

  };
  mediaRecorder.start();
  //set the end of the recording
  setTimeout(function (){ mediaRecorder.stop(); }, 1000 * end);
}

//show your exported video in combination with your webcam video as background
//to image the webcam, call the method startCamer()
var webcam;
var pressed = false;
function videoWithCamera(videoname = null, videosizeX = 400, videosizeY = 280, videoPositionX = 10, videoPositionY = 10){
  //creates a new HTML-video Element with the webcam
  webcam = createCapture(VIDEO);
  webcam.size(640,360);
  //hides the webcam and image it in draw()
  webcam.hide();
  if(videoname != null){
    //shows the video selected by the user
    var path = 'assets/' + videoname;
    var video = createVideo(path);
    video.size(videosizeX, videosizeY);
    video.position(videoPositionX,videoPositionY);
    //shows the video, if the user pressed the key
    document.addEventListener('keypress', playVideo);

    function playVideo(e) {
      if(pressed === false){
        video.play();
        video.loop();
        pressed = true;
      } else if(pressed === true){
        video.pause();
        pressed = false;
      }
    }
  }

  return;
}

//start your camera on your canvas; execute the function in draw()
function startCamera(){
  image(webcam,0,0);
}
//here any objects, functions and variables are exported and made available to other modules
export {green, darkblue, blue, pink, startnr, tl, graphics, icons, animation, mathSymbols, mini, fullversion, withAnimation, noAnimation, exportAsMP4, videoWithCamera, startCamera};
