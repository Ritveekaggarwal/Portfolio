import { useState } from 'react'
import { startRegistration } from '@simplewebauthn/browser'

import api from '../services/api'

function AdminSetupPage() {
  const [setupKey, setSetupKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const registerPasskey = async () => {
    try {
      setLoading(true)
      setMessage('Preparing passkey registration...')

      const optionsResponse = await api.get(
        '/auth/setup/options',
        {
          headers: {
            'x-setup-key': setupKey,
          },
        },
      )

      const registrationResponse =
        await startRegistration({
          optionsJSON: optionsResponse.data.data,
        })

      await api.post(
        '/auth/setup/verify',
        registrationResponse,
        {
          headers: {
            'x-setup-key': setupKey,
          },
        },
      )

      setMessage(
        'SuperAdmin passkey registered successfully.',
      )

      setSetupKey('')

    } catch (error) {
      console.error(
        'Passkey registration error:',
        error,
      )

      const message =
        error.response?.data?.message ||
        error.message ||
        'Passkey registration failed.'

      setMessage(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-2xl font-bold text-slate-900">
          SuperAdmin Setup
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This page is only for the initial registration
          of your SuperAdmin passkey.
        </p>

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Setup Key
          </label>

          <input
            type="password"
            value={setupKey}
            onChange={(event) =>
              setSetupKey(event.target.value)
            }
            placeholder="Enter setup key"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
          />

        </div>

        <button
          type="button"
          onClick={registerPasskey}
          disabled={loading || !setupKey.trim()}
          className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? 'Registering...'
            : 'Register Passkey'}
        </button>

        {message && (
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {message}
          </p>
        )}

      </div>
    </main>
  )
}

export default AdminSetupPage