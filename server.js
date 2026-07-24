const http = require('http');

// ปรับพอร์ตเริ่มต้นเป็น 10000 เพื่อให้เข้ากับระบบของ Render.com ได้ทันที
const port = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // ✏️ แก้ไขข้อความในวงเล็บด้านล่างนี้ เป็น "ชื่อ-นามสกุล และ รหัสนักศึกษา" ของคุณได้เลยครับ
  res.end('<h1>ชื่อ-นามสกุล: นางสาวภัควลัญช์ มูลเบ้า | รหัสนักศึกษา: 69319010185</h1>');
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

