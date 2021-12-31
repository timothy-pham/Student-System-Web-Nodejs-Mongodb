# Student-System-Web-Nodejs-Mongodb
1
503106 – LẬP TRÌNH WEB NÂNG CAO 
MÔ TẢ ĐỒ ÁN CUỐI KÌ
I. Giới thiệu
Với tình hình COVID diễn biến ngày càng phức tạp, Khoa Công nghệ thông tin (CNTT) muốn tăng cường sự tương tác giữa các sinh 
viên trên nền tảng trực tuyến. Do đó Khoa CNTT muốn cải tiến hệ thống thông báo (Notification) hiện có trong hệ thống thông tin sinh 
viên (Student Portal), bổ sung thêm các tính năng giúp sinh viên có thể trao đổi, tương tác trực tuyến và nhận được sự hỗ trợ từ nhà 
trường tốt hơn.
Hệ thống này có thể coi như là một mạng xã hội thu nhỏ nơi nhà trường có thể đăng các thông báo, và sinh viên có thể đăng bài lên để
trao đổi và chia sẻ.
II. Một số lưu ý quan trọng
• Được phép sử dụng các front-end framework, ví dụ như Bootstrap, jQuery, React, Angular, VueJS, v.v... tuy nhiên phải sử dụng 
CDN (nghĩa là được thêm vào project thông qua liên kết dạng htttps://… chứ không sử dụng tập tin tải về lưu trong project).
2
• Toàn bộ các đoạn mã nguồn liên quan đến CSS mà các em tự viết, các em để vào 1 file duy nhất có tên là style.css, đặt trong 
thư mục public/stylesheets của project. Tuyệt đối không được viết css trong các file views (inline css và internal css).
• Toàn bộ các đoạn mã nguồn liên quan đến client-side Javascript mà các em tự viết, các em để vào 1 file duy nhất có tên là 
main.js, đặt trong thư mục public/javascripts của project. Tuyệt đối không được viết Javascript/jQuery trong các file views.
• Ngôn ngữ back-end duy nhất được dùng trong đồ án là Javascript trên nền NodeJS.
• Cơ sở dữ liệu duy nhất được dùng trong đồ án là MongoDB.
• Sinh viên phải tự thực hiện đồ án, không chép bài của bạn, không chép bài trên mạng. Giảng viên sẽ kiểm tra đạo văn 
bằng phần mềm chuyên dụng trước khi chấm bài, mọi hình thức đạo văn đều bị 0 điểm và báo cáo cho nhà trường xử lý 
theo qui định.
• Sinh viên không cần phải viết báo cáo. Tuy nhiên sinh viên cần chụp lại các màn hình thể hiện các tính năng mà hệ thống 
mình làm được và dán vào một file word. Sau khi nộp bài, sinh viên sẽ được yêu cầu trình bày đề tài và trả lời vấn đáp với 
giáo viên chấm bài.
• Nếu có các vấn đề chưa rõ, sinh viên trao đổi trực tiếp với giảng viên dạy lý thuyết để được giải đáp.
III. Yêu cầu
3.1 Yêu cầu 1: đăng nhập
Hệ thống có 3 vài trò (roles) như sau:
• Admin, có toàn quyền quyết định trong hệ thống.
• Phòng/Khoa, có quyền quản lý nội dung trong chuyên mục do mình phụ trách.
• Sinh viên.
3
Admin đăng nhập vào hệ thống bằng username và password (được khởi tạo bằng database).
Phòng/Khoa đăng nhập vào hệ thống bằng username và password. Username và password này do Admin tạo.
Sinh viên muốn truy cập vào hệ thống thì phải đăng nhập. Sinh viên không tự tạo tài khoản mà đăng nhập bằng chức năng “Sign in with 
Google” (https://developers.google.com/identity/sign-in/web/sign-in). Như vậy việc xác thực mật khẩu sẽ được thực hiện bởi Google. 
Chỉ những tài khoản có email là @student.tdtu.edu.vn mới được phép đăng nhập vào hệ thống. Khi sinh viên đăng nhập thành công 
lần đầu thì hệ thống sẽ tạo tài khoản cho sinh viên trong cơ sở dữ liệu dựa vào thông tin lấy được từ tài khoản Google.
Ví dụ giao diện đăng nhập (giao diện chỉ có tính chất tham khảo):
3.2 Yêu cầu 2: tạo tài khoản và cập nhật thông tin tài khoản
Admin có quyền tạo tài khoản cho Phòng/Khoa. Khi tạo tài khoản, Admin có thể cấp quyền cho Phòng/Khoa đăng bài cho một hoặc 
nhiều chuyên mục sau đây: Phòng Công tác học sinh sinh viên (CTHSSV), Phòng Đại học, Phòng Sau đại học, Phòng điện toán và máy 
tính, Phòng khảo thí và kiểm định chất lượng, Phòng tài chính, TDT Creative Language Center, Trung tâm tin học, Trung tâm đào tạo 
4
phát triển xã hội (SDTC), Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM), Trung tâm hợp tác doanh nghiệp 
và cựu sinh viên, Khoa Luật, Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa, Viện chính sách kinh tế và kinh doanh, Khoa Mỹ thuật 
công nghiệp, Khoa Điện – Điện tử, Khoa Công nghệ thông tin, Khoa Quản trị kinh doanh, Khoa Môi trường và bảo hộ lao động, Khoa 
Lao động công đoàn, Khoa Tài chính ngân hàng, Khoa giáo dục quốc tế.
Phòng/Khoa chỉ có quyền đăng bài cho (những) chuyên mục mà mình phụ trách. Phòng/Khoa có thể thay đổi password mặc định do 
Admin cấp lúc đầu.
Sinh viên sau khi đăng nhập thành công có thể cập nhật lại thông tin cá nhân sau: Tên hiển thị, Lớp, Khoa và hình ảnh đại diện (profile 
picture).
3.3 Yêu cầu 3: quản lý nội dung
Sinh viên có quyền đăng bài viết lên (giống facebook, đăng lên tường của mình). Khi sinh viên đăng bài viết có thể kèm theo hình ảnh 
hoặc video (chỉ hỗ trợ video từ youtube). Tất cả các bài viết sinh viên đăng lên đều ở trạng thái public và những người khác đều thấy 
được. Ví dụ minh họa:
5
6
Sinh viên có thể sửa, xóa nội dung mà mình đã đăng. Khi một bài viết bị xóa thì các comment liên quan đến bài viết đó cũng bị xóa.
Chức năng tạo, xóa, sửa bài viết phải thực hiện bằng AJAX (không load lại trang).
Người dùng (Admin, Phòng/Khoa, Sinh viên) có thể comment vào một bài viết bất kì. Chức năng comment phải thực hiện bằng AJAX
(không load lại trang). Người dùng có thể xem được toàn bộ comments. Người dùng có thể xóa comment của chính mình.
Phòng/Khoa có quyền đăng bài viết trong chuyên mục mà mình phụ trách. Nếu được giao phụ trách nhiều hơn một chuyên mục thì khi 
đăng bài viết có thể chọn chuyên mục mà mình muốn đăng (mỗi bài viết chỉ thuộc một chuyên mục). Những bài viết của Phòng/Khoa
sẽ xuất hiện real-time (gợi ý: dùng socket.io) trên trình duyệt của những sinh viên đang active trên hệ thống dưới dạng một notification 
như sau (hình ảnh chỉ có tính chất minh họa):
7
Khi đó sinh viên có thể click vào thông báo đó để coi chi tiết thông báo.
Phòng/Khoa có thể sửa, xóa nội dung mà mình đã đăng.
8
3.4 Yêu cầu 4: hiển thị nội dung
Khi mới login vào thì người dùng sẽ có giao diện như hình minh họa bên dưới, trong đó phần timeline hiển thị các bài viết của tất cả 
người dùng, và phần thông báo mới hiển thị các thông báo của Phòng/Khoa. Ví dụ minh họa:
9
Tin tức trong timeline được hiển thị theo thứ tự từ mới đến cũ. Ban đầu sẽ hiển thị 10 tin mới nhất, khi kéo đến cuối trang thì trang web 
sẽ tự động load 10 tin tiếp theo và cứ như thế cho đến khi không còn tin nào nữa (sử dụng AJAX để load).
Video cần phải được nhúng (embed) vào trang web để có thể coi trực tiếp từ trang web. Hình ảnh có thể được hiển thị trực tiếp từ trang 
web mà không cần phải download về máy.
Người dùng có thể click vào “Xem tất cả” để xem tất cả thông báo từ Phòng/Khoa, có phân trang, mỗi trang có tối đa 10 thông báo (hình 
ảnh chỉ có tính chất minh họa):
10
Người dùng có thể click vào từng thông báo để xem chi tiết thông báo.
Người dùng có thể lọc thông báo theo Phòng/Khoa (hình ảnh chỉ có tính chất minh họa):
11
Người dùng cũng có thể click vào profile của một user bất kì để xem những bài viết của riêng user đó (xem tường của user đó).
3.5 Yêu cầu 5: giao diện thân thiện, responsive
Giao diện trang web không cần quá xuất sắc nhưng bố cục phải hợp lý, cân đối. Trang web cần có các menu, navigation bar hoặc tính 
năng tương tự để người dùng có thể dễ dàng di chuyển qua lại giữa các tính năng mà không cần phải nhớ url hoặc không cần phải quay 
lại trang chủ thì mới đến được tính năng khác. 
Trang web cần hỗ trợ tính năng responsive để có thể chạy tốt trên các thiết bị di động với những kích thước màn hình khác nhau.
12
3.6 Yêu cầu 6: triển khai
Sinh viên được yêu cầu đưa trang web mình lên một hosting nào đó để có thể chạy được trên internet (truy cập thông qua tên miền hoặc 
địa chỉ IP). Gợi ý: dùng https://www.heroku.com/ cho hosting và MongoDB Atlas cho CSDL (https://developer.mongodb.com/howto/use-atlas-on-heroku) 
IV. Nộp bài và thang điểm chi tiết
• Thư mục source: chứa toàn bộ mã nguồn, hình ảnh, và các tài nguyên khác của trang web. Lưu ý: xóa thư mục node_modules 
khi nộp bài.
• File readme.txt chứa đường dẫn đến trang web mà nhóm đã triển khai và các thông tin cần thiết (VD: username và password của 
admin) để giáo viên có thể truy cập được.
• File word chứa ảnh chụp màn hình thể hiện các tính năng của hệ thống.
Sinh viên nén toàn bộ các nội dung như trên thành một file .zip và đặt tên là MSSV-HoVaTen.zip, ví dụ: 5170001-NguyenVanA5180002-TranThiB.zip sau đó nộp theo hướng dẫn của giáo viên.
Thang điểm chi tiết cho từng phần như sau:
Nội dung
tiêu chí
Thang 
đánh giá 1 2 3
Điểm /10 0 điểm Tối đa ½ điểm Từ trên ½ điểm đến trọn điểm
1/ Yêu cầu 1 1.0
13
Nội dung
tiêu chí
Thang 
đánh giá 1 2 3
Điểm /10 0 điểm Tối đa ½ điểm Từ trên ½ điểm đến trọn điểm
Đăng nhập bằng 
Google Sign-in 0.5 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Người dùng có thể đăng nhập bằng tài 
khoản email @student.tdtu.edu.vn
- Sau khi đăng nhập thành công lần đầu, tài 
khoản của người dùng sẽ được hệ thống tự
tạo trong CSDL
Đăng nhập bằng 
username và 
password
0.5 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Admin và Phòng/Khoa có thể đăng nhập 
bằng username và password
2/ Yêu cầu 2 1.0
Admin tạo tài 
khoản cho 
Phòng/Khoa
0.5 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Admin tạo tài khoản cho Phòng/Khoa
- Admin phần quyền cho Phòng/Khoa 
(chuyên mục post bài)
- Phòng/Khoa có thể thay đổi password mặc 
định
Sinh viên thay 
đổi thông tin cá 
nhân
0.5 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Sinh viên có thể cập nhật các thông tin cá 
nhân sau: Tên hiển thị, Lớp, Khoa và hình 
ảnh đại diện.
3/ Yêu cầu 3 3.0
Sinh viên 
đăng/xóa/sửa bài 
viết của mình (sử
dụng AJAX, 
không load 
trang)
1.0 - Không làm được chức năng này.
- Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Sinh viên có thể đăng, xóa, sửa bài viết (sử
dụng AJAX, không load lại trang)
- Khi đăng bài viết có thể chèn hình ảnh 
hoặc video (youtube)
14
Nội dung
tiêu chí
Thang 
đánh giá 1 2 3
Điểm /10 0 điểm Tối đa ½ điểm Từ trên ½ điểm đến trọn điểm
User có thể
comment vào 
các bài viết
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- User có thể comment vào các bài viết (sử
dụng AJAX, không load lại trang)
- User có thể xem được toàn bộ comments
- User có thể xóa comment của chính mình
(sử dụng AJAX, không load lại trang)
Phòng/Khoa có 
thể đăng, xóa, 
sửa thông báo 
(hiển thị realtime)
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Phòng/Khoa có thể đăng thông báo, và các 
thông báo này sẽ hiển thị real-time trên trình 
duyệt của các user đang active.
- Phòng/Khoa có thể xóa, sửa các thông báo 
của mình.
4/ Yêu cầu 4 3.0
Hiển thị bài viết 
dưới dạng 
timeline và tự
load trang
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Bài viết của người dùng sẽ hiển thị dưới 
dạng timeline theo thứ tự từ mới đến cũ.
- Ban đầu sẽ hiển thị 10 tin, khi kéo xuống 
cuối trang sẽ tự động load 10 tin tiếp theo, 
và cứ như thế cho đến khi hết tin.
- Hình ảnh / Video có thể coi trực tiếp trên 
trang web mà không cần phải download 
hoặc mở thêm một cửa sổ mới.
Hiển thị toàn bộ
thông báo và coi 
thông báo theo 
Phòng/Khoa
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Hiển thị toàn bộ thông báo (có phân trang, 
mỗi trang 10 thông báo).
- Coi chi tiết thông báo.
- Lọc thông báo theo Phòng/Khoa.
Coi tất cả bài 
viết của một user 
bất kì
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Coi tất cả bài viết của một user bất kì.
- Trang này cũng có khả năng tự load trang 
(tương tự như phần timeline).
15
Nội dung
tiêu chí
Thang 
đánh giá 1 2 3
Điểm /10 0 điểm Tối đa ½ điểm Từ trên ½ điểm đến trọn điểm
4/ Yêu cầu 5
Website thân 
thiện, responsive
1.0 - Không làm được chức năng này. - Chỉ một số trang có khả năng responsive 
chứ không phải tất cả.
- Website thân thiện với người dùng, bố cục 
hợp lý, có menu và navigation.
- Tất cả các trang đều có khả năng 
responsive và hoạt động ổn định trên mọi 
loại thiết bị.
5/ Yêu cầu 6
Triển khai trang
web để có thể
dùng trên 
internet
1.0 - Không làm được chức năng này. - Có chức năng này nhưng hoạt động chưa 
hoàn chỉnh hoặc chưa đầy đủ.
- Website hoạt động ổn định trên nền tảng 
internet (truy cập thông qua tên miền hoặc 
địa chỉ IP).
Tổng điểm 10
V. Các lưu ý khác
• Nhiệm vụ của bài tiểu luận hoàn toàn độc lập với đồ án cuối kỳ, vì vậy tất cả các thành viên cần phải tham gia vào công việc 
của cả bài tiểu luận và đồ án cuối kỳ. Bài tiểu luận do giảng viên thực hành chấm. Bài đồ án cuối kỳ do giảng viên lý thuyết 
chấm.
• Các nhóm không được share code với nhau, không lấy source code trên mạng và tự có trách nhiệm bảo vệ source code của 
nhóm mình. Các nhóm có source code giống nhau (được kiểm tra bằng phần mềm chuyên dụng) hoặc giống trên mạng sẽ đều 
bị 0 điểm (tất cả các thành viên), không cần quan tâm nhóm nào share code và nhóm nào nhận code.
• Đề bài không thể mô tả quá chi tiết từng câu từng chữ về cách làm đúng, sinh viên phải tự tham khảo chức năng/giao diện trên
hệ thống thông tin sinh viên và kinh nghiệm sử dụng các trang web tương tự khác để áp dụng vào bài tập.
