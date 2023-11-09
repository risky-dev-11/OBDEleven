const { log } = require('console');
const fs = require('fs');
const XLSX = require('xlsx');


if (process.argv.includes('convert')) {
    let files = fs.readdirSync('./input');
    for (const element of files) {
        if(element.includes("skoda")){
            main(element, "skoda");
        }else if (element.includes("vw")){
            main(element, "vw");
        }else if (element.includes("audi")){
            main(element, "audi");
        }else{
            console.log("Error: " + element + " this brand is not supported");
        }
    }
}
    

function main(fileName, brand){
    let text = fs.readFileSync("./input/" + fileName).toString('utf-8');
    if (brand == "skoda" || brand == "vw"){
    let array = text.split('---------------------------------------------------------------');
    let ausgabe =[];
    let ausgabeAuto = [];
    if (brand == "skoda"){
        ausgabe = [["ID", "Steuergerät", "Aktive Fehler", "Inaktive Fehler", "Systembeschreibung", "Seriennummer",
        "Software-Nummer", "Software-Version", "Hardware-Nummer", "Hardware-Version",
         "Fehler", "Fehler Art", "Datum", "weitere Daten[1]", "weitere Daten[2]"]];
        ausgabeAuto = [["Hersteller","Fahrzeug", "Jahr", "Fahrzeugtyp", "Motor", "Kilometerstand"]];
    }else if (brand == "vw"){
        ausgabe = [["ID", "Steuergerät", "Aktive Fehler", "Inaktive Fehler", "Systembeschreibung", 
        "Software-Nummer", "Software-Version", "Hardware-Nummer", "Hardware-Version",
         "Fehler", "Fehler Art", "Priorität", "Fehler-Häufigkeit", "Datum", "weitere Daten[1]", "weitere Daten[2]"]]; 
        ausgabeAuto = [["Hersteller", "FIN", "Fahrzeug", "Jahr", "Motor", "Kilometerstand"]]; 
    }
    
    const inhalt = array[0];
    let fin = inhalt.match(/FIN:(.*)/)[1].trim();
    let fahrzeug = inhalt.match(/Fahrzeug:(.*)/)[1].trim();
    let jahr = inhalt.match(/Jahr:(.*)/)[1].trim();
    let fahrzeugtyp = "";
    if (inhalt.includes('Fahrzeugtyp:')) {
        fahrzeugtyp = inhalt.match(/Fahrzeugtyp:(.*)/)[1].trim();
    }
    let motor = inhalt.match(/Motor:(.*)/)[1].trim();
    let kilometerstandAuto = inhalt.match(/Kilometerstand:(.*)/)[1].trim();
    if (brand == "skoda"){
        ausgabeAuto.push([brand.toUpperCase(),fahrzeug, jahr, fahrzeugtyp, motor, kilometerstandAuto]);
    }else if(brand == "vw"){
        ausgabeAuto.push([brand.toUpperCase(),fin, fahrzeug, jahr, motor, kilometerstandAuto]);
    }

    for (let i=1; i<array.length; i++){
        let inhalt = array[i]; 
        let fehlerCode = "";
        let fehlerArt = "";
        let stgerät = inhalt.match(/Steuergerät:(.*)/)[1].trim();
        const id = stgerät.substring(0, 3).trim();
        const steuergeraet = stgerät.substring(3).trim();
        const aktiveFehler = inhalt.match(/Aktive Fehler:(.*)/)[1].trim();
        const inaktiveFehler = inhalt.match(/Inaktive Fehler:(.*)/)[1].trim();
        const systembeschreibung = inhalt.match(/Systembeschreibung:(.*)/)[1].trim();
        if (brand == "skoda"){
            if (inhalt.includes("Keine Fehlercodes gefunden")){
                fehlerCode = "Keine Fehlercodes gefunden";
                fehlerArt = "/";
            }else{
                let fehlerspeicher = inhalt.substring(inhalt.indexOf("    Fehler:"), inhalt.indexOf("Kilometerstand:"));
                fehlerspeicher = fehlerspeicher.replace("Fehler:","");
                let fehlerArray = fehlerspeicher.split("\n");
                for (let i=0; i<fehlerArray.length; i=i+2){
                    fehlerCode = fehlerCode + fehlerArray[i+1].trim() + " || ";
                    fehlerCode = fehlerCode.replace("- Unbekannt","Unbekannt");
                    fehlerArt = fehlerArt + fehlerArray[i].trim() + " || ";
                }
                fehlerCode = fehlerCode.substring(0, fehlerCode.length - 11);
                fehlerArt = fehlerArt.substring(4, fehlerArt.length - 7); 
            }
        }
        let prioritaet = "/";
        let fehlerHaeufigkeit = "/";
        let index = 0;
        if (brand == "vw"){
            if (inhalt.indexOf("Date:")<inhalt.indexOf("Kilometerstand:") && inhalt.indexOf("Date:") != -1){
                index = inhalt.indexOf("Date:");
            }else{
                index = inhalt.indexOf("Kilometerstand:");
            }
            fehlerCode = inhalt.substring(inhalt.lastIndexOf("    Fehler:"), index);
            fehlerCode = fehlerCode.substring(fehlerCode.indexOf("ODX-Version:")+19, fehlerCode.length);
            fehlerCode = fehlerCode.replace("- Unbekannt","Unbekannt");
            fehlerCode = fehlerCode.replace("Fehler:", "");
            fehlerCode = fehlerCode.trim();
            if (fehlerCode.includes("Priorität:")){
                fehlerCode=fehlerCode.substring(0, fehlerCode.indexOf("Priorität:"));
            }
            if (fehlerCode=="Keine Fehlercodes gefunden"){
                fehlerArt = "/";
            }else{
                if (fehlerCode.includes("sporadisch")){
                    fehlerArt = "sporadisch";
                }else if (fehlerCode.includes("statisch")){
                    fehlerArt = "statisch";
                }
                fehlerCode = fehlerCode.split("\n")[0].trim();
                
            }
            if (inhalt.includes('Priorität:')){
            prioritaet = inhalt.match(/Priorität:(.*)/)[1].trim();
            fehlerHaeufigkeit = inhalt.match(/Fehlerhäufigkeitszähler:(.*)/);
            }
        }
        let seriennummer = "nicht vorhanden";	
        if(brand == "skoda" && inhalt.includes('Seriennummer:')){
            seriennummer = inhalt.match(/Seriennummer:(.*)/)[1].trim();
        }
        const softwareNummer = inhalt.match(/Software-Nummer:(.*)/)[1].trim();
        const softwareVersion = inhalt.match(/Software-Version:(.*)/)[1].trim();
        const hardwareNummer = inhalt.match(/Hardware-Nummer:(.*)/)[1].trim();
        const hardwareVersion = inhalt.match(/Hardware-Version:(.*)/)[1].trim();
        const datum = inhalt.match(/Datum:(.*)/)[1].trim(); 
            inhalt.replace("Datum: " + datum,"");
            inhalt.replace("Steuergerät: " + stgerät,"");
            inhalt.replace(/Systembeschreibung:(.*)/,"");
            inhalt.replace(/Seriennummer:(.*)/,"");
            inhalt.replace(/Software-Nummer:(.*)/,"");
            inhalt.replace(/Software-Version:(.*)/,"");
            inhalt.replace(/Hardware-Nummer:(.*)/,"");  // funktionieren alle nicht prüfen ob alle da
            inhalt.replace(/Hardware-Version:(.*)/,"");
            inhalt.replace(/Kilometerstand:(.*)/,"");  
            inhalt.replace(/Datum:(.*)/,"");
            inhalt.replace(/date:(.*)/,""); 
            inhalt.replace(/Priorität:(.*)/,"");
            inhalt.replace(/Fehlerhäufigkeitszähler:(.*)/,"");
            inhalt.replace(/Fehler:\n(.*)\n(.*)/,"");
            inhalt.substring(8);
            if (brand == "skoda"){
                ausgabe.push([id, steuergeraet,aktiveFehler,inaktiveFehler,systembeschreibung,seriennummer,softwareNummer,
                            softwareVersion,hardwareNummer,hardwareVersion,fehlerCode,fehlerArt,
                            datum, inhalt.trim()]);
                }else if(brand == "vw"){
                    ausgabe.push([id, steuergeraet,aktiveFehler,inaktiveFehler,systembeschreibung,softwareNummer,
                        softwareVersion,hardwareNummer,hardwareVersion,fehlerCode,fehlerArt,prioritaet,fehlerHaeufigkeit,
                        datum, inhalt.trim()]);  
                    }
    }
    let workbook = XLSX.utils.book_new();
    let worksheet1 = XLSX.utils.aoa_to_sheet(ausgabeAuto);
    let worksheet2 = XLSX.utils.aoa_to_sheet(ausgabe);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Auto');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Diagnosedaten');
    let newName = fileName.replace(".txt", "");
    XLSX.writeFile(workbook, "./output/" + newName + ".xlsx");
    console.log(fileName + " wurde erfolgreich konvertiert");
    }


    if (brand == "audi"){
        let text = fs.readFileSync("./input/" + fileName).toString('utf-8');
            let ausgabe = [["ID", "Steuergerät","Fehler","Fehler Art", "Systembeschreibung", "Backup Bezeichnung",
            "Software-Nummer", "Datum", "weitere Daten[1]", "weitere Daten[2]", "weitere Daten[3]", "weitere Daten[4]"]];
        let ausgabeAuto = [["Datum","Fahrzeug", "J,ahr", "Karosserietyp", "Motor", "Kilometerstand"]];
        let array = text.split(/^Backup/m);
        const inhalt = text.substring(0, text.indexOf("---------------------------------------------------------------"));
        let datum = inhalt.match(/Datum:(.*)/)[1].trim();
        let fahrzeug = inhalt.match(/Fahrzeug:(.*)/)[1].trim();
        let jahr = inhalt.match(/Jahr:(.*)/)[1].trim();
        let karosserietyp = inhalt.match(/Karosserietyp:(.*)/)[1].trim();
        let motor = inhalt.match(/Motor:(.*)/)[1].trim();
        let kilometerstand = inhalt.match(/Kilometerstand:(.*)/)[1].trim();
        ausgabeAuto.push([datum,fahrzeug, jahr, karosserietyp, motor, kilometerstand]);
        for (let i=1; i<array.length; i++){
            let inhalt = array[i];
            let steuergeraet = "keine Angabe";
            let id = "keine Angabe";
            if (inhalt.includes("Steuergerät:")){
                let stgerät = inhalt.match(/Steuergerät:(.*)/)[1].trim();
                id = stgerät.substring(0, 3).trim();
                steuergeraet = stgerät.substring(3).trim();
            }
            let systembeschreibung = "keine Angabe";
            if (inhalt.includes("Systembeschreibung:")){
                systembeschreibung = inhalt.match(/Systembeschreibung:(.*)/)[1].trim();
            }
            const backupBezeichnung = inhalt.match(/Backup-Bezeichnung:(.*)/)[1].trim();
            const softwareNummer = inhalt.match(/Software-Nummer:(.*)/)[1].trim();
            let fehler = "/";
            let fehlerArt = "/";
            if (inhalt.includes("---------------------------------------------------------------")){
              let zwischenSpeicher = inhalt.substring(inhalt.indexOf("---------------------------------------------------------------"), inhalt.length);
              zwischenSpeicher = zwischenSpeicher.split(/        \d\d/m);
              for (let j=1; j<zwischenSpeicher.length; j++){
              let inhaltZwischenSpeicher = zwischenSpeicher[j];
              systembeschreibung = inhaltZwischenSpeicher.match(/Systembeschreibung:(.*)/)[1].trim();
              const softwareNummer = inhaltZwischenSpeicher.match(/Software-Nummer:(.*)/)[1].trim();
              const backupBezeichnung = "/";
              const datum = "keine Angabe";
              fehler = inhaltZwischenSpeicher.substring(inhaltZwischenSpeicher.indexOf("ODX-Version:")+19, inhaltZwischenSpeicher.length);
              let fehlerArray = fehler.split("\n");
              fehler = fehlerArray[2].trim();
              if (fehlerArray[1]== "Keine Fehlercodes gefunden"){    
                fehlerArt = "/";
              }else{
                    fehlerArt = fehlerArray[3].trim();
              }
              ausgabe.push([id, steuergeraet,fehler,fehlerArt, systembeschreibung,backupBezeichnung,softwareNummer,
                datum, inhaltZwischenSpeicher.trim()]);
            }}
            let datum = "keine Angabe";
            if (inhalt.includes("Datum:")){
                datum = inhalt.match(/Datum:(.*)/)[1].trim(); 
            }
                inhalt= inhalt.replace(/Steuergerät:(.*)/,"");
                inhalt = inhalt.replace(/Systembeschreibung:(.*)/,"");
                inhalt = inhalt.replace(/Seriennummer:(.*)/,"");
                inhalt = inhalt.replace(/Software-Nummer:(.*)/,""); // funktionieren alle nicht + replace prüfen ob alle da
                inhalt = inhalt.replace(/Hardware-Nummer:(.*)/,"");
                inhalt = inhalt.replace(/Backup-Bezeichnung:(.*)/,"");
                inhalt = inhalt.replace(/Datum:(.*)/,"");
                let inhalt1 = "";
                let inhalt2 = "";
                let inhalt3 = "";
                let inhalt4 = "";
                if (inhalt.length > 32767){
                    inhalt2 = inhalt.substring(32766, inhalt.length).trim();
                    inhalt1 = inhalt.substring(0, 32766).trim();
                    if (inhalt2.length>32767){
                        inhalt3 = inhalt2.substring(32766,inhalt2.length).trim(); 
                        inhalt2 = inhalt2.substring(0, 32766).trim();
                    }
                    if (inhalt3.length>32767){
                        inhalt4 = inhalt3.substring(32766,inhalt3.length).trim(); 
                        inhalt3 = inhalt3.substring(0, 32766).trim();
                    }
                }else{
                    inhalt1 = inhalt.trim();
                }
                    ausgabe.push([id, steuergeraet,fehler, fehlerArt, systembeschreibung,backupBezeichnung,softwareNummer,
                                    datum, inhalt1, inhalt2, inhalt3, inhalt4]);
                    
                        
        }
        let workbook = XLSX.utils.book_new();
        let worksheet1 = XLSX.utils.aoa_to_sheet(ausgabeAuto);
        let worksheet2 = XLSX.utils.aoa_to_sheet(ausgabe);
        XLSX.utils.book_append_sheet(workbook, worksheet1, 'Auto');
        XLSX.utils.book_append_sheet(workbook, worksheet2, 'Diagnosedaten');
        let newName = fileName.replace(".txt", "");
        XLSX.writeFile(workbook, "./output/" + newName + ".xlsx");
        console.log(fileName + " wurde erfolgreich konvertiert");

    
    }
}