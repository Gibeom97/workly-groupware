const fs = require("fs");
const path = require("path");

// 폰트가 들어있는 폴더 경로
const fontDir = path.join(__dirname, "public", "fonts", "Noto_Sans_KR", "static");

// `fontBase64.json` 파일 저장 경로
const outputJsonPath = path.join(__dirname, "src", "fonts", "fontBase64.json");

// 폰트 파일이 들어갈 객체
let fonts = {};

// 폴더에서 모든 `.ttf` 파일을 가져와서 변환
fs.readdir(fontDir, (err, files) => {
  if (err) {
    console.error("📌 폰트 디렉토리를 읽는 데 실패했습니다.", err);
    return;
  }

  const ttfFiles = files.filter(file => file.endsWith(".ttf"));

  if (ttfFiles.length === 0) {
    console.error("❌ 변환할 .ttf 폰트 파일이 없습니다.");
    return;
  }

  let pending = ttfFiles.length;

  ttfFiles.forEach(file => {
    const filePath = path.join(fontDir, file);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`📌 폰트 파일 ${file} 읽기 실패:`, err);
        return;
      }

      // Base64로 변환하여 저장
      fonts[file] = data.toString("base64");

      pending--;

      if (pending === 0) {
        fs.writeFileSync(outputJsonPath, JSON.stringify(fonts, null, 2));
        console.log("✅ 모든 폰트 변환 완료! 'fontBase64.json'이 생성되었습니다.");
      }
    });
  });
});
