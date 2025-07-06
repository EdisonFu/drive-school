// 占位图片的 SVG 数据
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#cccccc"/>
  <text x="400" y="300" font-family="Arial" font-size="48" font-weight="bold" text-anchor="middle" fill="#333333">金寨驾校</text>
</svg>
`;

// 将 SVG 转换为 Base64 数据 URL
const svgBase64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;

// 导出 SVG Base64 数据 URL
export default svgBase64;
