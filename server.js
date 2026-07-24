const http = require('http');
const { Pool } = require('pg');

// 1. ตั้งค่า Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // แนะนำ: เปิด SSL เมื่อใช้งานบน Cloud เช่น Railway
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // 2. ดึงข้อมูลจากฐานข้อมูล
    const { rows } = await pool.query('SELECT * FROM students ORDER BY student_id ASC');

    // 3. สร้าง HTML โดยใช้ Tailwind CSS สำหรับ UI ที่สวยงามและ responsive
    const html = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ระบบฐานข้อมูลนักศึกษา</title>
        <!-- ดึง Tailwind CSS มาตกแต่ง UI -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Prompt', sans-serif; }
        </style>
      </head>
      <body class="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          
          <!-- Header -->
          <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">ฐานข้อมูลนักศึกษา</h1>
              <p class="text-sm text-slate-500 mt-1">ระบบทดสอบการเชื่อมต่อ PostgreSQL บน Railway</p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Database Connected
            </span>
          </div>

          <!-- Table Container -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/75 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th class="py-4 px-6">รหัสนักศึกษา</th>
                    <th class="py-4 px-6">ชื่อ-นามสกุล</th>
                    <th class="py-4 px-6 text-right">สถานะ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm">
                  ${
                    rows.length > 0
                      ? rows.map(student => `
                          <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="py-4 px-6 font-mono font-medium text-indigo-600">
                              ${student.student_id}
                            </td>
                            <td class="py-4 px-6 font-medium text-slate-700">
                              ${student.student_name}
                            </td>
                            <td class="py-4 px-6 text-right">
                              <span class="inline-flex px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600">
                                ปกติ
                              </span>
                            </td>
                          </tr>
                        `).join('')
                      : `
                          <tr>
                            <td colspan="3" class="py-8 text-center text-slate-400">
                              ไม่พบข้อมูลนักศึกษาในระบบ
                            </td>
                          </tr>
                        `
                  }
                </tbody>
              </table>
            </div>

            <!-- Footer Stats -->
            <div class="bg-slate-50/50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 text-right">
              จำนวนทั้งหมด <span class="font-semibold text-slate-700">${rows.length}</span> รายการ
            </div>
          </div>

        </div>
      </body>
      </html>
    `;

    res.end(html);

  } catch (err) {
    console.error('Database Error:', err);
    
    // UI หน้าต่างแสดง Error แบบสะอาด ไม่หลุดกรอบ
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap" rel="stylesheet">
        <style>body { font-family: 'Prompt', sans-serif; }</style>
      </head>
      <body class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div class="bg-white max-w-md w-full rounded-2xl p-6 shadow-sm border border-red-100 text-center">
          <div class="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h1 class="text-xl font-bold text-slate-800 mb-2">เกิดข้อผิดพลาดในการเชื่อมต่อ</h1>
          <p class="text-sm text-slate-500 mb-4">ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้ กรุณาตรวจสอบการตั้งค่า</p>
          <div class="bg-slate-900 text-red-400 p-3 rounded-xl text-left text-xs font-mono overflow-x-auto">
            ${err.message}
          </div>
        </div>
      </body>
      </html>
    `;
    
    res.end(errorHtml);
  }
});

server.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
