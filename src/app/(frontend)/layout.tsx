import FrontendLayout from '@/components/frontend/FrontendLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FrontendLayout lang="zh">{children}</FrontendLayout>
}
