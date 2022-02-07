# Animaster.js

Animaster.js ist eine JavaScript-Bibliothek zur Erstellung von animierten Lernvideos. 
Sie basiert auf den Bibliotheken p5.js und GSAP.

## Browser

Die Bibliothek und die Beispielanimationen wurden in dem Browser Google Chrome getestet.

## Inhalt des Ordners

Der Ordner beinhaltet zum einen die Bibliothek Animaster.js (unter src/animaster.js), als auch die JS-Dateien für die Beispielanimationen 
"Der Bresenham Algorithmus" und "Push() und pop() in p5.js".
Die main.js Datei dient dazu, die Animaster.js Bibliothek anzuwenden und zu testen. 

In dem assets-Ordner befinden sich Schriften, die für die Beispielanimationen verwendet werden.
Der node_modules Ordner beinhaltet die Bibliotheken p5.js und GSAP.

## Verwendung

Um Animster.js zu benutzen steht bereits die Datei main.js zur Verfügung.
Als Beispielanwendungen dienen die Dateien main_PushAndPop.js und main_Bresenham.js.
Diese sind ebenso als Kommentar in die index.js eingebunden und müssen zur Benutzung lediglich einkommentiert werden.

Innerhalb main.js wird "setup" Funktion deklariert, dort wird das Canvas-Element erstellt auf dem gezeichnet wird.
Die "draw" Funktion ist letztendlich die Funktion in der gezeichnet wird.


