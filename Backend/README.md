# Backend Setup Instructions

## การตั้งค่าฐานข้อมูล

### 1. ติดตั้ง MySQL
- ดาวน์โหลดและติดตั้ง MySQL จาก https://dev.mysql.com/downloads/
- หรือใช้ XAMPP/WAMP ที่มี MySQL อยู่แล้ว

### 2. สร้างฐานข้อมูล
1. เปิด MySQL Command Line หรือ phpMyAdmin
2. รันคำสั่ง SQL ในไฟล์ `database_setup.sql`:
   ```bash
   mysql -u root -p < database_setup.sql
   ```

### 3. ตรวจสอบการเชื่อมต่อ
- แก้ไขข้อมูลการเชื่อมต่อใน `server.js` ถ้าจำเป็น:
  ```javascript
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // ใส่รหัสผ่าน MySQL ของคุณ
      database: 'moonlightstudio'
  })
  ```

### 4. รัน Backend Server
```bash
cd Backend
npm install
npm start
```

Server จะรันที่ http://localhost:8081

### 5. ทดสอบ API
- เปิดเบราว์เซอร์ไปที่ http://localhost:8081/stylists/haircut
- ควรเห็นข้อมูล JSON ของช่างตัดผม

## API Endpoints

- `GET /` - หน้าแรก
- `GET /stylists` - ข้อมูลช่างทั้งหมด
- `GET /stylists/haircut` - ช่างตัดผม
- `GET /stylists/straightening` - ช่างยืดผม
- `GET /stylists/perm` - ช่างดัดผม
