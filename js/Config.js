/**
 * Saves configuration into local storage
 * @constructor
 */
function Config() {
  //key name used to save in memory
  const name = "capi-editor";

  const storage = {
    language: "en",

    autosave: true,

    "project/title": "",
    "project/editable": false,
    "project/vr": false,

    "project/renderer/antialias": true,
    "project/renderer/shadows": true,
    "project/renderer/shadowType": 1, // PCF
    "project/renderer/useLegacyLights": false,
    "project/renderer/toneMapping": 0, // NoToneMapping
    "project/renderer/toneMappingExposure": 1,

    "settings/history": false,

    "settings/shortcuts/translate": "w",
    "settings/shortcuts/rotate": "e",
    "settings/shortcuts/scale": "r",
    "settings/shortcuts/undo": "z",
    "settings/shortcuts/focus": "f",
  };

  //verifies if the local storage contains config infos
  if (window.localStorage[name] === undefined) {
    //if not saved in memory, creates instance with default values
    window.localStorage[name] = JSON.stringify(storage);
  } else {
    //retrieve data from local storage
    const data = JSON.parse(window.localStorage[name]);

    for (const key in data) {
      //copies the data retrieved to the local variable
      storage[key] = data[key];
    }
  }

  return {
    getKey: function (key) {
      return storage[key];
    },

    setKey: function () {
      // key, value, key, value ...

      for (let i = 0, l = arguments.length; i < l; i += 2) {
        storage[arguments[i]] = arguments[i + 1];
      }

      window.localStorage[name] = JSON.stringify(storage);

      console.log(
        "[" + /\d\d\:\d\d\:\d\d/.exec(new Date())[0] + "]",
        "Saved config to LocalStorage."
      );
    },

    clear: function () {
      delete window.localStorage[name];
    },
  };
}

export { Config };
