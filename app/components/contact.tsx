'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Building2, User, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      console.log('🚀 Starting form submission...');

      // Get reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window === 'undefined' || !window.grecaptcha) {
          reject(new Error('reCAPTCHA not loaded'));
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'contact' })
            .then(resolve)
            .catch(reject);
        });
      });

      console.log('✅ reCAPTCHA token received');

      // Submit form with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
        }),
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      console.log('✅ Form submitted successfully!');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      );
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Mari Bicara</span>
              <span className="block text-gray-300 mt-2">Tentang AI Anda</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Ceritakan tantangan bisnis Anda, dan kami akan tunjukkan bagaimana AI dapat menjadi solusinya.
              Tidak ada pertanyaan yang terlalu kecil atau terlalu besar.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                'Respon dalam 24 jam',
                'Konsultasi awal gratis',
                'Tanpa komitmen atau biaya tersembunyi',
                'Proposal solusi yang disesuaikan'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="glass p-2 rounded-lg group-hover:glow-cyan-sm transition-all duration-300">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  </div>
                  <p className="text-gray-300 pt-2">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="glass-strong rounded-2xl p-6 hover-lift">
              <h3 className="text-xl font-bold text-white mb-4 gradient-text">Informasi Kontak</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-3">
                  <div className="glass p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <a href="mailto:willy@seriaflow.com" className="hover:text-cyan-400 transition-colors">
                    willy@seriaflow.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <div className="glass p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-strong rounded-2xl p-8 hover-lift relative overflow-hidden">
            {/* Background gradient orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {status === 'error' && errorMessage && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              )}
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Terima Kasih!</h3>
                  <p className="text-gray-300">
                    Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 24 jam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full glass border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:glow-cyan-sm transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full glass border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:glow-cyan-sm transition-all duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Company Field */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-cyan-400 mb-2">
                      Perusahaan *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full glass border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:glow-cyan-sm transition-all duration-300"
                        placeholder="PT. Company Name"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-cyan-400 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full glass border border-gray-700/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:glow-cyan-sm transition-all duration-300 resize-none"
                      placeholder="Ceritakan tentang tantangan bisnis Anda dan bagaimana AI dapat membantu..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-6 py-5 rounded-xl hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Kirim Pesan
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-gray-500 text-center">
                    Dengan mengirim form ini, Anda menyetujui bahwa kami akan menghubungi Anda terkait layanan kami.
                    <br />
                    Dilindungi oleh reCAPTCHA dan{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">
                      Privacy Policy
                    </a>{' '}
                    dan{' '}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">
                      Terms of Service
                    </a>{' '}
                    Google.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
