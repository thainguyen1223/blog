[**HITEK INTERNSHIP EXAM | FRONT-END**]()

## Getting Started
Index
1. [Technical-stack
 ](#technical-stack)
2. [Implemented features ](#implemented-features)
3. [How to run](#how-to-run)
4. [API docs](#api)

---


# Technical-stack

NextJS | React-hook-form | Recoil | Ant-design | Vercel hosting

# Implemented features

1. **Trang đăng nhập và đăng ký**: có hai loại người dùng đăng nhập ,người dùng đăng nhập bằng nhánh user có thể xem blog và chi tiết blog , người dùng đăng nhập bằng nhánh master có thể xem blog và chinh tiết blog , có thể sửa và thêm blog .
2. **Blogs**: Trang blog chứa danh sách các blog có thể đánh số trang, người dùng bình thường có thể xem chi tiết blog bằng cách nhấp vào tiêu đề của blog
3. **Blog details**: Trang chi tiết blog chứa thông tin chi tiết về blog, bao gồm tiêu đề, mô tả, nội dung và hình ảnh minh họa về blog.
4. **Dashboard**: Trang tổng quan chứa danh sách các blog nhưng được đăng nhập bằng nhánh master có thể xem ,cập nhật , xóa và sửa .
5. **JSON-server and JSON-server-auth**: rang web này sử dụng JSON-server, đây là một thư viện cho phép các nhà phát triển giao diện người dùng tạo một back-end nhanh chóng để tạo nguyên mẫu và mô phỏng.


# How to run

1.Tạo forder json 
2.Để tạo cơ sở dữ liệu giả trong thư mục **json**, chúng ta chạy:
```sh
cd json
npm install
```
3.chúng tôi có thể sử dụng máy chủ JSON giả mạo của mình tại cổng 3004!

**Lưu ý**: Tên người dùng mặc định (mật khẩu giống với tên người dùng) cho người dùng bình thường: normaluser@gmail.com và người dùng chính: masteruser@gmail.com

4.Nếu bạn muốn tùy chỉnh máy chủ JSON của riêng mình? Không vấn đề gì, hãy tạo thư mục mới và sau đó:

Tạo cơ sở dữ liệu của riêng bạn bên trong tệp ``` db.json ```. Trong ``` pack.json ```, thay đổi dòng sau:
```sh
{
...
"bắt đầu": "json-server db.json -m ./node_modules/json-server-auth --port 3004"
...
}
```

# API

Bằng cách sử dụng máy chủ JSON, chúng tôi có cơ sở dữ liệu giả mạo hỗ trợ:
### Đăng ký

Bất kỳ tuyến đường nào sau đây đều đăng ký người dùng mới:

- **`POST /register`**
- **`POST /signup`**
- **`POST /users`**

**`email`** và **`password`** được yêu cầu trong nội dung yêu cầu :

``` http
ĐĂNG /đăng ký
{
   "email": "sampleUser@mail.com",
   "mật khẩu": "Mật khẩu mẫu"
}
```

### Đăng nhập

Bất kỳ tuyến nào sau đây đều ghi nhật ký người dùng hiện có vào:

- **`POST /login`**
- **`POST /signin`**

 **`email`** và **`password`** là bắt buộc:

``` http
ĐĂNG /đăng nhập
{
   "email": "sampleUser@mail.com",
   "mật khẩu": "Mật khẩu mẫu"
}
```

### Blog

Các tuyến sau cho phép chúng tôi tạo/cập nhật/xóa blog:

- **`POST /blogs`**
- **`PATCH /blogs/:id`**
- **`DELETE /blogs/:id`**
