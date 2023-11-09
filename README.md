# Was macht dieses Programm? #
Dieses Programm wandelt von ODBEleven eingelesene Rohdaten im .txt-Format in Excel-Dateien um

# Warum Javascript? #

Ich weiß, dass Javascript eigentlich absolut nicht dafür geeignet ist und mir Python, vorallem durch die vielen Bibliotheken, vieles erleichtert hätte.
Ich habe es jedoch als Challange an mich selbst gesehen diese Aufgabe mit 100% Javascript zu lösen. Dadurch ist die Benutzung nicht so leicht wie ich es gerne hätte, aber dennoch sehr simpel.

# Warum Excel? #

Heutzutage werden in den meisten Unternehmen ausschließlich Excel Dateien zum Speichern von Informationen benutzt. 
Durch die Konversion in Excel erhalten wir folgende Vorteile: weitreichende Funktionen bereits implementiert, Dateiformat kann von jedem Mitarbeiter geöffnet werden, leichte Kompabilität etc. -> Wir nutzen die Formate, Funktionen, etc. des bereits etablierten Ecosystems, anstatt zum Beispiel eine Datenbank neu aufzusetzen (unnötig verkomplizierend)

# Vorgehensweise des Programms #
Jede Zeile der Excel bildet einen neuen Eintrag der Rohdaten. Von diesem Eintrag wurden die wichtigsten Informationen ausgelesen und in die entsprechenden Spalten geschreiben. Die übrigen Daten werden in die Spalte "weitere Daten" geschrieben.
-> Da manche Einträge sehr lang sind, müssen die "unwichtigen" Rohdaten auf bis zu vier Spalten aufgeteilt werden (max cell-length = 32767)

Die jeweiligen Excel Dateien bestehen aus zwei Arbeitsmappen: In der Mappe "Auto" finden sich die grundlegenden Daten zum Auto, in der zweiten Mappe "Diagnosedaten" befinden sich die Diagnosedaten.
# Vorraussetzungen #

## Installation von Node.js ##
https://nodejs.org/en/download
## Installation von xlsx ##
npm install xlsx

# Ablauf #

## 1. Speichern sie die die Rohdaten in dem Input-Ordner ab ##
  Die Dateien muss in folgendem Format abgespeichert sein: 

[marke]-[modell].txt 
-> Beispiel: skoda-superb.txt oder audi-q8.txt 

## 2. Prüfen sie den Output-Ordner (bei wiederholter Verwendung) ##
  Bitte leeren sie den Ordner vor der Konversion (die "placeholder.txt" ist nur, damit GitHub mich einen leeren Ordner hochladen lässt)

** Achtung: Falls im Output-Ordner Dateien mit dem selben Namen wie die im Input Ordner gelistet sind, werden diese überschrieben. **

## 3. Wie führe ich den Code aus? ##

Wenn sie das Projekt in einer IDE wie IntelliJ oder VS Code öffnen, können sie direkt das Terminal aufklappen und folgenden Befehl eingeben:

** node main.js convert **

Falls sie das Programm ohne IDE ausführen möchten müssen sie ein Terminal (z.B. CMD) in dem Projektordner öffnen. 

Der Befehl sollte dann wie folgt aussehen (natürlich angepasst für ihr System): 

** C:\Users\NWERTHM\Desktop\bakeoff-risky-dev-11> node main.js convert **

 ** Nun wurden sämtliche Dateien des Input-Ordners ausgelesen und die convertierten Excel-Datein im Output-Ordner abgespeichert **

# wichtige Hinweise #

Es empfiehlt sich folgende Tastenkombination durchzuführen (nach dem Öffnen einer der Excel Dateien) -> 

 ## STRG A + ALT R F F I ##

