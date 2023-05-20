import NewProvider from '@/components/new_provider_form'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <NewProvider/>
    </main>
  )
}
