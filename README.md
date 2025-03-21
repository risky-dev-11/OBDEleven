# What does this program do? #
This program converts raw data read in by ODBEleven in .txt format into Excel files
Even though Javascript is not really suitable for this, I saw it as a challenge to myself to solve this task with 100% Javascript. This makes it not as easy to use as I would have liked, but still very simple.

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

**Attention: If there are files in the output folder with the same name as those in the input folder, they will be overwritten.**

## 3. how do I execute the code? ##

If you open the project in an IDE such as IntelliJ or VS Code, you can directly open the terminal and enter the following command:

**node main.js convert**

If you want to run the program without IDE you have to open a terminal (e.g. CMD) in the project folder. 

The command should then look like this 

**C:\Users\UserName\SomeFolder\OBDEleven> node main.js convert**

 Now all files in the input folder have been read and the converted Excel files have been saved in the output folder

# Important notes

It is recommended to use the following key combination (after opening one of the Excel files) -> 

 **CTRL A + ALT R F F I**
