function Mail_Merge_App(){ // You can set any names for this function
  let mail_title = "INSERT_YOUR_EMAIL_TITLE_HERE"; // Eg: Merry Christmas
  let first = 0; // Order of the First Name column in the Spreadsheet - column A - index = 0
  let last = 1; // Order of the Last Name column in the Spreadsheet - Column B - index = 1
  let email = 2; // // Order of the Email column in the Spreadsheet - Column C - index = 2
  let emailTemp = HtmlService.createTemplateFromFile("index"); // Insert the name of the index file, "index.html" is the HTML file name in my project
  let ws = SpreadsheetApp.openById("INSERT_YOUR_SPREADSHEET_ID_HERE") // <-- Insert Spreadsheet ID here
  let data = ws.getRange("A2:C" + ws.getLastRow()).getValues(); // A2:C is the Data range for merge data including First Name, Last Name, and Email address columns
  data.forEach(function(row){
      emailTemp.fn = row[first];
      emailTemp.ln = row[last];
      let htmlMessage = emailTemp.evaluate().getContent();
      GmailApp.sendEmail(
        row[email], 
        mail_title + ', ' + row[first] + '!', // Personalized the Email title here. row[first] will insert the First Name of your recipient. Ex. "Merry Christmas, Henry!"
        "Your email doesn't support HTML.", // False back message
        {name: "INSERT_EMAIL_SENDER_NAME_HERE", htmlBody: htmlMessage} // Email sender name. Change the Sender to yours.
        );        

      }
  );
    
}
