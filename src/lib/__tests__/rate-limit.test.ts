import { isRateLimited } from '../rate-limit'

describe('isRateLimited', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date('2026-01-01T00:00:00Z') })
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('未達上限時放行', () => {
    const key = `t1-${Math.random()}`
    expect(isRateLimited(key, 3, 60_000)).toBe(false)
    expect(isRateLimited(key, 3, 60_000)).toBe(false)
    expect(isRateLimited(key, 3, 60_000)).toBe(false)
  })

  it('達到上限後擋下', () => {
    const key = `t2-${Math.random()}`
    for (let i = 0; i < 3; i++) isRateLimited(key, 3, 60_000)
    expect(isRateLimited(key, 3, 60_000)).toBe(true)
  })

  it('時間視窗過後重新放行', () => {
    const key = `t3-${Math.random()}`
    for (let i = 0; i < 3; i++) isRateLimited(key, 3, 60_000)
    expect(isRateLimited(key, 3, 60_000)).toBe(true)

    jest.advanceTimersByTime(61_000)
    expect(isRateLimited(key, 3, 60_000)).toBe(false)
  })

  it('不同 key 各自計數', () => {
    const a = `t4a-${Math.random()}`
    const b = `t4b-${Math.random()}`
    for (let i = 0; i < 3; i++) isRateLimited(a, 3, 60_000)
    expect(isRateLimited(a, 3, 60_000)).toBe(true)
    expect(isRateLimited(b, 3, 60_000)).toBe(false)
  })
})
