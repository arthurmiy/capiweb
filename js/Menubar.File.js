import * as THREE from "three";

import { UIPanel, UIRow, UIHorizontalRule } from "./libs/ui.js";

import { AddObjectCommand } from "./commands/AddObjectCommand.js";

function MenubarFile(editor) {
  const strings = editor.strings;

  const container = new UIPanel();
  container.setClass("menu");

  const title = new UIPanel();
  title.setClass("title");
  title.setTextContent(strings.getKey("menubar/file"));
  container.add(title);

  const options = new UIPanel();
  options.setClass("options");
  container.add(options);

  // new

  let option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/new"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  // open...

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/open"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  //

  options.add(new UIHorizontalRule());

  // save

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/save"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  // save as...

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/save_as"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  //

  options.add(new UIHorizontalRule());

  // import mesh

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/import_mesh"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  // import mesh enu

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/import_enu"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  // import mesh wds

  option = new UIRow();
  option.setClass("option");
  option.setTextContent(strings.getKey("menubar/file/import_wds"));
  option.onClick(function () {
    //todo
  });
  options.add(option);

  return container;
}

export { MenubarFile };
