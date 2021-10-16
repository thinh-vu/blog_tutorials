// Read the Google Docs file to retrieve your Facebook Access Token key
function getToken() {
  const keyfile = 'REPLACE_YOUR_GOOGLE_DOCS_FILENAME_HERE'; // Replace your own value
  let files = DriveApp.getFilesByName(keyfile); // Get all files with name.
  while (files.hasNext()) {
    let file = files.next();
    let Id = file.getId();
    let content = DocumentApp.openById(Id).getBody().getText();
    return content
  }
}

let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FB') // Replace `FB` with the name of your sheet to store daily report data here
const AD_ACCOUNT_ID = 'REPLACE_YOUR_AD_ACCOUNT_ID_HERE'; // Replace your own value
const TOKEN = getToken();

const LEVEL = 'campaign';  // ad, adset, campaign, account
//let TIME_RANGE = "{'since':'2021-10-01','until':'2021-10-16'}" // date time format should be "YYYY-MM-DD"
const DATE_PRESET = 'yesterday'; // this value will be ignored when time range is specified. More details: https://developers.facebook.com/docs/marketing-api/insights/parameters#param
const TIME_INCREMENT = '1'; // number of days from 1 to 90
const FIELDS = 'account_id, campaign_name,adset_name,spend,impressions,reach,inline_post_engagement,clicks,actions'; // For more info: https://developers.facebook.com/docs/marketing-api/insights/parameters#fields
//let BREAKDOWNS = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SETTING_TAB_NAME).getRange(5,2).getValue();
let FILTERING = "[{'field':'action_type','operator':'IN','value':['comment','post_reaction','outbound_click', 'mobile_app_install', 'app_custom_event.fb_mobile_activate_app', 'app_custom_event.fb_mobile_complete_registration', 'app_custom_event.fb_mobile_add_to_cart', 'purchase', 'app_custom_event.fb_mobile_purchase', 'video_view', 'photo_view']}]";

// Get the Report to Sheet
function GetReport() {    
    const ReportID = RequestReport() // Report Run ID to export csv using Facebook API
    Utilities.sleep(6000); // Increase the value of sleep(6000) to add more wait time before your app start downloading the report.
    //Fetches the report as a csv file
    let url = 
        'https://www.facebook.com/ads/ads_insights/export_report' +
        '?report_run_id=' + ReportID +
        '&format=csv' +
        '&locale=en_US'+
        '&access_token=' + TOKEN;

    let options = {
        'method' : 'get'
      };
    let fetchRequest = UrlFetchApp.fetch(url, options); // Fetches & parses the URL 
    let results = Utilities.parseCsv(fetchRequest);

    sheet.clearContents(); // clear all sheet contents
    // Pastes the csv file in the sheet
    sheet.getRange(1,1, results.length, results[0].length).setValues(results);
}

// Run asynchorus request
function RequestReport() {
    let facebookUrl = 
    'https://graph.facebook.com/v11.0/' + 
    'act_' + AD_ACCOUNT_ID +
    '/insights?level=' + LEVEL +
    '&fields=' + FIELDS +
    '&date_preset=' + DATE_PRESET +
    //'&time_range=' + TIME_RANGE +
    //    '&breakdowns='  + BREAKDOWNS +
    '&access_token=' + TOKEN +
    '&time_increment=' + TIME_INCREMENT +
    '&filtering=' + FILTERING +
    '&limit=10000';
    let encodedFacebookUrl = encodeURI(facebookUrl);

    let options = {
        'method' : 'post'
    };

    // Fetches & parses the URL 
    let fetchRequest = UrlFetchApp.fetch(encodedFacebookUrl, options);
    let results = JSON.parse(fetchRequest.getContentText());

    // Caches the report run ID
    let reportId = results.report_run_id;
    let cache = CacheService.getScriptCache();
    let cached = cache.get("campaign-report-id");

    if (cached != null) {
    cache.put("campaign-report-id", [], 1);
    cache.put("campaign-report-id", reportId, 300); // cache for 5 minutes
    }
    else {
    cache.put("campaign-report-id", reportId, 300); // cache for 5 minutes
    }
  
  let report_id = CacheService.getScriptCache().get('campaign-report-id');
Logger.log(report_id);
return report_id;

}