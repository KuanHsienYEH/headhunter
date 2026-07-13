import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SafetyHotline from '../SafetyHotline'

describe('SafetyHotline(求職安全諮詢專線 popup)', () => {
  it('預設不顯示 popup 內容', () => {
    render(<SafetyHotline lang="zh" variant="footer" />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('點擊後開啟,顯示防詐宣導與各專線號碼', async () => {
    const user = userEvent.setup()
    render(<SafetyHotline lang="zh" variant="footer" />)

    await user.click(screen.getByRole('button', { name: '求職安全諮詢專線' }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('求職廣告請多加留意，避免落入求職陷阱')
    expect(dialog).toHaveTextContent('165 反詐騙諮詢專線')
    expect(dialog).toHaveTextContent('0800-085151')
    expect(dialog).toHaveTextContent('1999 轉 7038')
  })

  it('按「關閉」後 popup 消失', async () => {
    const user = userEvent.setup()
    render(<SafetyHotline lang="zh" variant="footer" />)

    await user.click(screen.getByRole('button', { name: '求職安全諮詢專線' }))
    // 「關閉」有兩顆(右上 × 與底部按鈕),點底部那顆
    const closeButtons = screen.getAllByRole('button', { name: '關閉' })
    await user.click(closeButtons[closeButtons.length - 1])

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('按 ESC 也能關閉', async () => {
    const user = userEvent.setup()
    render(<SafetyHotline lang="zh" variant="footer" />)

    await user.click(screen.getByRole('button', { name: '求職安全諮詢專線' }))
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
