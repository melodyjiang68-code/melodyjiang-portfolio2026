# Melody Jiang — 作品集網站 MVP

## 本地預覽

在專案資料夾執行：

```bash
cd "/Users/melodyjiang/Documents/求職/2026 作品集"
python3 -m http.server 8080
```

瀏覽器開啟：http://localhost:8080

> Instagram 嵌入預覽需要網路連線。若 iframe 無法顯示，點擊卡片仍會開啟貼文。  
> 請用 `python3 -m http.server 8080` 預覽（不要直接雙擊開啟 html 檔）。

## 檔案結構

- `index.html` — 主頁
- `css/style.css` — 樣式
- `js/main.js` — 滾動動畫、導覽列、章節標題
- `assets/` — Section 3 課程與直播封面圖

## 待補

- **Resume**：提供 PDF 或連結後，更新 `index.html` 中 `data-resume` 的 `href`，並移除 `is-disabled` class。
