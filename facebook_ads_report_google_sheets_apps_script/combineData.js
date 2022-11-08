/*
Append data from multiple sheets into one master sheet. 
The 1st row should be define as a header to append data
This script can handle the case of there is no lookup value in child sheet - which prevent the script to continue running as in the previous version
*/

function combineData() { 
   
    let masterSheet = "Master"; // Replace your Master sheet name here
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(masterSheet); // get the Master sheet - where all data should be combined. 
    let lc = ss.getLastColumn(); // get last column 
    let lr = ss.getLastRow() > 1 ? ss.getLastRow() : 1; // get last row. "?" mark works as a if condition >> if lastrow = 1 return 1, if lastrow > 1 return 2 
     
  //  ss.getRange(2, 1, lr-1, lc).clearContent(); // clear content in the range from A2 to lastrows -1 and last column in the master sheet - using this option if we want replace old data by the new one    
    let labels = ss.getRange(1, 1, 1, lc).getValues()[0]; // get the 1st row as header/label 
    labels.forEach(function(label,i){ 
      let colValues = getCombinedColumnValues(label,masterSheet); 
      ss.getRange(lr+1, i+1, colValues.length, 1).setValues(colValues); // set value from last row +1 (based on how many columns of label row) & using column length of data to combine 
       
    }) 
     
  } 

  function getCombinedColumnValues(label,masterSheetName) {      
    let sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); 
    let colValues = []; 
    for (let [i, sheet] of Object.entries(sheets)) { 
      let sheetName = sheet.getSheetName(); 
      if(sheetName !== masterSheetName) { 
        let tempValues = getColumnValues(label,sheetName); 
        colValues = colValues.concat(tempValues); 
      } 
    } 
     
    return colValues; 
  } 

  function getColumnValues(label,sheetName) { 
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); 
    let colIndex = getColumnIndex(label,sheetName) > 0 ? getColumnIndex(label,sheetName): ss.getLastColumn() + 1; //assign the last column + 1 as a blank column
    Logger.log(colIndex);
    let numRows = ss.getLastRow() - 1; 
    let colValues = ss.getRange(2, colIndex, numRows, 1).getValues(); 
    return colValues; 
  } 

  function getColumnIndex(label,sheetName) {    
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); 
    let lc = ss.getLastColumn(); 
    let lookupRangeValues = ss.getRange(1, 1, 1, lc).getValues()[0];   
    let index = lookupRangeValues.indexOf(label) + 1; 
     
    return index; 
     
  }