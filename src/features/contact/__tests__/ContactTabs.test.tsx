import { render, screen } from '@testing-library/react'
import ContactTabs from '../ContactTabs'

jest.mock('../InquiryForm', () => function MockInquiryForm() {
  return <div>company form</div>
})

jest.mock('../ResumeForm', () => function MockResumeForm() {
  return <div>resume form</div>
})

describe('ContactTabs', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/contact')
  })

  it('預設顯示企業委託獵才表單', () => {
    render(<ContactTabs lang="zh" />)
    expect(screen.getByText('company form')).toBeInTheDocument()
  })

  it('網址為 #resume 時顯示求職者登記履歷表單', async () => {
    window.history.replaceState(null, '', '/contact#resume')
    render(<ContactTabs lang="zh" />)
    expect(await screen.findByText('resume form')).toBeInTheDocument()
  })
})
