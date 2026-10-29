let characterSprite; // 載入角色的橫向精靈圖。
let characterX; // 記錄角色在畫布中的水平位置。
let characterY; // 記錄角色在畫布中的垂直位置。
let facingDirection = 1; // 以 1 表示朝右，以 -1 表示朝左。
const spriteFrameCount = 9; // 設定精靈圖中的動畫影格數量。
const spriteSheetWidth = 490; // 設定整張精靈圖的寬度。
const spriteSheetHeight = 68; // 設定整張精靈圖的高度。
const characterScale = 2; // 將角色放大兩倍以方便觀看。
const moveSpeed = 2.5; // 設定角色每幀移動的像素數。

function preload() { // 在畫面開始繪製前載入角色圖片。
  characterSprite = loadImage("1/打/打2.png"); // 載入指定的九格角色精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色的初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CORNER); // 使用圖片左上角作為繪圖座標。
  noSmooth(); // 關閉平滑縮放以保留精靈圖的像素清晰度。
  characterX = width / 2; // 將角色放在畫布水平中央。
  characterY = height / 2; // 將角色放在畫布垂直中央。
} // 結束畫布設定函式。

function draw() { // 每一幀更新角色並繪製畫面。
  background("#caf0f8"); // 使用指定的淺藍色清除畫面背景。

  if (keyIsDown(LEFT_ARROW)) { // 檢查使用者是否按住鍵盤左方向鍵。
    facingDirection = -1; // 將角色方向設定為朝左。
    characterX -= moveSpeed; // 讓角色持續向左移動。
  } else { // 沒有按住左方向鍵時執行向右移動。
    facingDirection = 1; // 將角色方向設定為朝右。
    characterX += moveSpeed; // 讓角色持續向右移動。
  } // 結束方向判斷。

  const frameIndex = floor(frameCount / 8) % spriteFrameCount; // 每八幀切換一次並循環播放九格動畫。
  const sourceFrameWidth = spriteSheetWidth / spriteFrameCount; // 計算精靈圖每一格的來源寬度。
  const displayFrameWidth = sourceFrameWidth * characterScale; // 計算放大後單格角色的顯示寬度。
  const displayFrameHeight = spriteSheetHeight * characterScale; // 計算放大後角色的顯示高度。
  const sourceX = frameIndex * sourceFrameWidth; // 計算目前動畫格在精靈圖中的水平位置。

  if (characterX - displayFrameWidth / 2 > width) { // 檢查角色是否已完全移出畫布右側。
    characterX = -displayFrameWidth / 2; // 讓角色從畫布左側接續出現。
  } // 結束右側邊界檢查。
  if (characterX + displayFrameWidth / 2 < 0) { // 檢查角色是否已完全移出畫布左側。
    characterX = width + displayFrameWidth / 2; // 讓角色從畫布右側接續出現。
  } // 結束左側邊界檢查。

  push(); // 暫存目前的繪圖狀態。
  translate(characterX, characterY); // 將座標原點移至角色中心。
  scale(facingDirection, 1); // 依行進方向翻轉角色精靈圖。
  image( // 繪製目前動畫格並依方向呈現角色。
    characterSprite, // 指定已載入的角色精靈圖。
    -displayFrameWidth / 2, // 設定角色繪圖位置的左側偏移。
    -displayFrameHeight / 2, // 設定角色繪圖位置的上方偏移。
    displayFrameWidth, // 設定角色在畫布上的顯示寬度。
    displayFrameHeight, // 設定角色在畫布上的顯示高度。
    sourceX, // 指定目前動畫格在來源圖片中的水平起點。
    0, // 指定來源圖片中的垂直起點。
    sourceFrameWidth, // 指定來源圖片中單格的寬度。
    spriteSheetHeight // 指定來源圖片中單格的高度。
  ); // 結束角色影格繪製。
  pop(); // 還原暫存的繪圖狀態。
} // 結束每幀繪製函式。

function windowResized() { // 瀏覽器視窗大小改變時更新畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布重新填滿瀏覽器視窗。
  characterY = height / 2; // 讓角色保持在畫布垂直中央。
} // 結束視窗尺寸更新函式。
