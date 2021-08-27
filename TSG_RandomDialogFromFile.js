//=============================================================================
// RPG Maker MZ - Random Dialog Text from a File
//=============================================================================

'use strict';

//=============================================================================
// RandomDialog - Helper class to load a JSON file
//=============================================================================
class RandomDialog {
  static LoadJsonFromFile(filename) {
    const fs = require("fs");
    if (fs.existsSync(filename)) {
        return JsonEx.parse(fs.readFileSync(filename, { encoding: "utf8" }));
    } else {
        console.error("LoadJsonFromFile: File does not exist:", filename);
        return null;
    }
  }

  //===========================================================================
  // FromFile - Given a filename
  //===========================================================================
  static FromFile(filename) {
    const allDialog = RandomDialog.LoadJsonFromFile(filename);
    if (allDialog && allDialog.length > 0) {
      return allDialog[Math.floor(Math.random() * allDialog.length)];
    }
    else {
      return null;
    }
  }
}

/*:
 * @target MZ
 * @plugindesc Random Dialog Text from a File
 * @author Tim Gourley
 *
 * @help TSG_RandomDialogFromFile.js
 *
 * This plugin allows an event to load and display a random text dialog
 * from a JSON file.
 * 
 * ============================================================================
 * HOW TO USE THIS PLUGIN
 * ============================================================================
 * 
 * Create a new JSON file. I recommend creating a directory inside of "data"
 * named "Custom" or something similar. How you organize your dialog is up to
 * you. For example, you can put it in `data/Custom/InnDialog.json`:
 * 
 * Structure the JSON file like this:
 * [
 *   {
 *     "face": "",
 *     "faceIndex": 0,
 *     "name": "",
 *     "text": "You play the only song you know how to play: Chopsticks.",
 *     "background": 0,
 *     "position": 1
 *   },
 *   {
 *     "face": "People2",
 *     "faceIndex": 0,
 *     "name": "Innkeeper Gavin",
 *     "text": "Please don't scare the guests.",
 *     "background": 0,
 *     "position": 2
 *   }
 * ]
 * 
 * face       - If you want a picture, put the file here, eg. "People2"
 * faceIndex  - The index of the picture in the tileset, eg. 0
 * name       - An optional name for the character, eg. "Innkeeper"
 * text       - The text to display, eg. "Your random text goes here"
 *              Separate lines with a newline character, "\n"
 * background - The type of background. eg. 0 = Window (Opaque),
 *              1 = Dim (Translucent), 2 = Transparent (Invisible)
 * position   - Where to place the message window.
 *              eg. 0 = Top, 1 = Middle, 2 = Bottom
 *
 * ============================================================================
 * 
 * @command RandomDialog
 * @text Random Dialog
 * @desc Load a JSON file and shows a random bit of dialog from it.
 *
 * @arg filename
 * @type string
 * @text JSON Filename
 * @desc Path to the JSON file you want to load. eg. "data/MyDialog.json"
 * 
 */

(() => {
  const pluginName = "TSG_RandomDialogFromFile";
  let dialogFilename = "";

  PluginManager.registerCommand(pluginName, "RandomDialog", args => {
    dialogFilename = String(args.filename);
    const dialog = RandomDialog.FromFile(dialogFilename);

    if (dialog && !$gameMessage.isBusy()) {
      const background = dialog.background ?? 0;  // Default to "Window"
      const position = dialog.position ?? 2; // Default to "Bottom"
      if (dialog.face)
        $gameMessage.setFaceImage(dialog.face, dialog.faceIndex);
      if (dialog.name)
        $gameMessage.setSpeakerName(dialog.name);
      $gameMessage.setBackground(background);
      $gameMessage.setPositionType(position);
      $gameMessage.add(dialog.text);
    }
  });
})();