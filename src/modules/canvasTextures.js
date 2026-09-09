import * as THREE from 'three';

// Utility canvas generator for high-definition 360° equirectangular panoramas & 3D textures

export function create360PanoramaTexture(posId) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base background room colors (Military green wall band, stone ceiling, polished marble floor)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  skyGrad.addColorStop(0, '#1c261c');    // Ceiling dark
  skyGrad.addColorStop(0.35, '#ded7c6'); // Coffered lights
  skyGrad.addColorStop(0.5, '#2b3e2b');  // Military green wall band
  skyGrad.addColorStop(0.7, '#8f8878');  // Wall bottom stone
  skyGrad.addColorStop(0.72, '#d4cebe'); // Floor marble start
  skyGrad.addColorStop(1, '#a39c8c');    // Floor marble end
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Draw Coffered Ceiling Grid at top
  ctx.fillStyle = 'rgba(255, 245, 210, 0.4)';
  for (let x = 0; x < 2048; x += 128) {
    ctx.fillRect(x + 10, 80, 108, 140);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 64, 150, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 245, 210, 0.4)';
  }

  // Draw Marble Floor grid at bottom half
  ctx.strokeStyle = 'rgba(150, 140, 120, 0.4)';
  ctx.lineWidth = 2;
  for (let y = 730; y < 1024; y += 45) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }

  if (posId === 'pos-frontal' || posId === 'pos-entrada') {
    // Render Front Wall Center (Image 5 style): "NUESTRA HISTORIA - NUESTRO EJÉRCITO"
    const cx = 1024;
    const cy = 520;

    // Stone wall background section
    ctx.fillStyle = '#aba394';
    ctx.fillRect(cx - 700, cy - 220, 1400, 360);
    ctx.strokeStyle = '#857d6e';
    ctx.lineWidth = 3;
    ctx.strokeRect(cx - 700, cy - 220, 1400, 360);

    // 4 Widescreen Touch Monitors (Image 5)
    const screenWidth = 260;
    const screenHeight = 150;
    const screenX = [cx - 620, cx - 310, cx + 50, cx + 360];

    const screenTitles = [
      'Historia del Ejército',
      'Armas y Servicios',
      'Divisiones y Brigadas',
      'La Victoria de las FF.AA.'
    ];

    screenX.forEach((sx, idx) => {
      ctx.fillStyle = '#0f1f0f';
      ctx.fillRect(sx, cy - 180, screenWidth, screenHeight);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.strokeRect(sx, cy - 180, screenWidth, screenHeight);

      // Screen title text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(screenTitles[idx], sx + screenWidth / 2, cy - 100);

      ctx.fillStyle = '#00ff66';
      ctx.font = '12px sans-serif';
      ctx.fillText('• Táctil Interactivo', sx + screenWidth / 2, cy - 70);
    });

    // Central Gold Army Emblem
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy + 50, 75, 0, Math.PI * 2);
    ctx.fillStyle = '#1d2c1d';
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('EJÉRCITO DEL PERÚ', cx, cy + 20);
    ctx.font = '28px sans-serif';
    ctx.fillText('⚔️', cx, cy + 55);
    ctx.restore();

    // 3D Illuminated Gold Text
    ctx.font = '900 42px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffd700';
    ctx.fillText('NUESTRA HISTORIA', cx - 380, cy + 65);
    ctx.fillText('NUESTRO EJÉRCITO', cx + 380, cy + 65);
    ctx.shadowBlur = 0;
  }

  if (posId === 'pos-izquierda' || posId === 'pos-entrada') {
    // Left wall displays (Tablets & Cuadros)
    const lx = 300;
    const ly = 500;
    ctx.fillStyle = '#263626';
    ctx.fillRect(lx - 200, ly - 200, 400, 320);

    // Frame 1
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 8;
    ctx.strokeRect(lx - 160, ly - 160, 140, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Cuadro Ayacucho', lx - 90, ly + 40);

    // Tablet 1
    ctx.fillStyle = '#101d10';
    ctx.fillRect(lx + 20, ly - 140, 140, 100);
    ctx.strokeStyle = '#4a6b4a';
    ctx.lineWidth = 3;
    ctx.strokeRect(lx + 20, ly - 140, 140, 100);
    ctx.fillStyle = '#7ce67c';
    ctx.font = '12px sans-serif';
    ctx.fillText('📱 Tablet Ramón Castilla', lx + 90, ly - 80);
  }

  if (posId === 'pos-derecha' || posId === 'pos-entrada') {
    // Right wall displays
    const rx = 1748;
    const ry = 500;
    ctx.fillStyle = '#263626';
    ctx.fillRect(rx - 200, ry - 200, 400, 320);

    // Frame Right
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 8;
    ctx.strokeRect(rx - 160, ry - 160, 140, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Respuesta de Arica', rx - 90, ry + 40);

    // Tablet Right
    ctx.fillStyle = '#101d10';
    ctx.fillRect(rx + 20, ry - 140, 140, 100);
    ctx.strokeStyle = '#4a6b4a';
    ctx.lineWidth = 3;
    ctx.strokeRect(rx + 20, ry - 140, 140, 100);
    ctx.fillStyle = '#7ce67c';
    ctx.font = '12px sans-serif';
    ctx.fillText('📱 Tablet Cenepa', rx + 90, ry - 80);
  }

  if (posId === 'pos-centro' || posId === 'pos-entrada') {
    // Central Furniture Showcase (Mueble de Cartas y Libros)
    const fx = 1024;
    const fy = 780;

    // Table structure
    ctx.fillStyle = '#3d2314';
    ctx.fillRect(fx - 240, fy, 480, 120);

    // Glass Showcase Top
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(fx - 230, fy - 40, 460, 40);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(fx - 230, fy - 40, 460, 40);

    // Letters on top
    ctx.fillStyle = '#f4ebd0';
    ctx.fillRect(fx - 180, fy - 35, 80, 25);
    ctx.fillRect(fx - 40, fy - 35, 80, 25);
    ctx.fillRect(fx + 100, fy - 35, 80, 25);

    ctx.fillStyle = '#8b0000';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('✉️ Bolognesi', fx - 140, fy - 18);
    ctx.fillText('✉️ Cáceres', fx, fy - 18);
    ctx.fillText('✉️ San Martín', fx + 140, fy - 18);

    // Books on bottom shelf
    ctx.fillStyle = '#4a150e';
    ctx.fillRect(fx - 180, fy + 50, 70, 40);
    ctx.fillRect(fx - 30, fy + 50, 70, 40);
    ctx.fillRect(fx + 110, fy + 50, 70, 40);

    ctx.fillStyle = '#ffd700';
    ctx.font = '10px sans-serif';
    ctx.fillText('📚 Táctica 1879', fx - 145, fy + 75);
    ctx.fillText('📚 Diario 1880', fx + 5, fy + 75);
    ctx.fillText('📚 Honor 1864', fx + 145, fy + 75);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createMarbleFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ded9cd';
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = '#c4beb0';
  ctx.lineWidth = 4;
  for (let x = 0; x <= 1024; x += 256) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 256) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export function createCofferedCeilingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e3ded1';
  ctx.fillRect(0, 0, 1024, 1024);

  const cellSize = 128;
  for (let x = 0; x < 1024; x += cellSize) {
    for (let y = 0; y < 1024; y += cellSize) {
      ctx.fillStyle = '#cec8b9';
      ctx.fillRect(x, y, cellSize, cellSize);

      ctx.fillStyle = '#efeadc';
      ctx.fillRect(x + 12, y + 12, cellSize - 24, cellSize - 24);

      const grad = ctx.createRadialGradient(
        x + cellSize / 2, y + cellSize / 2, 4,
        x + cellSize / 2, y + cellSize / 2, cellSize / 3
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#fff4d6');
      grad.addColorStop(1, 'rgba(239, 234, 220, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x + 12, y + 12, cellSize - 24, cellSize - 24);

      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createFrontWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#b5ae9f';
  ctx.fillRect(0, 0, 2048, 1024);

  ctx.strokeStyle = '#999283';
  ctx.lineWidth = 3;
  for (let y = 0; y < 1024; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }

  const cx = 1024;
  const cy = 700;
  
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  const ringGrad = ctx.createLinearGradient(cx - 140, cy - 140, cx + 140, cy + 140);
  ringGrad.addColorStop(0, '#ffe57f');
  ringGrad.addColorStop(0.5, '#d4af37');
  ringGrad.addColorStop(1, '#8c6b12');
  ctx.fillStyle = ringGrad;
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#2b3e2b';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.fillStyle = '#1d2c1d';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#d4af37';
  ctx.stroke();

  ctx.font = 'bold 18px "Outfit", "Inter", sans-serif';
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';
  ctx.fillText('EJÉRCITO DEL PERÚ', cx, cy - 85);
  ctx.fillText('HASTA QUEMAR EL ÚLTIMO CARTUCHO', cx, cy + 95);

  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 40, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx - 45, cy + 35);
  ctx.lineTo(cx + 45, cy - 45);
  ctx.moveTo(cx + 45, cy + 35);
  ctx.lineTo(cx - 45, cy - 45);
  ctx.stroke();
  ctx.restore();

  ctx.font = '900 68px "Outfit", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  ctx.shadowBlur = 25;

  ctx.fillStyle = '#111111';
  ctx.fillText('NUESTRA HISTORIA', 520, 725);
  ctx.fillStyle = '#ffd700';
  ctx.fillText('NUESTRA HISTORIA', 520, 720);

  ctx.fillStyle = '#111111';
  ctx.fillText('NUESTRO EJÉRCITO', 1520, 725);
  ctx.fillStyle = '#ffd700';
  ctx.fillText('NUESTRO EJÉRCITO', 1520, 720);

  ctx.shadowBlur = 0;

  return new THREE.CanvasTexture(canvas);
}

export function createScreenTexture(title, subtitle, icon, isHighlighted = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 600);
  bgGrad.addColorStop(0, '#101d10');
  bgGrad.addColorStop(1, '#1b2d1b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 600);

  ctx.strokeStyle = isHighlighted ? '#ffd700' : '#4a6b4a';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 1012, 588);

  ctx.fillStyle = '#223822';
  ctx.fillRect(12, 12, 1000, 90);

  ctx.font = '50px sans-serif';
  ctx.fillText(icon, 50, 75);

  ctx.font = 'bold 36px "Outfit", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(title, 120, 68);

  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#7ce67c';
  ctx.fillText(subtitle, 120, 92);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(40, 130, 944, 420);

  const cardWidth = 280;
  const cardHeight = 180;
  let cardX = 60;
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = 'rgba(40, 70, 40, 0.6)';
    ctx.fillRect(cardX, 160, cardWidth, cardHeight);
    ctx.strokeStyle = '#3d613d';
    ctx.lineWidth = 2;
    ctx.strokeRect(cardX, 160, cardWidth, cardHeight);

    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cardX + 20, 180, 40, 6);

    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Módulo Interactivo 0${i + 1}`, cardX + 20, 220);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#b0d4b0';
    ctx.fillText('Presione la pantalla para', cardX + 20, 260);
    ctx.fillText('explorar más detalles.', cardX + 20, 285);

    cardX += 310;
  }

  ctx.fillStyle = '#d4af37';
  ctx.fillRect(60, 370, 904, 50);

  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#101d10';
  ctx.textAlign = 'center';
  ctx.fillText('👆 TOCAR AQUÍ PARA INTERACTUAR Y VER INFORMACIÓN COMPLETA', 512, 403);

  ctx.fillStyle = '#00ff66';
  ctx.beginPath();
  ctx.arc(970, 55, 10, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export function createPaintingTexture(title, eraText, mainColor = '#2b3e2b') {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = mainColor;
  ctx.fillRect(0, 0, 800, 600);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 24;
  ctx.strokeRect(12, 12, 776, 576);

  ctx.strokeStyle = '#8c6b12';
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, 752, 552);

  const grad = ctx.createRadialGradient(400, 300, 50, 400, 300, 380);
  grad.addColorStop(0, '#5a7a5a');
  grad.addColorStop(0.6, '#283828');
  grad.addColorStop(1, '#0e170e');
  ctx.fillStyle = grad;
  ctx.fillRect(36, 36, 728, 528);

  ctx.fillStyle = '#ffd700';
  ctx.font = '70px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚔️', 400, 240);

  ctx.font = 'bold 32px "Georgia", serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(title, 400, 330);

  ctx.font = 'italic 22px "Georgia", serif';
  ctx.fillStyle = '#e8d49e';
  ctx.fillText(eraText, 400, 375);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('Óleo sobre lienzo — Colección Histórica del Ejército', 400, 460);

  return new THREE.CanvasTexture(canvas);
}

export function createLetterTexture(title, snippet) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f4ebd0';
  ctx.fillRect(0, 0, 512, 700);

  ctx.strokeStyle = '#d1be90';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 688);

  ctx.font = 'bold 20px "Georgia", serif';
  ctx.fillStyle = '#4a371c';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 60);

  ctx.fillStyle = '#8b0000';
  ctx.beginPath();
  ctx.arc(256, 120, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd700';
  ctx.font = '16px sans-serif';
  ctx.fillText('PERÚ', 256, 125);

  ctx.strokeStyle = '#2b2112';
  ctx.lineWidth = 2;
  for (let y = 180; y < 620; y += 30) {
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.bezierCurveTo(150, y + 4, 350, y - 4, 460, y);
    ctx.stroke();
  }

  ctx.font = 'italic 16px "Georgia", serif';
  ctx.fillStyle = '#6b4f28';
  ctx.fillText(snippet.substring(0, 35) + '...', 256, 655);

  return new THREE.CanvasTexture(canvas);
}

export function createBookCoverTexture(title, year) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#3a1f18';
  ctx.fillRect(0, 0, 400, 600);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, 360, 560);
  ctx.strokeRect(30, 30, 340, 540);

  ctx.fillStyle = '#d4af37';
  ctx.font = '60px serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚜️', 200, 180);

  ctx.font = 'bold 24px "Georgia", serif';
  ctx.fillStyle = '#ffd700';
  ctx.fillText(title, 200, 280);

  ctx.font = 'bold 20px "Georgia", serif';
  ctx.fillText(`Edición de ${year}`, 200, 340);

  ctx.font = 'italic 16px serif';
  ctx.fillStyle = '#d4af37';
  ctx.fillText('Ejército del Perú — Biblioteca Histórica', 200, 500);

  return new THREE.CanvasTexture(canvas);
}
