# Tự “code” ứng dụng Mail Merge Gmail đơn giản trong 15 phút
![feature_image](https://thinhvu.com/wp-content/uploads/2021/12/mail_merge_gmail_feature_image.png)

[Productivity](https://thinhvu.com/productivity/) By [mrthinh](https://thinhvu.com/author/mrthinh/) [December 18, 2021](https://thinhvu.com/2021/12/18/tao-ung-dung-mail-merge-gmail-trong-15-phut/)

Một mùa giáng sinh & năm mới nữa lại đến, tôi tin rằng có nhiều bạn sẽ cần gửi email cám ơn/chúc mừng giáng sinh & năm mới cho khách hàng, đối tác và cả bạn bè. Lợi ích của việc cá nhân hoá nội dung email hẳn các bạn đều đã biết. Bạn có thể đạt được điều này dễ dàng với sự hỗ trợ từ các công cụ về Email Marketing. Trong bài viết này tôi xin giới thiệu về Mail Merge Gmail - 1 dự án vui với Google Apps Script giúp bạn tạo và gửi HTML email cá nhân hoá hàng loạt sử dụng chính Gmail của mình hoàn toàn miễn phí. Tôi tin rằng bạn chỉ cần khoảng 15 phút để thực hiện dự án này với chút hiểu biết cơ bản về HTML (hoặc chưa biết cũng chẳng sao vì tôi sẽ hướng dẫn bạn khá chi tiết).

Tôi xin thêm 1 vài dòng để kể về 1 trải nghiệm thực tế của bản thân khiến tôi tìm hiểu về cách thực hiện dự án này 2 năm về trước. Năm nọ, tôi còn làm ở công ty L thì có 1 bạn leader của một công ty chuyên chung cấp nền tảng về Automation Marketing tên I có gửi mail cho tôi mời tham dự Webinar nhưng toàn bộ nội dung email được soạn thảo cực kỳ chung chung và không hề nhắc đến tên của người nhận, có lẽ đây là 1 email đã được gửi hàng hàng loạt. Cũng kể thêm rằng thời gian đó vẫn đang là giai đoạn công ty tôi tìm kiếm 1 giải pháp về Automation Marketing và đối tác kia là 1 trong các lựa chọn chúng tôi cân nhắc. Điều này khiến tôi cảm thấy khá kỳ lạ vì một khi bạn là người đại diện cho giải pháp mà mình đang giới thiệu tới khách hàng nhưng cách thức giao tiếp với khách hàng thì lại hoàn toàn thủ công và không đại diện cho các tính năng sản phẩm hay ho mà mình đang quảng bá. Sẵn tiện đang nghiên cứu về Google Apps Script tôi tìm hiểu cách thực hiện mini project này ứng dụng vào thực tế cuộc sống.

Để thực hiện dự án này, bạn sẽ cần làm quen với một số công cụ mới như Brackets, Google Apps Script. Nhìn có vẻ phức tạp nhưng tin tôi đi, thực hiện xong tutorial này bạn sẽ cảm thấy mình như đạt được 1 thành tựu và cũng khá kích thích. Chúng ta cùng bắt tay vào việc nhé.

## Tạo danh sách người nhận email với Google Sheets

Trước hết chúng ta hãy bắt đầu tạo 1 trang tính với công cụ làm việc văn phòng quốc dân Google Sheets. Trong trang tính này, chúng ta sẽ sử dụng để lưu trữ thông tin của người nhận mail bao gồm 3 nội dung chính: First Name, Last Name và Email. Hãy tạo 3 cột thông tin này theo đúng thứ tự như hình minh hoạ, tên cột bạn thích đặt là gì cũng được vì dữ liệu của trang tính này sử dụng để merge mail bắt đầu từ dòng thứ 2. Trên thanh địa chỉ của trình duyệt web bạn đang chỉnh sửa trang tính, hãy copy và lưu chuỗi ký tự ngẫu nhiên được sử dụng như là Spreadsheet_ID có trong hình minh hoạ bên dưới vào đâu đó để sử dụng ở các bước sau. 

Địa chỉ file Spreadsheet của tôi là `https://docs.google.com/spreadsheets/d/1q5KgPraQaw0MVcI2ZawWlu1c4PbUIjxPWPuoPxJXlq0/edit#gid=0` vì vậy ID tôi cần lấy trong bước này là `1q5KgPraQaw0MVcI2ZawWlu1c4PbUIjxPWPuoPxJXlq0`

Bạn có thể nhập tối đa 50 người nhận email mỗi lần gửi (giới hạn của Gmail) tuy nhiên hãy bắt đầu với địa chỉ email bạn sẽ dùng để kiểm tra project này hoạt động chính xác trước khi gửi mail hàng loạt. 

## Chuẩn bị email template dưới dạng HTML

Bạn có thể tìm kiếm ‘HTML email template' với Google theo chủ đề mình cần để download 1 email template phù hợp. Tôi tìm thấy 1 template ưng ý cho chủ đề Christmas tại trang [**https://stripo.email/templates**](https://stripo.email/templates). Tại đây bạn có thể download 5 email template để sử dụng. File sau khi download từ trang web này được nén dưới dạng zip, bạn cần giải nén để có thư mục và các file đi kèm.

Nếu email template bạn chọn có chứa các hình ảnh đi kèm thì hãy upload các hình này lên 1 public host nào đó ví dụ website của bạn hoặc cũng có thể upload lên tài khoản Github của riêng bạn (public repository nhé). Lưu ý: bạn cần lấy Image address của file ảnh lưu trên Github bằng cách mở file trong repository sau đó nhấp chuột phải vào hình ảnh và chọn Copy Image address.

Để làm theo tutorial này, bạn hãy ghé thăm repository cho dự án này của tôi trên Github [tại đây](https://github.com/mrthinh/public_repo/tree/main/mail_merge_google_appscript).

![mail merge github repo](https://thinhvu.com/wp-content/uploads/2021/12/mail_merge_github_repo.png)

Github repository của project Mail Merge Gmail

Trong repo này bạn hãy mở file index.html và copy toàn bộ source code sau đó tạo file index.html (cùng tên) trong Brackets để chỉnh sửa nội dung email phù hợp với nhu cầu của bạn. File index.html có trong repo trên thể hiện email template như dưới đây:

![](https://thinhvu.com/wp-content/uploads/2021/12/mail_merge_gmail_xmas_template.png)

Đây là email template mình lựa chọn sử dụng trong project Mail Merge Gmail này.

Nếu bạn không thích màu mè mà chỉ cần gửi email dưới dạng thuần text, hãy theo dõi thêm nội dung phụ lục bên dưới để biết cách tạo 1 email template đơn giản nhé.

## Chỉnh sửa HTML email template với Brackets

> Brackets là một “code editor" hiện đại làm việc với HTML, CSS và JavaScript được phát triển lần đầu bởi Adobe. Hiện tại dự án chuyển sang mã nguồn mở và được cộng đồng duy trì và phát triển. Brackets cung cấp tính năng Live Preview rất tuyệt vời giúp bạn lập trình web và xem các thay đổi được tạo ra trong code editor trực tiếp trên trình duyệt.

Mặc dù tôi sử dụng Visual Code Studio làm code editor khi cần lập trình nhưng khi làm việc với HTML và nhất là các trường hợp cần tạo email tuỳ chỉnh tự code thì Brackets là ưu tiên hàng đầu. Nếu bạn có sẵn Visual Studio Code, Notepad++, Sublime, vv sử dụng làm code editor và không muốn thử Brackets thì bạn hoàn toàn có thể tiếp tục với lựa chọn của mình.

Để tải Brackets hãy ghé thăm trang web chính thức [https://brackets.io](https://brackets.io/) và download bản cài đặt tương ứng với hệ điều hành bạn đang sử dụng. Trong khuôn khổ bài viết này tôi sử dụng Brackets V2.01 trên macOS Monterey version 12.0.1.

Giao diện Brackets khá đơn giản, bạn hãy tạo 1 file index.html sau đó copy/paste nội dung của file index.html có trong repo trên Github nêu ở trên để bắt đầu. Tính năng Live Preview của Brackets giúp bạn xem trực tiếp các thay đổi trong source code trên trình duyệt web đồng thời khi bạn click vào code thì phần hiển thị trên trình duyệt sẽ được highlight, ngược lại khi click vào 1 phần tử trên trình duyệt thì đoạn code tương ứng sẽ được highlight. Điều này giúp bạn tìm thấy phần text tuỳ chỉnh cần thay đổi rất dễ dàng.

Ở template trên, sau câu chào “Merry Christmas" chúng ta chèn 2 thông tin First Name, Last Name  sử dụng thông tin từ Google Sheets tương ứng với 2 đoạn code `<?= fn ?>` và `<?= ln ?>`.

Cùng xem qua các thao tác trên Brackets ở Video dưới đây.

Hướng dẫn thao tác chỉnh sửa HTML email template trên Brackets

## Tạo ứng dụng Mail Merge Gmail với Google Apps Script

Sau khi hoàn thành sửa đổi email template với file index.html bạn có thể copy toàn bộ source code và chuyển qua bước thao tác với Google AppScript.

-   Mở Google AppScript bằng tài khoản Google bạn muốn sử dụng để gửi mail tại địa chỉ [https://script.google.com/home](https://script.google.com/home)
-   Tạo project mới bằng cách chọn New project

![google apps script new project](https://thinhvu.com/wp-content/uploads/2021/12/google_apps_script_new_project-1024x281.png)

Tạo project mới trên Google Apps Script

-   Đặt tên cho project của bạn, ở đây tôi chọn là `Xmas Mail Merge`

![rename mail merge project](https://thinhvu.com/wp-content/uploads/2021/12/rename_mail_merge_project-1024x536.png)

Đặt tên cho project Mail Merge Gmail

-   Tạo file `index.html` và paste source code từ file index.html đã tạo với Brackets

![create code html elements](https://thinhvu.com/wp-content/uploads/2021/12/create_code_html_elements-1024x328.png)

Tạo file HTML cho project để cấu hình HTML email template

-   Copy/paste đoạn code từ file `mail_merge_app.js` trong repository trên Github được giới thiệu ở phần trên vào file `Code.gs` có sẵn trong project trên Google Apps Script. Từ đây chúng ta sẽ làm việc với Code.gs là chính.

![Tạo ứng dụng Mail Merge Gmail với Google Apps Script](https://thinhvu.com/wp-content/uploads/2021/12/xmas_mail_merge_code_gs-1024x441.png)

Giao diện làm việc với file Code.gs trên Google Apps Script (tham khảo)

-   Copy/paste Spreadsheet ID của file Google Sheets chứa thông tin người nhận email thay thế cho `INSERT_YOUR_SPREADSHEET_ID_HERE`.
-   Thay đổi Email title tại `INSERT_YOUR_EMAIL_TITLE_HERE`
-   Thay đổi Email Sender name tại `INSERT_EMAIL_SENDER_NAME_HERE`

Cơ bản là các bước cài đặt đã xong. Giờ đây bạn có thể thực thi project của mình.

Chọn **Run** trên giao diện Script editor để thực thi các dòng lệnh có trong file Code.gs. Lần đầu tiên thực thi các dòng lệnh bạn sẽ cần cấp quyền cho ứng dụng của mình (tên ứng dụng chính là tên function, ở đây là `Mail_Merge_App`). Sẽ không có rủi ro bảo mật nào ở đây, đơn giản bạn chỉ cấp quyền để các ứng dụng của tài khoản Google bạn đang dùng được kết nối với nhau, trong trường hợp này  là Google Apps Script, Google Sheets và Gmail. 

![google apps script authen step1](https://thinhvu.com/wp-content/uploads/2021/12/google_apps_script_authen_step1-942x1024.png)
    
    Chọn tài khoản Google sẽ cấp quyền cho ứng dụng
    
![google apps script authen step2](https://thinhvu.com/wp-content/uploads/2021/12/google_apps_script_authen_step2-1024x701.png)
    
    Chọn advanced
    
![google apps script authen step3](https://thinhvu.com/wp-content/uploads/2021/12/google_apps_script_authen_step3-1024x897.png)
    
    Xác thực cấp quyền cho ứng dụng
    
![google apps script authen step4](https://thinhvu.com/wp-content/uploads/2021/12/google_apps_script_authen_step4-916x1024.png)
    
    Cho phép ứng dụng tạo từ Google Apps Script được thực thi
    

Tada! Sau khi xác thực xong Google Apps Script sẽ kích hoạt Gmail để gửi email tới các địa chỉ bạn liệt kê trong Google Sheets. Hãy đảm bảo rằng bạn chỉ nhập địa chỉ email test vào file Google Sheets trước khi bạn chắc chắn rằng project mail merge gmail của mình hoạt động đúng như kỳ vọng và nội dung email được chèn chính xác.

Lưu ý: chỉ có các code có trong các file `*.gs` mới được thực thi, file `index.html` hoạt động như 1 file đính kèm và không chứa lệnh có thể thực thi.

## Thành quả của ứng dụng Mail Merge Gmail

Đến đây hy vọng các bạn đã có thể hoàn thành bước thiết lập ứng dụng đầu tay với Google Apps Script có vẻ khá rắc rối nhưng cực kỳ đơn giản khi đã làm quen 1 vài lần.

Đây là hình ảnh thực tế của email được gửi đi bằng ứng dụng Mail Merge Gmail sử dụng Google Apps Script trong hòm thư của tôi.

![mail merge gmail inbox preview xmas](https://thinhvu.com/wp-content/uploads/2021/12/mail_merge_gmail_inbox_preview_xmas-1024x584.png)

HTML Email được gửi đi bằng ứng dụng Mail Merge Gmail mới được thiết lập trong hòm thư

## Nội dung tham khảo

### Responsive Email Template tối giản

Trong trường hợp bạn muốn thiết kế 1 HTML email template sử dụng text là chính thay vì cần nhiều yếu tố đồ hoạ thì [html_email_template](https://github.com/leemunroe/responsive-html-email-template) này sẽ là 1 lựa chọn tốt cho bạn. Bạn hãy truy cập repository này và download cả thư mục của repo dưới dạng file zip về máy và mở thư mục làm việc với Brackets để tuỳ chỉnh lại nội dung email cần thiết.

![simple html email template](https://thinhvu.com/wp-content/uploads/2021/12/simple_html_email_template.png)

Để hiểu hơn vể các tag có trong HTML email bạn có thể tham khảo thêm thông tin dưới đây.

### Các HTML thường gặp trong email marketing

Trong 1 HTML email, người ta thường tổ chức nội dung dưới dạng các bảng (table) lồng nhau với nhiều hàng và ô xen kẽ. Bạn sẽ bắt gặp các HTML tags trong bảng sau ở gần như mọi HTML email.

|HTML Tag|Mô tả|
|---|---|
|`<table>`|Xác định 1 đối tượng bảng (table)|
|`<tr>`|Xác định 1 hàng của bảng (table row)|
|`<td>`|Xác định 1 ô của bảng (table data cell)|
|`<th>`|Xác định dòng tiêu đề (header) của bảng|
|`<thead>`|Xác định 1 nhóm các tiêu đề của bảng|
|`<tbody>`|Xác định 1 nhóm các table body)|
|`<tfooter>`|Xác định 1 nhóm các table footer|

Các tag thường gặp được sử dụng để tạo HTML email layout

Cùng xem qua cấu trúc file HTML chứa nội dung chính của email trên, bạn sẽ thấy các thẻ đánh dấu table được sử dụng lồng nhau theo từng cặp ví dụ `<table></table>`. Các nội dung chính của email body được khoanh đỏ trong hình dưới đây. Vì vậy để thay đổi nội dung của email sử dụng template tối giản này bạn có thể bắt đầu bằng việc thay thế các dòng text sẽ hiển thị trong email. Hãy bật chế độ Live Preview trong Brackets và kiểm tra các thành phần nội dung email cần chỉnh sửa.

Ngoài nội dung chính trong email, bạn có thể loại bỏ hoàn toàn email footer nếu muốn tạo 1 email template sử dụng hoàn toàn cho mục đích cá nhân. Để loại bỏ footer, bạn hãy xoá toàn bộ đoạn code bắt đầu từ `<!-- START FOOTER -->` cho đến hết `<!-- END FOOTER -->`.

![responsive html email brackets](https://thinhvu.com/wp-content/uploads/2021/12/responsive_html_email_brackets-1024x570.png)

Cấu trúc các thẻ trong 1 HTML email và nội dung chính của email trong phần email body

### Giới hạn của Google Apps Script

Google Apps Script được xây dựng trên JavaScript nên cũng không quá khó để học và phát triển ứng dụng tuy nhiên dịch vụ này cũng có những hạn chế của nó. Một trong những hạn chế bạn cần lưu ý là thời gian thực thi lệnh của GAS không vượt quá 6 phút/lần.

Đối với Gmail sử dụng để gửi mail hàng loạt như bài viết này bạn cần lưu ý rằng giới hạn cho phép của Gmail là 50 người nhận/email. Do đó nếu bạn có list người nhận dài hơn 50 người sẽ cần tách thành nhiều lần gửi khác nhau.

Để tham khảo đầy đủ thông tin về các giới hạn của dịch vụ Google, bạn có thể tham khảo [tại đây](https://developers.google.com/apps-script/guides/services/quotas).

![image](https://thinhvu.com/wp-content/uploads/2021/12/image.png)

### Nguồn tham khảo

Source code của ứng dụng Mail Merge Gmail mà các bạn đang sử dụng (file Code.gs) được giới thiệu bởi [http://www.chicagocomputerclasses.com](http://www.chicagocomputerclasses.com/) và kênh Youtube [Learn Google Spreadsheets](https://www.youtube.com/channel/UC8p19gUXJYTsUPEpusHgteQ) của họ. Đây là kênh nội dung rất hữu ích để bạn tham khảo nếu muốn tìm hiểu thêm về Google Apps Script và Google Sheets.
