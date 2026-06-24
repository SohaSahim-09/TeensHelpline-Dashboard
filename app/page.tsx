import { redirect } from 'next/navigation'

const DISABLE_AUTH_FOR_DEV = true

export default function HomePage() {
  if (DISABLE_AUTH_FOR_DEV) {
    redirect('/dashboard')
  }
  redirect('/login')
}
