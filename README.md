Typesetter version 1.0
----------------------

(CC) 2019 Joachim de Koning
Creative Commons License BY-SA-NA


Typesetter is a program for arranging an image multiple times on a page for
printing. This is useful for example when making stickers, and the
dimensioning or placement of the repeating image needs to be exact.

To install Typesetter, move the directory to a folder of your choice and
execute the install script to install libraries and dependencies.

Example:
 ./install.sh

After installation, you should be able to invoke the program from anywhere
as long as you are the same user who installed it.

The program uses a template to arrange a specified image (PNG) on the page.
You must invoke the program from a command line, specifying the image 
filename to use.

Example:
 typesetter MyFolder/myimage.png

If the directory folder containing that image also contains a template file,
it will be used to format the placement of the repeating image on the page. 
So if in our example above the file myimage.png.config is present in the 
directory MyFolder, it will be used to format the page.

In the file typesetter_example.config you will find an example configuration.
An annotated copy of this file follows below.

{
  "scaler":1.22848162         // Scales the output to adjust final conversion
                              // to real-world metrics.
                              //  - adjust this to fit if 1 millimeter turns
                              //    out bigger or smaller when actually printed
  "columns":3,                // Amount of objects next to eachother.
  "rows":4,                   // Amount of objects from above to below.
  "objWidth":"1 mm",          // Single object's width.
  "objHeight":"1 mm",         // Single object's height.
  "objMarginTop":"1 mm",      // Single object's top margin.
  "objMarginBottom":"1 mm",   // Single object's bottom margin.
  "objMarginLeft":"1 mm",     // Single object's left margin.
  "objMarginRight":"1 mm",    // Single object's right margin.
                              //  - if left and right margin are 1 mm, there
                              //    will be a space of 2 mm between objects
  "pageMarginTop":"0 mm",     // Margin at the absolute top of the page.
  "pageMarginLeft":"0 mm",    // Margin at the absolute left of the page.
  "pageMarginRight":"0 mm"    // Margin at the absolute right of the page.
                              //  - a bottom margin is determined by the printer
                              //    itself, and therefor needs no option, so
                              //    for this reason it cannot be specified
}

