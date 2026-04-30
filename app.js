const http = require('http');
const fs = require('fs');

// ============================================
// EÓLICA NARANCO S.L. - Sistema de monitorización
// ============================================

const PUERTO = process.env.PUERTO || 8080;
const NOMBRE_PARQUE = process.env.NOMBRE_PARQUE; // <-- variable de entorno sin valor por defecto

const aerogeneradores = [
  { id: 'AG-01', sector: 'Norte', estado: 'operativo' },
  { id: 'AG-02', sector: 'Norte', estado: 'operativo' },
  { id: 'AG-03', sector: 'Norte', estado: 'mantenimiento' },
  { id: 'AG-04', sector: 'Sur', estado: 'operativo' },
  { id: 'AG-05', sector: 'Sur', estado: 'operativo' },
  { id: 'AG-06', sector: 'Sur', estado: 'operativo' },
  { id: 'AG-07', sector: 'Este', estado: 'operativo' },
  { id: 'AG-08', sector: 'Este', estado: 'mantenimiento' },
  { id: 'AG-09', sector: 'Este', estado: 'operativo' },
  { id: 'AG-10', sector: 'Oeste', estado: 'operativo' },
  { id: 'AG-11', sector: 'Oeste', estado: 'operativo' },
  { id: 'AG-12', sector: 'Oeste', estado: 'operativo' },
];

function paginaPrincipal() {
  const operativos = aerogeneradores.filter(a => a.estado === 'operativo').length;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${NOMBRE_PARQUE} - Monitorización</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a1628 100%);
      color: #e0e0e0;
      min-height: 100vh;
    }
    header {
      background: rgba(255,255,255,0.05);
      padding: 20px 40px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    header h1 { color: #4fc3f7; font-weight: 300; letter-spacing: 2px; }
    .content { padding: 40px; max-width: 900px; margin: 0 auto; }
    .stats { display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; }
    .stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(79,195,247,0.2);
            border-radius: 12px; padding: 24px; text-align: center; flex: 1; min-width: 140px; }
    .stat .n { font-size: 2.5em; color: #4fc3f7; font-weight: 700; }
    .stat .l { font-size: 0.8em; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: rgba(79,195,247,0.1); color: #4fc3f7; padding: 12px; text-align: left;
         font-size: 0.8em; letter-spacing: 2px; text-transform: uppercase; }
    td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.9em; }
    .operativo { color: #4caf50; }
    .mantenimiento { color: #ffb74d; }
  </style>
</head>
<body>
  <header><h1>🌬️ ${NOMBRE_PARQUE} · Monitorización</h1></header>
  <div class="content">
    <div class="stats">
      <div class="stat"><span class="n">${aerogeneradores.length}</span><span class="l">Total</span></div>
      <div class="stat"><span class="n">${operativos}</span><span class="l">Operativos</span></div>
      <div class="stat"><span class="n">${aerogeneradores.length - operativos}</span><span class="l">Mantenimiento</span></div>
      <div class="stat"><span class="n">${process.uptime().toFixed(0)}s</span><span class="l">Uptime</span></div>
    </div>
    <table>
      <tr><th>ID</th><th>Sector</th><th>Estado</th></tr>
      ${aerogeneradores.map(a => `
      <tr>
        <td>${a.id}</td>
        <td>${a.sector}</td>
        <td class="${a.estado}">${a.estado}</td>
      </tr>`).join('')}
    </table>
  </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.url === '/' || req.url.startsWith('/?')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(paginaPrincipal());
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PUERTO, () => {
  console.log(`🌬️ ${NOMBRE_PARQUE} arrancado en puerto ${PUERTO}`);
});
