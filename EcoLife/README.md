# EcoLife - Ứng dụng theo dõi dấu chân carbon

## Giới thiệu

EcoLife là một ứng dụng web giúp người dùng theo dõi và cải thiện dấu chân carbon của họ thông qua việc ghi lại các hoạt động hàng ngày, cung cấp phân tích dữ liệu trực quan, và tạo động lực thông qua hệ thống gamification.

## Tính năng chính

- **Theo dõi hoạt động**: Ghi lại các hoạt động hàng ngày như phương tiện di chuyển, tiêu thụ năng lượng, chế độ ăn uống.
- **Dashboard phân tích**: Hiển thị dữ liệu trực quan về dấu chân carbon và xu hướng theo thời gian.
- **Gợi ý cá nhân hóa**: Cung cấp các gợi ý để giảm dấu chân carbon dựa trên hoạt động của người dùng.
- **Bảng xếp hạng**: So sánh tiến độ với những người dùng khác để tạo động lực.
- **Hệ thống huy hiệu**: Trao thưởng cho người dùng khi đạt được các mục tiêu thân thiện với môi trường.

## Công nghệ sử dụng

- React + Vite
- Tailwind CSS
- Firebase (Authentication, Firestore)
- Chart.js
- React Router

## Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository:
   ```
   git clone https://github.com/your-username/ecolife-app.git
   cd ecolife-app
   ```

2. Cài đặt các dependencies:
   ```
   npm install
   ```

3. Cấu hình Firebase:
   - Tạo một dự án Firebase mới tại [Firebase Console](https://console.firebase.google.com/)
   - Thêm một ứng dụng web vào dự án của bạn
   - Sao chép thông tin cấu hình Firebase và cập nhật trong file `src/services/firebase.js`

4. Chạy ứng dụng ở môi trường phát triển:
   ```
   npm run dev
   ```

5. Build ứng dụng cho môi trường production:
   ```
   npm run build
   ```

## Cấu trúc thư mục

```
/src
  /assets        # Hình ảnh, icons, và các tài nguyên tĩnh
  /components    # React components
    /ui          # UI components cơ bản
    /dashboard   # Components liên quan đến dashboard
    /activity    # Components liên quan đến hoạt động
    /leaderboard # Components liên quan đến bảng xếp hạng
    /suggestions # Components liên quan đến gợi ý
    /gamification # Components liên quan đến huy hiệu và gamification
  /contexts      # React contexts
  /hooks         # Custom React hooks
  /pages         # Các trang của ứng dụng
  /services      # Các services (Firebase, API, etc.)
  /utils         # Các hàm tiện ích
```

## Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Nếu bạn muốn đóng góp, vui lòng:

1. Fork repository
2. Tạo một branch mới (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở một Pull Request

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.
