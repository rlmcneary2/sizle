#sizle
sizle is a Photoshop scripted application to resize images. It includes a graphical user interface for making selections.

#Use
Copy all of the files and folders into Photoshop's script folder. Or use the ExtendScript application to load main.js and run the script.

#Roadmap
The following features remain to be done.
- ~~store user preferences~~
- output to new file: overwrite existing file
- output to new file: choose file type
- saving files progress
- pad image for output image with aspect ratio different from original (change canvas size)
- resize that's not proportional
- don't upsample images
- choose image types to include in folder source resize
- build (combine all JS files into a single JSX file)

and many more.

#Development
Javascript files use VSDOC format. Download and install VS 2013 Community Edition. Once that's done get the Web Development add-on, after it's been installed Intellisense for Javascript will appear. The files in the 'scripts' folder are there to help Intellisense with ExtendScript objects (it is not complete). To make use of those files follow these directions: http://madskristensen.net/post/improved-javascript-intellisense-in-visual-studio

#Build
There's no build necessary. But in order to create a single file there will eventually be a 'build' process to place all o fthe files into a single file.

#License
Released under GPL3.
