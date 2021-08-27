# TSG RMMZ Plugins

Javascript Plugins for RPG Maker MZ

## About

This repository contains the plugins I have created for [RPG Maker MZ](https://www.rpgmakerweb.com/products/rpg-maker-mz),
a fun game creation library. They are provided "as is" and free of charge to anyone creating games. Credit is not necessary
and you can use them in free or commercial games, as long as it follows the [MIT License](https://github.com/bratta/rmmz-plugins/blob/main/LICENSE).

## TSG_RandomDialogFromFile.js

### Installation

* Copy `TSG_RandomDialogFromFile.js` to the `js/plugins` directory inside of your RPG Maker MZ project.
* Inside RPG Maker MZ, click on the "Plugin Manager" icon (or hit Tools -> Plugin Manager, or hit F10).
* Double-click an empty space inside the Plugin List, hit the select box for "Name" and choose this plugin from the list.
* Hit "OK" until you are back in the plugin list and you see this plugin listed.

### JSON File

You are going to need a JSON file that holds all the random bits of dialog you want for a particular event. Place it inside your
project's `data` directory, or even a subdirectory of that. For example, create a file named `data/Custom/InnDialog.json`.

Here is a sample file:

```json
[
  {
    "face": "",
    "faceIndex": 0,
    "name": "",
    "text": "You play the only song you know how to play:\nChopsticks",
    "background": 0,
    "position": 1
  },
  {
    "face": "",
    "faceIndex": 0,
    "name": "",
    "text": "A few guests look on at your playing and cringe.",
    "background": 0,
    "position": 1
  },
  {
    "face": "",
    "faceIndex": 0,
    "name": "",
    "text": "In a rare feat of musical genius, you play a lovely sonata.",
    "background": 0,
    "position": 1
  },
  {
    "face": "People2",
    "faceIndex": 0,
    "name": "Innkeeper Gavin",
    "text": "Please stop playing. You're scaring the guests.",
    "background": 0,
    "position": 2
  }
]
```

* `face` - (optional) The filename for the face tileset. For example, `People2`
* `faceIndex` - (optional; required if you specify `face`) The integer index of the image in the tileset. For example, `0`
* `name` - (optional) A name for the character speaking. This usually only makes sense if you use a face.
* `text` - (required) The random bits of text to display. If you need it to wrap, include a newline `\n` character.
* `background` - (required; defaults to 0) What kind of background to use. 0 = Window (Opaque), 1 = Dim (Translucent), 2 = Transparent (Invisible)
* `position` - (required; defaults to 2) Where to place the message. 0 = Top, 1 = Middle, 2 = Bottom

### Usage

* Create a new event in your game, or open an existing one. On page 3 of the Event Commands, choose "Plugin Command..."
* In the dialog that pops up, choose this plugin from "Plugin Name" and then "Random Dialog" from the Command Name.
* Change the argument "JSON Filename" to the path to your JSON file, such as `data/Custom/InnDialog.json`.
