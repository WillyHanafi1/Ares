'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Building2, User, AlertCircle } from 'lucide-react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';

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

  const benefits = [
    'Respon dalam 24 jam',
    'Konsultasi awal gratis',
    'Tanpa komitmen atau biaya tersembunyi',
    'Proposal solusi yang disesuaikan'
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
            gap: 6,
          }}
        >
          {/* Left Column - Info */}
          <Box>
            <Typography
              variant="h2"
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              gutterBottom
            >
              Mari Bicara Tentang AI Anda
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4} sx={{ lineHeight: 1.7 }}>
              Ceritakan tantangan bisnis Anda, dan kami akan tunjukkan bagaimana AI dapat menjadi solusinya. 
              Tidak ada pertanyaan yang terlalu kecil atau terlalu besar.
            </Typography>

            {/* Benefits */}
            <List sx={{ mb: 4 }}>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  </ListItemIcon>
                  <ListItemText
                    primary={benefit}
                    primaryTypographyProps={{
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* Contact Info Card */}
            <Card className="glass">
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={700}>
                  Informasi Kontak
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <Typography
                    component="a"
                    href="mailto:hello@seriaflow.com"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: '#22d3ee' },
                    }}
                  >
                    hello@seriaflow.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <Typography color="text.secondary">Indonesia</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Form */}
          <Box>
            <Card className="glass-strong">
              <CardContent sx={{ p: 4 }}>
                {status === 'error' && errorMessage && (
                  <Alert
                    severity="error"
                    icon={<AlertCircle className="w-5 h-5" />}
                    sx={{ mb: 3 }}
                  >
                    {errorMessage}
                  </Alert>
                )}

                {status === 'success' ? (
                  <Box textAlign="center" py={6}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                        mb: 3,
                      }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </Box>
                    <Typography variant="h4" gutterBottom fontWeight={700}>
                      Terima Kasih!
                    </Typography>
                    <Typography color="text.secondary">
                      Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 24 jam.
                    </Typography>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {/* Name Field */}
                      <TextField
                        fullWidth
                        label="Nama Lengkap"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        InputProps={{
                          startAdornment: <User className="w-5 h-5 text-gray-500 mr-2" />,
                        }}
                      />

                      {/* Email Field */}
                      <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        InputProps={{
                          startAdornment: <Mail className="w-5 h-5 text-gray-500 mr-2" />,
                        }}
                      />

                      {/* Company Field */}
                      <TextField
                        fullWidth
                        label="Perusahaan"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="PT. Company Name"
                        InputProps={{
                          startAdornment: <Building2 className="w-5 h-5 text-gray-500 mr-2" />,
                        }}
                      />

                      {/* Message Field */}
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Pesan"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ceritakan tentang tantangan bisnis Anda dan bagaimana AI dapat membantu..."
                      />

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={status === 'sending'}
                        startIcon={
                          status === 'sending' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )
                        }
                        sx={{
                          background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 10px 30px rgba(6, 182, 212, 0.5)',
                          },
                          '&:disabled': {
                            transform: 'none',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
                      </Button>

                      {/* Privacy Note */}
                      <Typography variant="caption" color="text.secondary" textAlign="center">
                        Dengan mengirim form ini, Anda menyetujui bahwa kami akan menghubungi Anda terkait layanan kami.
                        <br />
                        Dilindungi oleh reCAPTCHA dan{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                          Privacy Policy
                        </a>{' '}
                        dan{' '}
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                          Terms of Service
                        </a>{' '}
                        Google.
                      </Typography>
                    </Box>
                  </form>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Contact;
