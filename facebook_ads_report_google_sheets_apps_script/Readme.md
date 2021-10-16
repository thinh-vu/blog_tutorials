![automated facebook ads report to google sheets](https://thinhvu.com/wp-content/uploads/2021/10/automated_facebook_ads_report_to_google_sheets.jpg "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 1")

# Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script

[Data Science](https://thinhvu.com/data-science/) By [mrthinh](https://thinhvu.com/author/mrthinh/) [October 16, 2021](https://thinhvu.com/2021/10/16/bao-cao-facebook-ads-tu-dong-google-sheets/) [No Comments](https://thinhvu.com/2021/10/16/bao-cao-facebook-ads-tu-dong-google-sheets/#respond)

Quảng cáo Facebook từ lâu đã là 1 trong những lựa chọn hàng đầu của các doanh nghiệp, tổ chức và kể cả cá nhân khi muốn thực hiện chiến dịch marketing trên nền tảng mạng xã hội. Không mất nhiều thời gian để tìm kiếm các nội dung hướng dẫn cách chạy quảng cáo facebook hay làm sao để tối ưu chi phí hiệu quả. Tuy nhiên dễ dàng nhận ra rằng sẽ không có nhiều nội dung chất lượng để có thể tham khảo miễn phí vì đơn giản đó là bí quyết, là nghề kiếm cơm của các marketer hay agency. Cá nhân tôi sau nhiều năm làm về performance marketing từ vị trí vận hành cho đến quản lý, không ngừng tìm kiếm những cách làm mới và hiệu quả để giảm bớt gánh nặng của các công việc tay chân ít giá trị thay vào đó là dành thời gian suy nghĩ về các chiến lược, chiến thuật thực sự đem lại hiệu quả cho đội ngũ. Khi làm việc với các doanh nghiệp, agency, SME có thể dễ dàng nhận thấy cách làm việc thủ công tải báo cáo quảng cáo để theo dõi hiệu quả chiến dịch cực kỳ phổ biến, mất nhiều thời gian thao tác và khó theo dõi sát sao tình hình nhưng không nhiều đơn vị có cách giải quyết.

Để thiết lập báo cáo Facebook Ads tự động có thể thấy sẽ thực hiện được bằng 2 cách cơ bản: mua dịch vụ của bên thứ 3 hoặc tự phát triển công cụ thông qua lập trình. Với tuỳ chọn sử dụng dịch vụ của bên thứ 3 thì SuperMetrics là cái tên rất phổ biến có thể bạn đã từng nghe tới. Bạn có thể phải bỏ ra 99EUR/tháng để mua gói dịch vụ cơ bản Supermetrics for Google Sheets hoặc 69 EUR/tháng cho dịch vụ Supermetrics for Data Studio với duy nhất 1 nguồn dữ liệu. Một số công cty có đội ngũ lập trình, sử dụng dịch vụ đám mây bài bản thì có thể tự động hoá quy trình nhập dữ liệu quảng cáo vào database một cách đơn giản nhưng phần đông các marketer tôi gặp không may mắn làm ở các đơn vị như vậy.

![SuperMetrics là công cụ thường xuyên được sử dụng để tạo báo cáo Facebook Ads tự động](https://thinhvu.com/wp-content/uploads/2021/10/supermetrics_pricing-1024x709.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 2")

SuperMetrics là công cụ thường xuyên được sử dụng để tạo báo cáo Facebook Ads tự động

Một cách trùng hợp, tôi viết bài hướng dẫn này sau tròn 1 năm viết bài đầu tiên trên blog nói về [Google Apps Script và một số ứng dụng để tối ưu hiệu quả công việc cho Marketer](https://thinhvu.com/2020/10/18/google-apps-script-cho-digital-marketer-tu-dong-hoa-workflow/). Ở bài này tôi sẽ hướng dẫn các bạn ứng dụng thực tế đầu tiên một cách chi tiết về việc thiết lập tự động cập nhật báo cáo quảng cáo Facebook vào Google Sheets sử dụng ngôn ngữ Google Apps Script (được xây dựng trên nền tảng JavaScript). Sau khi tự động hoá được việc cập nhật dữ liệu vào Google Sheets, bạn hoàn toàn có thể tự xây dựng cho mình 1 dashboard để theo dõi hiệu quả quảng cáo 1 cách trực quan với Google Data Studio. Khi có thời gian tôi sẽ hướng dẫn thêm các bạn về phần này.

Phần giới thiệu cũng khá dài dòng, chúng ta bắt tay vào việc chính nha.

## 1. Tạo Access Token để tạo báo cáo Facebook Ads tự động qua Marketing APIs

Cốt lõi của việc tự động hoá việc cập nhật báo cáo quảng cáo Facebook ở đây sẽ là kết nối đến Facebook Marketing APIs - giúp cung cấp giao thức trao đổi dữ liệu cho ứng dụng của bạn với máy chủ Facebook. Bạn cần đăng ký tài khoản developer với Facebook bằng chính tài khoản Facebook mà bạn có quyền quản lý quảng cáo - tức tài khoản bạn muốn lấy dữ liệu báo cáo. Vui lòng tham khảo bài viết chi tiết của tôi để hiểu cách tạo 1 ứng dụng Facebook và lấy access token khá đơn giản [tại đây](https://thinhvu.com/2021/04/10/tao-ung-dung-token-facebook-marketing-api/).  
Acess token ở đây được hiểu đơn giản là 1 dãy ký tự ngẫu nhiên để xác thực bạn với hệ thống Facebook thay cho việc bạn dùng user name + password như thông thường. Sau khi có Access token bạn lưu tạm vào ứng dụng chỉnh sửa văn bản bất kỳ để thực hiện bước tiếp theo nhé.

## 2. Lưu trữ Facebook Access Token với Google Docs

Không có cách lưu trữ khoá bảo mật của bạn an toàn một cách hoàn hảo, trong lập trình cũng vậy. Khi bạn sử dụng Google Apps Script để viết ứng dụng của mình, việc lưu trữ cố định access token ngay trong file Script tuy đơn giản nhưng bất tiện trong nhiều trường hợp và tiềm ẩn rủi ro bảo mật. Dễ dàng nhận ra khi bạn làm việc cùng team của mình và file Google Sheets dùng để cập nhật dữ liệu báo cáo, cần chia sẻ với team thì ai cũng có thể dễ dàng mở phần code của file và thấy được Access Token của bạn. Để hạn chế rủi ro này, chúng ta sẽ lưu trữ Access Token vào 1 file Google Docs và import thông tin này bằng Google Apps Script.

Vì vậy bạn cần tạo mới 1 file Google Docs, paste chuỗi Access Token bạn có được vào file này và lưu tên của file tạm vào đâu đó để sử dụng trong các bước tiếp theo. Trong minh hoạ dưới đây, tôi sẽ paste toàn bộ dãy token vào file Google Docs, hãy đảm bảo không có khoảng trắng thừa nhé.Tên của file Google Docs ở đây sẽ là `fb_token_key_clasp`.

![google docs token key](https://thinhvu.com/wp-content/uploads/2021/10/google_docs_token_key-1024x430.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 3")

Lưu trữ Facebook Access Token Key vào Google Docs

## 3. Thiết lập file Google Sheets để lưu trữ dữ liệu báo cáo Facebook Ads

### 3.1. Tạo file Google Sheets với 2 sheet có tên Master và FB

Ở bước này bạn có thể tạo 1 file Google Sheets bất kỳ, bạn cần tạo 2 sheet trong đó 1 sheet sử dụng để chứa dữ liệu quảng cáo được tải tự động mỗi ngày (cho ngày trước đó) và 1 file dùng để chứa tất cả dữ liệu quảng cáo theo thời gian. Ở đây tôi đặt tên đơn giản FB cho sheet dùng để chứa dữ liệu theo ngày và Master để gộp tất cả dữ liệu quảng cáo. Lý do cần tạo 2 sheet là vì nếu bạn cần 1 báo cáo có thể thống kê hiệu quả quảng cáo trong thời gian dài thì việc tải dữ liệu từng ngày sau đó gộp dữ liệu đơn giản hơn so với việc tải nguyên dải báo cáo với thời gian dài có thể gặp lỗi và mất thời gian.

### 3.2. Mở công cụ Script editor trong Google Sheets và thiết lập các dòng lệnh

Tìm menu `Tools >> Script` editor như hình dưới đây để mở công cụ Script editor - cho phép lưu trữ và thực thi các lệnh viết bằng ngôn ngữ Google Apps Script (xây dựng trên JavaScript).

![apps script editor in google sheet](https://thinhvu.com/wp-content/uploads/2021/10/apps_script_editor_in_google_sheet-1024x488.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 4")

Mở Script Editor để làm việc với Google Apps Script từ Google Sheet

### 3.3. Tạo Script mới

Tiếp theo bạn cần tạo 2 file Script trong giao diện Script editor, bạn có thể đặt tên bất kỳ miễn là dễ nhớ để tiện quản lý. Ở đây tôi tạo file `facebook_campaign_report` để chứa đoạn mã dùng cho việc tải báo cáo Facebook Ads và `combine rp` để chứa đoạn mã giúp gom dữ liệu báo cáo hàng ngày vào file tổng hợp. Trong hình dưới đây, ở vị trí số 1 là nơi bạn tương tác với trình soạn thảo lệnh (IDE), vị trí số 2 là nơi bạn click để tạo file Script mới. Khá đơn giản phải không nào.

![apps script create new files](https://thinhvu.com/wp-content/uploads/2021/10/apps_script_create_new_files-1024x487.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 5")

Cách tạo mới các Script trong Google Apps Script Editor

### 3.4. Bắt tay vào "code" nhé

#### 3.4.1. Truy xuất Access Token đã lưu trong Google Docs

Hàm JavaScript bạn sẽ viết đầu tiên ở đây sẽ là getToken dùng để truy xuất dữ liệu trong file Google Docs nơi bạn lưu Facebook Access Token. Ở đây, bạn cần thay thế fb_token_key_clasp với tên file Google Docs bạn đã tạo ở bước trên.

```JavaScript
function getToken() {

const keyfile = 'fb_token_key_clasp'; // Place the name of your Google Docs that store your Facebook Access Token here

let files = DriveApp.getFilesByName(keyfile); // Get all files with name.

while (files.hasNext()) {

let file = files.next();

let Id = file.getId();

let content = DocumentApp.openById(Id).getBody().getText();

return content

}

}
```

#### 3.4.2. Khai báo các thiết lập báo cáo quảng cáo Facebook

-   Khai báo SHEET NAME: Bạn cần khai báo tên của Sheet dùng để lưu trữ dữ liệu báo cáo hàng ngày, ở đây tôi dùng sheet có tên là `FB`.
-   Khai báo AD ACCOUNT ID: Dãy số đặt bên cạnh tên tài khoản quảng cáo của bạn, trong hình ID này được khoanh bởi đường viền màu đỏ.

![how to get an ad account id facebook](https://thinhvu.com/wp-content/uploads/2021/10/how_to_get_an_ad_account_id_facebook-1024x487.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 6")

Cách tìm Facebook Ads Account ID

-   Khai báo report LEVEL: cấp độ truy xuất dữ liệu theo account, campaign, adset, vv. Bạn có thể chọn cấp độ tuỳ theo mục đích của mình. Ở đây tôi sẽ sử dụng campaign.
-   Khai báo DATE PRESET tức khoảng thời gian được Facebook định nghĩa sẵn để tải dữ liệu báo cáo, bạn có thể chọn yesterday, this_month, vv tuỳ thích. Ở đây chúng ta cần tải báo cáo của ngày hôm trước về để gộp vào file báo cáo chính nên sẽ cần thiết lập giá trị yesterday. Lưu ý: giá trị của date preset sẽ bị vô hiệu nếu bạn truy cập Facebook Marketing API và truyền thêm cả thông tin của Date Range như dưới đây. Bạn có thể tham khảo thêm chi tiết các date presettại đây.
-   Khai báo TIME RANGE tức ngày bắt đầu và kết thúc của báo cáo. Ở đây chúng ta đã chọn tải báo cáo theo Date Preset sẵn có nên không dùng đến thông tin này. Hiện tại bước này bị vô hiệu hoá do đang để ở chế độ comment. Bạn có thể kích hoạt giá trị Date Range bằng cách xoá 2 ký tự //ở đầu dòng và thay thế giá trị ngày bắt đầu, kết thúc tương ứng.
-   Khai báo TIME INCREMENT tức khoảng cách của các mốc lấy dữ liệu báo cáo. Ở đây chúng ta muốn lấy dữ liệu báo cáo liên tục theo từng ngày nên để giá trị là 1, nếu bạn muốn lấy dữ liệu báo cáo ở các mốc cách nhau 3 hay 7 ngày thì có thể thay giá trị tương ứng.
-   Khai báo DATA FIELD tức các trường thông tin bạn muốn có trong báo cáo trả về. Ở đây tôi chọn sẵn các giá trị phổ biến như bên dưới. Bạn có thể chọn thêm các giá trị khác nếu cần theo hướng dẫn tại đây.  
    Khai báo Breakdown tức phân đoạn dữ liệu thì cần thiết lập biến này. Ở đây tôi không sử dụng Breakdown nên để dòng code này ở chế độ comment. Bạn có thể tắt comment bằng cách xoá 2 dấu // như đã biết ở trên hoặc dùng phím tắt `Control/Command + /`.
-   Khai báo FILTERING tức bộ lọc dữ liệu để lấy các thông tin cần thiết theo nhu cầu của bạn. Bạn có thể tuỳ biến thông tin này bằng cách đọc thêm hướng dẫn tại integration document của Facebook tại đây.

```JavaScript
let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FB') // Place the name of your sheet to store daily report data here
 

const AD_ACCOUNT_ID = 'YOUR_ADS_ACCOUNT_ID'; // Replace your ad account ID here

const TOKEN = getToken();

const LEVEL = 'campaign'; // ad, adset, campaign, account

const DATE_PRESET = 'yesterday'; // this value will be ignored when time range is specified. More details: https://developers.facebook.com/docs/marketing-api/insights/parameters#param

//let TIME_RANGE = "{'since':'2021-10-01','until':'2021-10-16'}" // date time format should be "YYYY-MM-DD"

const TIME_INCREMENT = '1'; // number of days from 1 to 90

const FIELDS = 'account_id, campaign_name,adset_name,spend,impressions,reach,inline_post_engagement,clicks,actions'; // For more info: https://developers.facebook.com/docs/marketing-api/insights/parameters#fields

//let BREAKDOWNS = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SETTING_TAB_NAME).getRange(5,2).getValue(); // Uncomment if you need to use this line of code

let FILTERING = "[{'field':'action_type','operator':'IN','value':['comment','post_reaction','outbound_click', 'mobile_app_install', 'app_custom_event.fb_mobile_activate_app', 'app_custom_event.fb_mobile_complete_registration', 'app_custom_event.fb_mobile_add_to_cart', 'purchase', 'app_custom_event.fb_mobile_purchase', 'video_view', 'photo_view']}]"; // Uncomment if you need to use this line of code
```

#### 3.4.3. Tạo hàm RequestReport để yêu cầu truy xuất dữ liệu báo cáo

Sau khi đã thiết lập các cài đặt báo cáo ở trên, bạn có thể bắt tay vào viết hàm JavaScript thứ 2 giúp gửi 1 yêu cầu truy xuất dữ liệu báo cáo tới Facebook Marketing API, hàm này sẽ trả về 1 report_id là 1 chuỗi chữ số dùng để yêu cầu xuất dữ liệu báo cáo trong bước tiếp theo. Do khi tải dữ liệu báo cáo với số lượng lớn campaign thì hình thức gọi API và trả về dữ liệu dưới dạng JSON sẽ thường bị lỗi. Vì vậy bạn cần sử dụng phương thức [Asynchronous and Batch Requests](https://developers.facebook.com/docs/marketing-api/asyncrequests/) của Facebook như trong trường hợp này.

1 lưu ý nhỏ cho bạn là số dòng dữ liệu được yêu cầu tối đa ở đây đang được thiết lập là 10,000 dòng. Bạn có thể tìm và thay thế thông số này tại dòng `&limit=10000` nếu cần thiết.

```JavaScript
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
```

#### 3.4.4. Tạo hàm GetReport để xuất dữ liệu báo cáo ra Google Sheet

Ở bước này, chúng ta sẽ thiết lập hàm JavaScript thứ 3 dùng để xuất báo cáo theo thông số `report_id` đã có sau bước chạy hàm `RequestReport` ở trên. Dữ liệu tải về dưới dạng file csv và được chuyển đổi, sao chép vào sheet FB dùng để lưu trữ dữ liệu báo cáo hàng ngày. Hàm RequestReport sẽ thực hiện xoá toàn bộ dữ liệu hiện có trong sheet FB trước khi chép dữ liệu mới được tải về vào sheet này. Ở bước này sau khi đã có `report_id` thì hàm `RequestReport` sẽ tạm nghỉ 6000 ms để đợi công việc xuất dữ liệu của Facebook hoàn tất trước khi gửi yêu cầu tải dữ liệu dưới dạng file csv. Nếu báo cáo của bạn quá nặng và cần thời gian nhiều hơn để hoàn tất xuất dữ liệu hãy điều chỉnh tăng số ms này nhé (nếu gặp lỗi không tải được dữ liệu).

```JavaScript
// Get the Report to Sheet

function GetReport() {

const ReportID = RequestReport() // Report Run ID to export csv using Facebook API

Utilities.sleep(6000); //Change this number if Apps Script failed to download your data due to the large csv file

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

 
// Fetches & parses the URL

let fetchRequest = UrlFetchApp.fetch(url, options);

let results = Utilities.parseCsv(fetchRequest);


sheet.clearContents(); // clear all sheet contents


// Pastes the csv file in the sheet

sheet.getRange(1,1, results.length, results[0].length).setValues(results);

}
```

Tada, bạn đã hoàn tất bước này, bây giờ hãy lưu project bằng cách bấm icon hình chíếc đĩa mềm 💾 nhé.

#### 3.4.5. Thiết lập hàm combineData để gom dữ liệu báo cáo hàng ngày vào file Master

Trong bước này, bạn chuyển đến file script đã tạo ban đầu là `combine rp` để tiếp tục thiết lập hàm combineData. Thực tế ở đây bạn cần tạo 1 loạt các hàm nối tiếp nhau để phục vụ cho hàm chính là `combineData` nhưng cũng không quá phức tạp, tất cả việc bạn cần làm là copy paste.  
Bạn cần thay đổi giá trị Master là tên của sheet dùng để lưu trữ dữ liệu tổng hợp trong dòng lệnh này `let masterSheet = "Master"`; nếu bạn sử dụng tên khác. Hàm `combineData` sẽ thực hiện nhiệm vụ là tìm giá trị các cột tương ứng với dòng header trong sheet `Master` từ sheet `FB` để copy vào dòng liền kề dòng cuối cùng có trong sheet `Master`. Để thiết lập dòng header của sheet `Master` trước hết bạn chạy hàm `RequestReport` để xuất dữ liệu vào sheet `FB`, sau đó bạn copy dòng header tại đây và paste vào sheet `Master`, thay đổi thứ tự các cột nếu cần. Tất cả phần thiết lập hàm JavaScript đã xong. Bạn hãy lưu phần công việc của mình lại và thực hiện bước tiếp theo như dưới đây.

```JavaScript
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

// ss.getRange(2, 1, lr-1, lc).clearContent(); // clear content in the range from A2 to lastrows -1 and last column in the master sheet - using this option if we want replace old data by the new one

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
```

![google sheets master header](https://thinhvu.com/wp-content/uploads/2021/10/google_sheets_master_header-1024x487.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 7")

Tạo và sắp xếp thứ tự các cột dữ liệu trong sheet Master

### 3.5. Chạy thử tập lệnh

Sau khi thiết lập các hàm JavaScript như trên, bạn có thể thực thi các dòng lệnh của mình một cách thủ công rồi đấy. Thứ tự thực hiện như sau:

-   **Chọn hàm GetReport tại file facebook_campaign_report sau đó chọn Run để thực thi lệnh.** Trong lần đầu tiên thực thi lệnh bạn sẽ được yêu cầu cấp quyền truy cập cho App của bạn (tên app chính là tên Project bạn tạo trong Script editor). Bạn sẽ được cảnh báo vì truy cập nội dung chưa được xác thực an toàn, không có gì nguy hiểm ở đây mà là cảnh báo bảo mật mặc định của Google. Bạn cấp quyền thực thi cho app mới được tạo theo hướng dẫn ở 3 hình dưới đây nhé. Sau khoảng 1-2 phút bạn đã có dữ liệu trong sheet `FB` rồi đấy.

![google apps script review permission](https://thinhvu.com/wp-content/uploads/2021/10/google_apps_script_review_permission-1024x520.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 8")

Chọn Review permissions

![google apps script hasnt verified](https://thinhvu.com/wp-content/uploads/2021/10/google_apps_script_hasnt_verified.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 9")

Chọn mục advance để cho phép truy cập.

![google apps script authorized](https://thinhvu.com/wp-content/uploads/2021/10/google_apps_script_authorized.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 10")

Ở đây bạn chọn dòng cuối cùng Go to YOUR PROJECT trong trường hợp này project của mình tên là Labs nên sẽ là Go to Labs (unsafe) để tiếp tục.

-   **Tạo dòn header trong sheet Master:** Sau khi thực hiện xong xuôi bước cấp quyền truy cập và tải dữ liệu vào sheet FB thành công thì bạn copy dòng header trong sheet FB vào sheet Master sau đó sắp xếp lại thứ tự các cột nếu cần.

## 4. Thiết lập lịch cập nhật dữ liệu báo cáo

![google apps script config triggers](https://thinhvu.com/wp-content/uploads/2021/10/google_apps_script_config_triggers-1024x489.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 11")

Thiết lập Triggers để tự động cập nhật báo cáo Facebook Ads

Sau khi bước kiểm tra và chạy thử đã hoàn tất, bạn có thể sử dụng tính năng Triggers có sẵn trong Google Apps Script để lên lịch tự động chạy lệnh của mình. Chúng ta có 2 file lệnh riêng biệt nên sẽ cần lên lịch 2 lần theo thứ tự lần lượt như sau:

-   Hàm `GetReport` lên lịch chạy vào lúc 5-6AM hàng ngày (bạn có thể thay đổi để chạy sớm hơn nếu cần).

![google apps script scheduled facebook report](https://thinhvu.com/wp-content/uploads/2021/10/google_apps_script_scheduled_facebook_report-1024x457.png "Cập nhật báo cáo Facebook Ads tự động với Google Sheets và Apps Script 12")

Thiết lập thời gian thực thi Hàm JavaScript đã tạo

-   Hàm `CombineData` lên lịch chạy vào lúc 6-7AM hàng ngày tức sau khi hàm `GetReport` đã tải dữ liệu báo cáo về sheet `FB`. Việc này đảm bảo 2 tác vụ này sẽ được hoàn thành mà hạn chế khả năng gặp lỗi. Tôi cũng đã thử viết Script để kết hợp các hàm trên chạy tự động nhưng đôi khi vẫn gặp lỗi nên dùng cách này thấy khá ổn và khỏi phải suy nghĩ. Bạn có thể tuỳ chỉnh lại giờ tải báo cáo hợp lý với nhu cầu cuả mình. Chi tiết thao tác, bạn có thể tham khảo trong Video dưới đây.

Hướng dẫn thiết lập Triggers cho Google Apps Script

Như vậy, tôi đã hướng dẫn bạn hoàn thành xong các bước thiết lập 1 ứng dụng để cập nhật báo cáo quảng cáo tự động cho Facebook Ads bằng Google Apps Script rồi đó. Toàn bộ các script sử dụng trong hướng dẫn này, bạn có thể tải về từ Github của tôi tại đây 👉

[facebook_ads_report_google_sheets_apps_script](https://github.com/mrthinh/public_repo/tree/main/facebook_ads_report_google_sheets_apps_script).

👈  _Share bài viết qua Facebook/Linkedin để thấy link ẩn._

Tuy bài hướng dẫn có vẻ dài và phức tạp nhưng đảm bảo với các bạn là nó chỉ "trông có vẻ dài dòng" trong lần đầu tiên thiết lập. Khi đã trải qua 1 vài project thì đoạn Script của bạn sẽ gần như cố định, chỉ cần thay đổi Ad Account ID là bạn có thể lên lịch bao nhiêu báo cáo tuỳ thích mà không phải tốn bất kỳ đồng phí dịch vụ nào cả. Đây cũng là 1 project nhỏ giúp các bạn làm quen với Google Apps Script. Ngôn ngữ này cũng không quá khó học nhưng đòi hỏi hiểu biết về JavaScript cơ bản và cách thức tương tác với các APIs để có thể mở rộng tính năng cho ứng dụng của bạn. Nếu có bất kỳ thắc mắc nào về Apps Script thì hãy nhớ Google và Stackoverflow sẽ là người thầy của bạn. Bạn cũng có thể để lại bình luận bên dưới nếu có thắc mắc cần được hỗ trợ khi thực hiện project này,  sẽ trả lời khi có thể. Cuối cùng, nếu thấy bài viết hữu ích hãy chia sẻ qua Facebook, Linkedin để nhiều người có thể tiếp cận hơn.
