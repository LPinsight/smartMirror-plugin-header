## 🪞 SmartMirror-Plugin-Template

Ein Vorlage-Repository zur einfachen Entwicklung neuer Plugins für das [SmartMirror-Projekt](https://github.com/LPinsight/smartMirror).
Dieses Template stellt eine standardisierte Struktur, grundlegende Funktionen sowie empfohlene Best Practices bereit, um die Erstellung neuer Plugins so unkompliziert wie möglich zu machen.

## 📁 Projektstruktur

``` pgsql
smartMirror-plugin-template/
├── ui/
│   ├── main.js
│   ├── style.css
│   └── template.html
└── config.json
└── plugin.json
```

### Erklärung

- config.json
- plugin.json
- ui/

## 🚀 Schnellstart

### 1. Repository klonen

Das Plugin im Ordner `plugins/` vom Hauptprojekt speichern
``` bash
git clone https://github.com/LPinsight/smartMirror-plugin-template
cd smartMirror-plugin-template
```

### 2. Plugin-Infos anpassen

Ändere die Werte in `plugin.json`, z. B.:

```json
{
  "name": "my-plugin",
  "version": "v1.0.0",
  "repository": "GitHub-Link",
  "beschreibung": "meine Plugin beschreibung",
  "author": "Dein Name"
}
```

### 3. Plugin-Config anpassen

Ändere die Werte in `config.json`, z. B.:

```json
[{
  "name": "Beispiel Text",
  "inputType": "text",
  "default": "",
  "placeholder": "Input Text"
},{
  "name": "Beispiel checkbox",
  "inputType": "checkbox",
  "default": true,
  "placeholder": ""
},{
  "name": "Beispiel select",
  "inputType": ["auswahl 1", "auswahl 2"],
  "default": "auswahl 2",
  "placeholder": ""
}, {
  "name": "Beispiel number",
  "inputType": "number",
  "default": 0,
  "placeholder": ""
}]
```

### 4. UI anpassen

Ändere die Darstellung sowie die Logik des Plugins im Ordner `/ui`.

### 5. Hauptprojekt neustarten

Nun muss nur noch das Hauptprojekt neugestartet werden und schon kann das neue Plugin verwendet werden.

## 📄 Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**.
