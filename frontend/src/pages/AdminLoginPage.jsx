import { useState } from 'react'
import { startAuthentication } from '@simplewebauthn/browser'

import api from '../services/api'

function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const login = async () => {
    try {
      setLoading(true)
      setMessage('Preparing passkey login...')

      const optionsResponse = await api.get(
        '/auth/login/options',
      )

      const authenticationResponse =
        await startAuthentication({
          optionsJSON: optionsResponse.data.data,
        })

      await api.post(
        '/auth/login/verify',
        authenticationResponse,
      )

      setMessage('Login successful.')

      window.location.href = '/admin'
    } catch (error) {
      console.error('Passkey login error:', error)

      const message =
        error.response?.data?.message ||
        error.message ||
        'Passkey login failed.'

      setMessage(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-slate-900">
          Admin
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in with your registered passkey.
        </p>

        <button
          type="button"
          onClick={login}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? 'Authenticating...'
            : 'Sign in with Passkey'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-slate-600">
            {message}
          </p>
        )}

      </div>
    </main>
  )
}

export default AdminLoginPage