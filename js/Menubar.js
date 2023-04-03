import { UIPanel } from "./libs/ui.js";

import { MenubarFile } from "./Menubar.File.js";
import { MenubarStatus } from "./Menubar.Status.js";

function Menubar(editor) {
  const container = new UIPanel();
  container.setId("menubar");

  container.add(new MenubarFile(editor));
  // container.add( new MenubarEdit( editor ) );
  // container.add( new MenubarAdd( editor ) );
  // container.add( new MenubarPlay( editor ) );
  // container.add( new MenubarExamples( editor ) );
  // container.add( new MenubarView( editor ) );
  // container.add( new MenubarHelp( editor ) );

  container.add(new MenubarStatus(editor));

  return container;
}

export { Menubar };
