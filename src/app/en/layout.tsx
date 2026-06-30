import type { Metadata } from 'next'
import FrontendLayout from '@/components/frontend/FrontendLayout'

export const metadata: Metadata = {
  title: { default: 'Executive Search Taiwan', template: '%s | Executive Search Taiwan' },
  description: 'Boutique executive search in Taiwan for over 15 years. US–Taiwan cross-border hiring specialists. Every search handled personally.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FrontendLayout lang="en">{children}</FrontendLayout>
}
