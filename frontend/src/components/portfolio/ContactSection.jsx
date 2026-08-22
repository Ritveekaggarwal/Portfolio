import {
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

import api from '../../services/api'

function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] =
    useState(false)

  const [status, setStatus] =
    useState('')

  const [statusType, setStatusType] =
    useState('')

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setStatus('')
      setStatusType('')

      await api.post(
        '/contact',
        form,
      )

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      setStatus(
        'Message sent successfully.',
      )

      setStatusType('success')
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          'Unable to send message.',
      )

      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="mx-auto w-full"
      style={{
        marginTop:
          'var(--portfolio-section-gap)',

        maxWidth:
          'var(--portfolio-max-width)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius:
            'var(--portfolio-contact-radius)',

          border:
            '1px solid var(--portfolio-card-border)',

          background:
            'var(--portfolio-contact-bg)',

          boxShadow:
            'var(--portfolio-card-shadow)',
        }}
      >
        {/* ================================= */}
        {/* Decorative glow                   */}
        {/* ================================= */}

        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{
            background:
              'var(--portfolio-contact-glow-red)',
          }}
        />

        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full blur-3xl"
          style={{
            background:
              'var(--portfolio-contact-glow-blue)',
          }}
        />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'var(--portfolio-card-bg-solid)',
            opacity: 0.55,
          }}
        />

        {/* ================================= */}
        {/* Main */}
        {/* ================================= */}

        <div
          className="
            relative
            grid
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
          "
          style={{
            gap:
              'var(--portfolio-contact-grid-gap)',

            padding:
              'var(--portfolio-contact-padding)',
          }}
        >
          {/* ================================= */}
          {/* Left */}
          {/* ================================= */}

          <div>
            {/* <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-bold uppercase tracking-[0.18em] backdrop-blur-sm"
              style={{
                borderColor:
                  'var(--portfolio-red-soft)',

                background:
                  'var(--portfolio-card-bg-solid)',

                color:
                  'var(--portfolio-red)',

                fontSize:
                  'var(--portfolio-small-size)',
              }}
            >
              <Sparkles
                size={12}
                strokeWidth={1.8}
              />

              Get in touch
            </div> */}

            <h2
              className="mt-4 tracking-tight"
              style={{
                color:
                  'var(--portfolio-text)',

                fontSize:
                  'var(--portfolio-contact-title-size)',

                fontWeight: 800,
              }}
            >
              Let&apos;s talk.
            </h2>

            {/* <p
              className="mt-3 max-w-sm"
              style={{
                color:
                  'var(--portfolio-text-soft)',

                fontSize:
                  'var(--portfolio-contact-description-size)',

                lineHeight:
                  'var(--portfolio-line-height)',
              }}
            >
              Have an idea, project or
              opportunity? Send me a
              message and let&apos;s build
              something interesting.
            </p> */}

            {/* Poké Ball divider */}

            <div className="mt-6 flex items-center gap-3">

              <div
                className="h-px w-14"
                style={{
                  background:
                    'var(--portfolio-red)',
                }}
              />

              <div
                className="relative h-5 w-5 rounded-full border-2"
                style={{
                  borderColor:
                    'var(--portfolio-text-muted)',

                  background:
                    'var(--portfolio-card-bg-solid)',
                }}
              >
                <div
                  className="absolute inset-x-0 top-1/2 h-px"
                  style={{
                    background:
                      'var(--portfolio-text-muted)',
                  }}
                />

                <div
                  className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor:
                      'var(--portfolio-text-muted)',

                    background:
                      'var(--portfolio-card-bg-solid)',
                  }}
                />
              </div>

              <div
                className="h-px w-14"
                style={{
                  background:
                    'var(--portfolio-blue)',
                }}
              />

            </div>
          </div>

          {/* ================================= */}
          {/* Form */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md"
            style={{
              border:
                '1px solid var(--portfolio-card-border)',

              borderRadius:
                'var(--portfolio-contact-form-radius)',

              background:
                'var(--portfolio-contact-form-bg)',

              padding:
                'var(--portfolio-contact-form-padding)',

              boxShadow:
                'var(--portfolio-soft-shadow)',
            }}
          >
            <div className="grid gap-3">

              {/* Name / Email */}

              <div className="grid gap-3 sm:grid-cols-2">

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={{
                    background:
                      'var(--portfolio-contact-input-bg)',

                    borderColor:
                      'var(--portfolio-contact-input-border)',

                    color:
                      'var(--portfolio-text)',

                    borderRadius:
                      'var(--portfolio-contact-input-radius)',

                    fontSize:
                      'var(--portfolio-body-size)',
                  }}
                  className="w-full border px-4 py-3 outline-none transition placeholder:text-[var(--portfolio-contact-input-placeholder)] focus:border-[var(--portfolio-contact-focus)]"
                />

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  style={{
                    background:
                      'var(--portfolio-contact-input-bg)',

                    borderColor:
                      'var(--portfolio-contact-input-border)',

                    color:
                      'var(--portfolio-text)',

                    borderRadius:
                      'var(--portfolio-contact-input-radius)',

                    fontSize:
                      'var(--portfolio-body-size)',
                  }}
                  className="w-full border px-4 py-3 outline-none transition placeholder:text-[var(--portfolio-contact-input-placeholder)] focus:border-[var(--portfolio-contact-focus)]"
                />

              </div>

              {/* Subject */}

              <input
                required
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={{
                  background:
                    'var(--portfolio-contact-input-bg)',

                  borderColor:
                    'var(--portfolio-contact-input-border)',

                  color:
                    'var(--portfolio-text)',

                  borderRadius:
                    'var(--portfolio-contact-input-radius)',

                  fontSize:
                    'var(--portfolio-body-size)',
                }}
                className="w-full border px-4 py-3 outline-none transition placeholder:text-[var(--portfolio-contact-input-placeholder)] focus:border-[var(--portfolio-contact-focus)]"
              />

              {/* Message */}

              <textarea
                required
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a little about it..."
                style={{
                  background:
                    'var(--portfolio-contact-input-bg)',

                  borderColor:
                    'var(--portfolio-contact-input-border)',

                  color:
                    'var(--portfolio-text)',

                  borderRadius:
                    'var(--portfolio-contact-input-radius)',

                  fontSize:
                    'var(--portfolio-body-size)',

                  lineHeight:
                    'var(--portfolio-line-height)',
                }}
                className="w-full resize-none border px-4 py-3 outline-none transition placeholder:text-[var(--portfolio-contact-input-placeholder)] focus:border-[var(--portfolio-contact-focus)]"
              />

              {/* Bottom row */}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-h-5">
                  {status && (
                    <p
                      style={{
                        color:
                          statusType ===
                          'success'
                            ? 'var(--portfolio-contact-success)'
                            : 'var(--portfolio-contact-error)',

                        fontSize:
                          'var(--portfolio-small-size)',
                      }}
                    >
                      {status}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center gap-2 font-bold text-white transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background:
                      'var(--portfolio-contact-button-bg)',

                    boxShadow:
                      'var(--portfolio-contact-button-shadow)',

                    borderRadius:
                      'var(--portfolio-contact-input-radius)',

                    padding:
                      '12px 24px',

                    fontSize:
                      'var(--portfolio-body-size)',
                  }}
                >
                  {loading
                    ? 'Sending...'
                    : 'Send Message'}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ================================= */}
        {/* Bottom accent */}
        {/* ================================= */}

        <div
          style={{
            height:
              'var(--portfolio-contact-accent-height)',

            background:
              'linear-gradient(90deg, var(--portfolio-red) 0%, var(--portfolio-card-bg-solid) 50%, var(--portfolio-blue) 100%)',
          }}
        />
      </div>
    </section>
  )
}

export default ContactSection