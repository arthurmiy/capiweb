# JS folder

Contains the javascript code used to implement the capiweb.

## Capi.js

The main file, Center all editor commands and state management.

## Command.js

Abstraction used to create commands that makes reference to the capiEditor

Has 2 methods:

- toJson: Serializes the current instance
- fromJson: Recovers instance from json

## Config.js

Used to save the configurations into the persistent local storage.
Has 2 attributes:

- name: Used to identify the key used to store in memory
- storage: JSON map with all properties to be saved.

When created verifies if the local storage already contains any data, if not, it creates the data using the default values.

Has 3 methods:

- getKey(key): Retrieves a key
- setKey(): saves the values in storage into memory
- clear(): Clears the data saved in memory

## EditorControls.js

Centers all viewport controls such as:

- focus: focus in one object
- pan: pan movement
- zoom: zoom configurations

## History.js

Responsable for history control. Enables the undo and redo commands

Has methods like:

- execute(cmd,name): creates a new command and, depending on its type saves in memory to eventually be undone
- undo
- redo
- toJSON
- fromJSON
- clear: clear history
- goToState (id): jumps into state
- enableSerialization

## Loader.js + LoaderUtils.js

Responsable for loading 3d assets into the working area
