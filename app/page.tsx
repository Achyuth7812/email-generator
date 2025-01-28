'use client'
import { useState } from 'react'

export default function EmailGenerator() {
  const [formData, setFormData] = useState({
    recipientName: '',
    emailPurpose: '',
    keyPoints: '',
  })
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate email')
      }

      const data = await response.json()
      setGeneratedEmail(data.email)
    } catch (err) {
      setError('Failed to generate email. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Professional Email Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                setFormData({ ...formData, recipientName: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all ${
                formData.recipientName ? 'text-black' : 'text-gray-400'
              }`}
              placeholder="Enter recipient name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-2">
              Email Purpose
            </label>
            <select
              value={formData.emailPurpose}
              onChange={(e) =>
                setFormData({ ...formData, emailPurpose: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-purple-800 font-medium"
              required
            >
              <option value="" className="text-gray-500">
                Select purpose
              </option>
              <option value="meeting-request" className="text-purple-700">
                Meeting Request
              </option>
              <option value="follow-up" className="text-purple-700">
                Follow Up
              </option>
              <option value="thank-you" className="text-purple-700">
                Thank You
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-700 mb-2">
              Key Points
            </label>
            <input
              type="text"
              value={formData.keyPoints}
              onChange={(e) =>
                setFormData({ ...formData, keyPoints: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all ${
                formData.keyPoints ? 'text-black' : 'text-gray-400'
              }`}
              placeholder="Enter key points (comma separated)"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Email'}
          </button>

          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}
        </form>

        {generatedEmail && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Generated Email:
            </h3>
            <div className="p-6 bg-white rounded-lg border border-gray-300 text-black whitespace-pre-wrap">
              {generatedEmail}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
