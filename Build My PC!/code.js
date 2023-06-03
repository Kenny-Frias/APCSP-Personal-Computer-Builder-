//Each list contains all of the information for each part that is in each select screen. 
var partImages = ["assets/61vGQNUEsGL._AC_SX450_.jpg", "assets/amd_ryzen_3_3300x_quad_core_1558666.jpg", "assets/81x069mwcbL._AC_SL1500_.jpg", "assets/91nx-MhjjwL._AC_SL1500_.jpg", "assets/samsung_mz_v7s1t0b_am_1tb_970_evo_plus_1454170.jpg", "assets/20-147-789-V01.jpg", "assets/71EXOwFSf-L._AC_SL1500_.jpg", "assets/20-232-419-02.jpg", "images-(2).jpeg", "assets/619Ui9f--pL._AC_SL1000_.jpg"];
var allParts = ["Ryzen 5 5600X", "Ryzen 3 3300X", "Asus ROG STRIX B550-F Gaming", "MSI B550-A Pro", "Samsung 970 Evo Plus 1TB", "Samsung 980 Pro 500GB", "Corsair Vengeance LPX 16 GB", "G Skill Aegis 8GB", "	Asus GeForce RTX 3060 Ti 8 GB", "	MSI GeForce GTX 1660 SUPER 6 GB"];
var allPartBasePrices = [300, 120, 195, 137, 130, 110, 63, 30, 600, 380];
var allPartShippingPrice = [8.00, 5.00, 10.00, 5.00, 10.00, 3.00, 5.00, 3.00, 10.00, 10.00];
//This empty list is used to track everything the user does in the 
//system builder. 
var userHistory = [];
//This other empty list is used to store the contents of the above list
//so that each index of the above list can be displayed individually. 
var userHistoryContents = [];
//This empty list is used to log the times at which the user does certain things 
//in the system builder like add or delete a PC part. 
var userTime = [];
//This empty list's purpose is to store the contents of the above list
//so that each index can be manipulated individually. 
var userTimeContents = [];
//This empty list is used to store the names of all parts that are deleted. 
//These names will then be displayed in the "History" section. 
var deletedItems = [];


//Function call
hidesQuestions();

//Event handlers that lead the user to the sign up/login screens. 
onEvent("LoginButton", "click", function( ) {
  setScreen("loginScreen");
});
onEvent("SignUpButton", "click", function( ) {
  setScreen("SignUp");
});


onEvent("createAccount", "click", function( ) {
  var Name = getText("SignUpUser");
  var Pass = getText("SignUpPass");
  //Makes sure that the user doesn't leave the username and password in the
  //sign up screen empty. 
  if (getText("SignUpUser")=="" || getText("SignUpPass")=="") {
    showElement("incorrectLogin2");
    setText("incorrectLogin2", "Please Enter a Username and Password.");
  } else {
    //When the user enters a username and password, it is stored in a database 
    //that will be used when the user has to log in using this info.
    createRecord("Accounts", {Username:Name, Password:Pass}, function() {
      setScreen("loginScreen");
    });
  }
});
onEvent("loginButton", "click", function( ) {
  readRecords("Accounts", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      //If the entered username and password matches the username and 
      //password the user entered in the sign up screen, the app continues. 
      if ((records[i]).Username == getText("nameInput") && records[i].Password==getText("pass")) {
        setScreen("homescreen");
        //This if statement makes sure that the user doesnt leave the username and 
        //password blank. 
      } else if (getText("nameInput")=="" || getText("pass")=="") {
        showElement("incorrectLogin");
        setText("incorrectLogin", "Please Enter a Username and Password.");
        //This else-if statement displays an alert when the user inputs the correct
        //username, but the incorrect password. 
      } else if (((records[i]).Username == getText("nameInput") && (records[i]).Password!=getText("pass"))) {
        showElement("incorrectLogin");
        setText("incorrectLogin", "Incorrect Password.");
        //This else-if statement displays an alert when the user inputs the correct
        //password but incorrect username. 
      } else if (((records[i]).Username != getText("nameInput") && records[i].Password==getText("pass"))) {
        showElement("incorrectLogin");
        setText("incorrectLogin", "Incorrect Username.");
      }
    }
  });
  //Right after the username and password entered by the user is verified, 
  //it immediatley checks if this user has made a PC part list before, and 
  //displays all of their information previously entered (if any is available). 
  readRecords("List Info", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if ((records[i]).Username == getText("nameInput") && records[i].Password==getText("pass")) {
        setProperty("partImage1", "image", (records[i]).CPUImage);
        setProperty("partLabel1", "text", (records[i]).CPULabel);
        setProperty("total1", "text", (records[i]).CPUPrice);
        setProperty("partImage2", "image", (records[i]).MoboImage);
        setProperty("partLabel2", "text", (records[i]).MoboLabel);
        setProperty("total2", "text", (records[i]).MoboPrice);
        setProperty("partImage3", "image", (records[i]).SSDImage);
        setProperty("partLabel3", "text", (records[i]).SSDLabel);
        setProperty("total3", "text", (records[i]).SSDPrice);
        setProperty("partImage4", "image", (records[i]).RAMImage);
        setProperty("partLabel4", "text", (records[i]).RAMLabel);
        setProperty("total4", "text", (records[i]).RAMPrice);
        setProperty("partImage5", "image", (records[i]).GPUImage);
        setProperty("partLabel5", "text", (records[i]).GPULabel);
        setProperty("total5", "text", (records[i]).GPUPrice);
      }
    }
  });
  //Welcomes the user based on the username entered. 
  setText("welcome2", "Welcome, " + getText("nameInput"));
});
onEvent("SaveList", "click", function( ) {
  //IF the user decides to save their list, their username and password is  
  //saved in a variable, along with information regarding the parts
  //the user may have chosen. 
  var username = getText("nameInput");
  var password = getText("pass");
  var CPUimage = getImageURL("partImage1");
  var CPUlabel = getText("partLabel1");
  var CPUprice = getText("total1");
  var Moboimage = getImageURL("partImage2");
  var Mobolabel = getText("partLabel2");
  var Moboprice = getText("total2");
  var SSDimage = getImageURL("partImage3");
  var SSDlabel = getText("partLabel3");
  var SSDprice = getText("total3");
  var RAMimage = getImageURL("partImage4");
  var RAMlabel = getText("partLabel4");
  var RAMprice = getText("total4");
  var GPUimage = getImageURL("partImage5");
  var GPUlabel = getText("partLabel5");
  var GPUprice = getText("total5");
  //Using these variables, a data table is created which stores the PC 
  //list info under the users specific username and password. It also gives
  //the user the option to continue with the app or sign out.
  createRecord("List Info", {Username:username,Password:password, CPUImage:CPUimage, CPULabel:CPUlabel, MoboImage:Moboimage, MoboLabel:Mobolabel, SSDImage:SSDimage, SSDLabel:SSDlabel, RAMImage:RAMimage, RAMLabel:RAMlabel, GPUImage:GPUimage, GPULabel:GPUlabel, CPUPrice:CPUprice, MoboPrice:Moboprice, SSDPrice:SSDprice, RAMPrice:RAMprice, GPUPrice:GPUprice}, function() {
    showElement("SaveListLabel");
    showElement("SignOut");
    showElement("continue");
  });
  //If the user signs out, the list "userHistory" will be updated with the string "Saved List".
  //It additionally logs the time at which the user signed out. 
  insertItem(userHistory, 0, "Saved List");
  insertItem(userTime, 0, getText("time"));
});
//After saving their list, If the user clicks sign out, it resets the PC list
// and changes the screen to avoid bugs. (Their list is still saved in the data table.)
onEvent("SignOut", "click", function( ) {
  resetList();
  setScreen("MainScreen");
  hideElement("SaveListLabel");
  hideElement("SignOut");
  hideElement("continue");
});
//If the user clicks continue after saving their list, it hides the label
//that pops up after clicking the "Save List" button. 
onEvent("continue", "click", function( ) {
  hideElement("SaveListLabel");
  hideElement("SignOut");
  hideElement("continue");
});
//If the user decides to go to the system builder, this event handler checks
//which labels and pictures should or should not be showing.
onEvent("builderButton", "click", function( ) {
  setScreen("SystemBuilder");
  for (var i = 1; i < 6; i++) {
    //If the user's saved list contains a missing part, this if-statement 
    //makes sure that an empty picture and label is not displayed.
    if (getText("partLabel"+i)=="") {
      hideElement("partImage"+i);
      hideElement("partLabel"+i);
      showElement("partButton"+i);
    }
    //This if-statement makes sure that if the user's saved list contains 
    //a PC component, that component is showing. 
    if (getText("partLabel"+i)!="") {
      showElement("partImage"+i);
      showElement("partLabel"+i);
      hideElement("partButton"+i);
    }
  }
});
//This timed loop displays the current date and time in the homescreen. 
//This information is used in the part history section of the app to log the 
//times at which the user added or removed components in the system builder.
//Recieved assistance from Bill Barnum's guide on how to display time and 
//date in code.org. https://www.youtube.com/watch?v=t63-woXUiLQ&ab_channel=BillBarnum
timedLoop(1000, function() {
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day= currentDate.getDate();
  var year = currentDate.getFullYear();
  var formatDate = month + "." + day + "." + year;
  setText("date", formatDate);
  
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();
  var formatTime = hour + ":" + minute + ":" + second;
  setText("time", formatTime);
});
//In the homescreen, if the user decides to click the sign out button, they 
//are returned to the homescreen and the list information that was prepared 
//for them is reset.
onEvent("homeSignOut", "click", function( ) {
  setScreen("MainScreen");
  resetList();
});
//Recieved assitance from Mr. Kaisers Guide on how to print lists correctly 
//https://www.youtube.com/watch?v=jc17eIToGD8&ab_channel=Mr.Kaiser
onEvent("History", "click", function( ) {
  //Makes sure that if the user clicks the history button multiple times, 
  //the below lists dont keep printing. 
  userHistoryContents = "";
  userTimeContents = "";
  for (var i  = 0; i < userHistory.length; i++) {
    //Transfers all information stored within the userHistory list to the 
    //userHistoryContents list. 
    userHistoryContents = userHistoryContents + userHistory[i];
    //Doing this allows each index within userHistoryContents list to be 
    //modified individually, and in this case, two spaces is put between 
    //each index. 
    userHistoryContents = (userHistoryContents + "\n") + "\n";
    //For the list that logs the times at which the user added or removed 
    //an item, the same thing explained in the above comment happens. 
    userTimeContents = userTimeContents + userTime[i];
    userTimeContents = userTimeContents + "\n" + "\n";
  }
  //Displays the contents of both lists for the user to see. 
  setText("Actionlbl", userHistoryContents);
  setText("timelbl", userTimeContents);
  showElement("historyBackTxt");
  showElement("historyLine");
  showElement("Actionlbl");
  showElement("timelbl");
  showElement("historyicon");
  showElement("historyExit");
  showElement("label4");
  showElement("label17");
  showElement("label23");
});
//When the user clicks the "X" after looking at their PC list history, 
//all of the labels and boxes related to the history button is hidden. 
onEvent("historyExit", "click", function( ) {
  hideElement("historyBackTxt");
  hideElement("historyLine");
  hideElement("Actionlbl");
  hideElement("timelbl");
  hideElement("historyicon");
  hideElement("historyExit");
  hideElement("label4");
  hideElement("label17");
  hideElement("label23");
  
});

//The next 5 event handlers make sure that the user is directed to the correct
//shopping section for each part in the system builder. 
onEvent("partButton1", "click", function( ) {
  setScreen("CPUSelect");
  resetErrorLabel();
});
onEvent("partButton2", "click", function( ) {
  setScreen("moboSelect");
  resetErrorLabel();
});
onEvent("partButton3", "click", function( ) {
  setScreen("ssdSelect");
  resetErrorLabel();
});
onEvent("partButton4", "click", function( ) {
  setScreen("ramSelect");
  resetErrorLabel();
});
onEvent("partButton5", "click", function( ) {
  setScreen("gpuSelect");
  resetErrorLabel();
});


//On the homescreen, if the user clicks the component information button,
//they are brought to the corresponding screen. 
onEvent("infoButton", "click", function( ) {
  setScreen("infoScreen");
});
//On the infoScreen, if the user clicks the button for the model of the 
//main 5 parts of a computer, they are shown the model.  
onEvent("model", "click", function( ) {
  setScreen("modelScreen");
});
//If the user clicks the home buttons on the infoscreen, they are brought
//back to the homescreen. 
onEvent("homebutton1", "click", function( ) {
  setScreen("homescreen");
});
onEvent("homeScreen2", "click", function( ) {
  setScreen("homescreen");
});


//Event handlers that show the correct questions depending on if a checkbox is selected and which box is selected.
//For example, if checkbox 1 is clicked, the parameters "true" and "1" are passed, which will then go to 
//the showQuestions function and display the correct question and arrow.
onEvent("checkbox1", "click", function( ) {
  showsQuestions(true, 1);
});
onEvent("checkbox2", "click", function( ) {
  showsQuestions(true, 2);
});
onEvent("checkbox3", "click", function( ) {
  showsQuestions(true, 3);
});
onEvent("checkbox4", "click", function( ) {
  showsQuestions(true, 4);
});
onEvent("checkbox5", "click", function( ) {
  showsQuestions(true, 5);
});


//Events for when each respective arrow is pressed to go back to the infoScreen.
onEvent("cpuArrow", "click", function( ) {
  setScreen("cpuScreen");
  showElement("checkbox2");
});
onEvent("moboArrow", "click", function( ) {
  setScreen("moboInfo");
  showElement("checkbox3");
});
onEvent("gpuArrow", "click", function( ) {
  setScreen("gpuInfo");
  showElement("checkbox4");
});
onEvent("ramArrow", "click", function( ) {
  setScreen("ramInfo");
  showElement("checkbox5");
});
onEvent("ssdArrow", "click", function( ) {
  setScreen("ssdInfo");
  showElement("model");
});


//Event handlers for back buttons on different screens throughout the app.  
onEvent("cpuBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("moboBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("gpuBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("ramBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("ssdBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("modelBack", "click", function( ) {
  setScreen("infoScreen");
});
onEvent("loginBack", "click", function( ) {
  setScreen("MainScreen");
});
onEvent("loginBack2", "click", function( ) {
  setScreen("MainScreen");
});


/*
This timed loop calcualtes the total price of all parts by getting the price
of each part and adding them together in a variable. Then, it
updates to the screen the correct total price every 500 milliseconds. 
*/
timedLoop(500, function() {
  var sumofParts = 0;
  sumofParts = getNumber("total1")+getNumber("total2")+getNumber("total3")+getNumber("total4")+getNumber("total5");
  setProperty("totalPriceParts", "text",  "$ "+sumofParts);
});


//This event hadler and loop controls the delete aspect of the app.
//It finds which checkboxes are selected for deletion using a variable. It then hides the element of the appropriate part piece and makes it blank.  
onEvent("trash", "click", function( ) {
  for (var i = 1; i < 6; i++) {
  var trashSelected = getChecked("delete"+i);
  if (trashSelected==true) {
      //Before the selected part is deleted, it inserts the name of the part 
      //to the first index of the empty list "deletedItems" so that it can 
      //be accessed when the user decides to view their list history. 
      insertItem(deletedItems, 0, getText("partLabel" + i));
      setProperty("partImage"+i, "image", "");
      setProperty("partLabel"+i, "text", "");
      setText("total"+i, "0");
      showElement("partButton"+i);
      hideElement("partImage"+i);
      hideElement("partLabel"+i);
      setChecked("delete"+i, false);
      //After an item is deleted, it updates the empty list "userHistory" 
      //using the most recent first index of the deletedItems list, along 
      //with the string "Deleted" before it. Additionally logs the time 
      //at which the part was deleted. 
      insertItem(userHistory, 0, "Deleted " + deletedItems[0]);
      insertItem(userTime, 0, getText("time"));
    }
  }
});




//This event handler controls the start new list button and hides everything when it is pressed. 
onEvent("StartNewList", "click", function( ) {
  resetList();
  //If the user starts a new list, the empty list "userHistory" is updated 
  //with the string "Reset List". The time at when the user started a new list
  //is also logged. 
  insertItem(userHistory, 0, "Reset List");
  insertItem(userTime, 0, getText("time"));
});


//This function hides all of the properties on the information screen.  
//This makes sure that the user looks at the information for each screen,
//insuring that they actually learned about each part and didn't simply skip 
//everything. 
function hidesQuestions() {
  hideElement("q1");
  hideElement("cpuArrow");
  hideElement("q2");
  hideElement("moboArrow");
  hideElement("q3");
  hideElement("gpuArrow");
  hideElement("q4");
  hideElement("ramArrow");
  hideElement("q5");
  hideElement("ssdArrow");
  hideElement("checkbox2");
  hideElement("checkbox3");
  hideElement("checkbox4");
  hideElement("checkbox5");
  hideElement("model");
  setChecked("checkbox1", false);
  setChecked("checkbox2", false);
  setChecked("checkbox3", false);
  setChecked("checkbox4", false);
  setChecked("checkbox5", false);
}

/*
Help from developer of CPT:https://studio.code.org/projects/applab/9m9PPUN8uJJ7RDQbYgQ76S_0DsO0_TBwRuN4Jmx45Vs/view
This funtion handles the checklist on the infoScreen. The parameter check 
determined if the box is checked and the parameter box checks which checkbox
was selected.
*/
function showsQuestions(check, box) {
  if (check==true&&box==1) {
    showElement("q1");
    showElement("cpuArrow");
  } else if (check==true&&box==2) {
    showElement("q2");
    showElement("moboArrow");
  } else if (check==true&&box==3) {
    showElement("q3");
    showElement("gpuArrow");
  } else if (check==true&&box==4) {
    showElement("q4");
    showElement("ramArrow");
  } else if (check==true&&box==5) {
    showElement("q5");
    showElement("ssdArrow");
  } else {
    hidesQuestions();
  }
}

//If any of the following confirm buttons is clicked AND its  
//corresponding radio button is pressed, 
//the function addPart is called with the parameter "false", which indicates 
//that the radio buttons are not empty.

//Else, If any of the confirm button is clicked but NO radio buttons have been clicked,
//the function addPart is called with the parameter "true", which indicates
//that the radio buttons are empty. 
onEvent("confirm1", "click", function( ) {
  if (getChecked("radio1")==true){
    addPart(false);
  } else if (getChecked("radio1")==false) {
    addPart(true);
  }
});
onEvent("confirm2", "click", function( ) {
  if (getChecked("radio2")==true){
    addPart(false);
  } else if (getChecked("radio2")==false) {
    addPart(true);
  }
});
onEvent("confirm3", "click", function( ) {
  if (getChecked("radio3")==true){
    addPart(false);
  } else if (getChecked("radio3")==false) {
    addPart(true);
  }
});
onEvent("confirm4", "click", function( ) {
  if (getChecked("radio4")==true){
    addPart(false);
  } else if (getChecked("radio4")==false) {
    addPart(true);
  }
});
onEvent("confirm5", "click", function( ) {
  if (getChecked("radio5")==true){
    addPart(false);
  } else if (getChecked("radio5")==false) {
    addPart(true);
  }
});
onEvent("confirm6", "click", function( ) {
  if (getChecked("radio6")==true){
    addPart(false);
  } else if (getChecked("radio6")==false) {
    addPart(true);
  }
});
onEvent("confirm7", "click", function( ) {
  if (getChecked("radio7")==true){
    addPart(false);
  } else if (getChecked("radio7")==false) {
    addPart(true);
  }
});
onEvent("confirm8", "click", function( ) {
  if (getChecked("radio8")==true){
    addPart(false);
  } else if (getChecked("radio8")==false) {
    addPart(true);
  }
});
onEvent("confirm9", "click", function( ) {
  if (getChecked("radio9")==true){
    addPart(false);
  } else if (getChecked("radio9")==false) {
    addPart(true);
  }
});
onEvent("confirm10", "click", function( ) {
  if (getChecked("radio10")==true){
    addPart(false);
  } else if (getChecked("radio10")==false) {
    addPart(true);
  }
});

//This is the main function of the app. It adds the correct part onto the system builder. 
//It does this by checking which radio button the user has selected with a 
//loop. At that specific index, the corresponding index of the lists
//that contain the names, images, and prices of all parts is used to update the screen.
//It then hides the correct buttons and displays the correct images in the
//correct spot using math.round to account for having 10 total parts but only
//5 rows. The parameter "emptyRadio" purpose is to check if the user has actually
//clicked on a radio button or not. 

function addPart(emptyRadio) {
    for (var i = 1; i < 11; i++) {
       var checkedBox = getChecked("radio"+i);
       if (checkedBox==true && emptyRadio==false) {
        setProperty("partImage"+Math.round(i/2), "image", partImages[i-1]);
        setText("total"+Math.round(i/2), allPartBasePrices[i-1]+allPartShippingPrice[i-1]);
        setProperty("partLabel"+Math.round(i/2), "text", allParts[i-1]);
        hideElement("partButton"+Math.round(i/2));
        showElement("partLabel"+Math.round(i/2));
        showElement("partImage"+Math.round(i/2));
        setChecked("radio"+i, false);
        setScreen("SystemBuilder");
        //Each time the addPart function is used, the userHistory list is updated with
        //the name of the part along with the string "Added" in front of it.
        //The time at which the part was added to the PC list is also added to the 
        //"userTime" list. 
        insertItem(userHistory, 0, "Added " + getText("partLabel" + Math.round(i/2)));
        insertItem(userTime, 0, getText("time"));
        //if there are no radio buttons selected, display random error message.
          } else if ((emptyRadio==true)) {
         setText("selectError"+Math.round(i/2), randErrorMsg());
         
       }
}
}
//Within this function, the list "partErrorList" is defined, Then, 
//a random index of this list is saved into the variable randomError and 
//is returned so that the variable can be used later. 
function randErrorMsg() {
  var partErrorList = ["Please Select The Component Under That Confirm Button.", "You Haven't Selected Anything!", "Choose A Part And Click its 'Confirm' Button."];
  var randomError = partErrorList[randomNumber(0, partErrorList.length-1)];
  return randomError;
}

//This function resets the PC part list by hiding and resetting each
//part image, label, and price. 
function resetList() {
  for (var i = 1; i < 6; i++) {
    
    setProperty("partImage"+i, "image", "");
    setProperty("partLabel"+i, "text", "");
    setText("total"+i, "0");
    showElement("partButton"+i);
    hideElement("partImage"+i);
    hideElement("partLabel"+i);
    setText("selectError"+i, "Choose A Component!");
  }
}
function resetErrorLabel() {
  for (var i = 1; i < 6; i++) {
    setText("selectError"+i, "Choose A Component!");
  }
}

//All sources that do not belong to me can be found below. 

/*
None of the images within this app have been created by me. All of the images are from these places:


file Type        Website of Origin of All Images:
.png             https://www.amazon.com/AMD-Ryzen-5600X-12-Thread-Processor/dp/B08166SLDF
.png             https://www.amazon.com/MSI-B550-PRO-ProSeries-Motherboard/dp/B089CZSQB4
.png             https://www.amazon.com/ASUS-ROG-B550-F-Motherboard-Addressable/dp/B088VSTS9H
.png             https://www.newegg.com/samsung-500gb-980-pro/p/N82E16820147789
.png             https://www.amazon.com/Corsair-Vengeance-3000MHz-Desktop-Memory/dp/B0134EW7G8
.png             https://www.newegg.com/G-SKILL-8GB-288-Pin-DDR4-SDRAM/p/N82E16820232419
.png             https://www.asus.com/Motherboards-Components/Graphics-Cards/TUF-Gaming/TUF-RTX3060TI-O8G-V2-GAMING/
.png             https://www.amazon.com/MSI-GeForce-192-bit-Support-Graphics/dp/B07ZHDZ1K6
.png             https://www.pcworld.com/article/541489/how-to-check-cpu-and-memory-usage.html
.jpg             https://www.javelin-tech.com/blog/2020/10/solidworks-2021-hardware-recommendations/
.jpg             https://store.playstation.com/en-us/product/UP5097-CUSA15916_00-0000000000000000

All Icons are from code.orgs free image gallery. 

Text Citations for Information in App:
https://www.digitaltrends.com/computing/what-is-a-cpu/
https://www.intel.com/content/www/us/en/products/docs/processors/what-is-a-gpu.html
https://www.hellotech.com/blog/what-is-ram-much-memory-do-i-need
https://www.crucial.com/articles/about-ssd/what-is-an-SSD
https://www.hp.com/us-en/shop/tech-takes/what-does-a-motherboard-do
*/
