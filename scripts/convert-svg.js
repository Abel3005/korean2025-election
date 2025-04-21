const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo.svg');
const outputPath = path.join(__dirname, '../public/logo.png');

// SVG 파일을 읽어서 PNG로 변환
sharp(svgPath)
  .png()
  .toFile(outputPath)
  .then(info => {
    console.log('SVG 파일이 성공적으로 PNG로 변환되었습니다:', info);
  })
  .catch(err => {
    console.error('변환 중 오류가 발생했습니다:', err);
  }); 