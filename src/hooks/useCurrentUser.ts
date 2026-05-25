import { useEffect, useState } from 'react'
import type { UserSession } from '../types/user'

declare global {
  interface Window {
    __CURRENT_USER__?: UserSession | null
  }
}

const readStoredSession = (): UserSession | null => {
  const rawSession = localStorage.getItem('currentUser')
  const rawName = localStorage.getItem('userName')

  if (rawSession) {
    try {
      return JSON.parse(rawSession) as UserSession
    } catch {
      return rawName ? { name: rawName } : null
    }
  }

  return rawName ? { name: rawName } : window.__CURRENT_USER__ ?? null
}

const fetchCurrentUser = async (): Promise<UserSession | null> => {
  // Replace this with the app's real auth/API source when it is available.
  return readStoredSession()
}

export function useCurrentUser() {
  const [user, setUser] = useState<UserSession | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchCurrentUser().then((session) => {
      if (isMounted) {
        setUser(session)
      }
    })

    const syncSession = () => {
      setUser(readStoredSession())
    }

    window.addEventListener('storage', syncSession)
    window.addEventListener('auth:user', syncSession)

    return () => {
      isMounted = false
      window.removeEventListener('storage', syncSession)
      window.removeEventListener('auth:user', syncSession)
    }
  }, [])

  return user
}
