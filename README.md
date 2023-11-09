# What does this program do? #
This program converts raw data read in by ODBEleven in .txt format into Excel files

# Why Javascript? #
I know that Javascript is not really suitable for this and that Python would have made things much easier for me, especially with its many libraries.
However, I saw it as a challenge to myself to solve this task with 100% Javascript. This makes it not as easy to use as I would have liked, but still very simple.

# Why Excel? #
Nowadays, most companies only use Excel files to store information. 
Conversion to Excel gives us the following advantages: extensive functions already implemented, file format can be opened by any employee, easy compatibility, etc. -> We use the formats, functions, etc. of the already established ecosystem instead of, for example, setting up a new database (unnecessarily complicating).

# Procedure of the program #
Each line of the Excel forms a new entry in the raw data. The most important information is read from this entry and written to the corresponding columns. The remaining data is written to the "Other data" column.
-> Since some entries are very long, the "unimportant" raw data must be divided into up to four columns (max cell-length = 32767)

The respective Excel files consist of two workbooks: The "Car" folder contains the basic data for the car, the second folder "Diagnostic data" contains the diagnostic data.

# Prerequisites #
## Installation of Node.js ##
https://nodejs.org/en/download
## Installation of xlsx ##
npm install xlsx

# Procedure #

## 1. save the raw data in the input folder ##
  The files must be saved in the following format: 

[brand]-[model].txt 
-> Example: skoda-superb.txt or audi-q8.txt 

## 2. check the output folder (for repeated use) ##
  Please empty the folder before the conversion (the "placeholder.txt" is only so that GitHub lets me upload an empty folder)

** Attention: If there are files in the output folder with the same name as those in the input folder, they will be overwritten. **

## 3. how do I execute the code? ##

If you open the project in an IDE such as IntelliJ or VS Code, you can directly open the terminal and enter the following command:

** node main.js convert **

If you want to run the program without IDE you have to open a terminal (e.g. CMD) in the project folder. 

The command should then look like this (adapted for your system, of course) 

** C:\Users\NIK\Desktop\OBDEleven> node main.js convert **

 ** Now all files in the input folder have been read and the converted Excel files have been saved in the output folder **

# Important notes

It is recommended to use the following key combination (after opening one of the Excel files) -> 

 ## CTRL A + ALT R F F I ##
