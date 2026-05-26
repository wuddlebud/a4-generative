# a4-remix

Boilerplate for Assignment 4. Fork this repo to get started.

## Folder structure

```
/switching        ← DO NOT TOUCH. Infrastructure for the sketch switcher.
/sketches         ← YOUR WORK LIVES HERE.
  sketch1.js      ← do not rename
  sketch2.js      ← do not rename
  remix.js        ← do not rename
index.html        ← the main page. you can edit the HTML and CSS. But please DONT DELETE the switching code
style.css         ← edit this to style your page.
script.js         ← DO NOT TOUCH. Handles switching and localStorage.
```

## Getting started

1. Fork this repo
2. Clone it to your machine and open in VS Code
3. Find two p5.js sketches on the web
4. Paste sketch 1 into `sketches/sketch1.js` (below the `sketchInfo` object — fill that in too)
5. Paste sketch 2 into `sketches/sketch2.js`
6. Open `index.html` with Live Server and use the dropdown to switch between them
7. Build your remix in `sketches/remix.js`

## Console Error
The browser console may print the following error:

```shell
jquery.js:1040 [Violation] Permissions policy violation: unload is not allowed in this document.
```

This is a known bug and can be ignored. It's something happening internally within p5js. 

## Rules

- Do not rename the `.js` files in `/sketches`
- Do not edit anything in `/switching`
- Do not edit `script.js`
- Do fill in the `sketchInfo` text at the top of each sketch file
