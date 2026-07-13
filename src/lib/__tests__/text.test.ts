import { stripHtml } from '../text'

/* 回歸:產業觀察列表摘要曾直接顯示 <h2>、<p> 等原始標籤 */
describe('stripHtml', () => {
  it('移除文章 HTML 標籤,只留純文字', () => {
    const html = '<h2>市場概況</h2><p>2026 年台灣中高階人才市場持續升溫。</p>'
    const out = stripHtml(html)
    expect(out).not.toContain('<')
    expect(out).not.toContain('>')
    expect(out).toContain('市場概況')
    expect(out).toContain('2026 年台灣中高階人才市場持續升溫。')
  })

  it('標籤之間補空白,不會把字黏在一起', () => {
    expect(stripHtml('<h2>標題</h2><p>內文</p>')).toBe('標題 內文')
  })

  it('處理 &nbsp; 與多餘空白', () => {
    expect(stripHtml('<p>a&nbsp;&nbsp;b</p>   <p>c</p>')).toBe('a b c')
  })

  it('巢狀標籤與屬性也能清乾淨', () => {
    expect(stripHtml('<ul><li><a href="https://x.com">連結</a></li></ul>')).toBe('連結')
  })

  it('純文字原樣通過', () => {
    expect(stripHtml('沒有標籤的文字')).toBe('沒有標籤的文字')
  })

  it('空字串回傳空字串', () => {
    expect(stripHtml('')).toBe('')
  })
})
