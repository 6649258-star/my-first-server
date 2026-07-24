const http = require('http');

const port = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  res.end(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ข้อมูลนักศึกษา</title>

      <style>
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',Tahoma,sans-serif;
        }

        body{
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          background:linear-gradient(135deg,#4facfe,#00f2fe);
        }

        .card{
          background:#fff;
          padding:40px;
          border-radius:20px;
          box-shadow:0 10px 30px rgba(0,0,0,.2);
          text-align:center;
          max-width:500px;
          width:90%;
          animation:fadeIn .8s ease;
        }

        .avatar{
          width:100px;
          height:100px;
          border-radius:50%;
          background:#4facfe;
          color:#fff;
          font-size:40px;
          display:flex;
          justify-content:center;
          align-items:center;
          margin:0 auto 20px;
        }

        h1{
          color:#333;
          margin-bottom:10px;
          font-size:28px;
        }

        h2{
          color:#555;
          margin-bottom:20px;
          font-size:22px;
        }

        p{
          color:#666;
          font-size:18px;
          margin:8px 0;
        }

        .footer{
          margin-top:25px;
          color:#888;
          font-size:14px;
        }

        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }
      </style>
    </head>

    <body>
      <div class="card">
        <div class="avatar">🎓</div>

        <h1>ข้อมูลนักศึกษา</h1>

        <h2>นางสาวภัควลัญช์ มูลเบ้า</h2>

        <p><strong>รหัสนักศึกษา</strong></p>
        <p>69319010185</p>

        <div class="footer">
          Node.js HTTP Server บน Render
        </div>
      </div>
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

