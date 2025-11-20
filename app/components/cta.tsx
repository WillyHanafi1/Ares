'use client';

import React from 'react';
import { Rocket, Calendar, FileSearch } from 'lucide-react';
import { Card, CardContent, Typography, Box, Container, Avatar, Button, Chip } from '@mui/material';

interface CTAOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  gradient: string;
  href: string;
}

const CTA: React.FC = () => {
  const ctaOptions: CTAOption[] = [
    {
      title: "Konsultasi Gratis",
      description: "Diskusikan kebutuhan AI Anda dengan expert kami selama 30 menit",
      icon: <Calendar className="w-8 h-8" />,
      buttonText: "Jadwalkan Konsultasi Gratis",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
      href: "#contact"
    },
    {
      title: "Audit Automasi Gratis",
      description: "Dapatkan analisis mendalam tentang peluang automasi di bisnis Anda",
      icon: <FileSearch className="w-8 h-8" />,
      buttonText: "Dapatkan Audit Gratis",
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      href: "#contact"
    },
    {
      title: "Mulai Proyek",
      description: "Sudah tahu apa yang Anda butuhkan? Mari langsung mulai!",
      icon: <Rocket className="w-8 h-8" />,
      buttonText: "Mulai Proyek Anda",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
      href: "#contact"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            gutterBottom
          >
            Siap Untuk Memulai?
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
            Pilih langkah pertama Anda menuju transformasi AI yang menguntungkan
          </Typography>
        </Box>

        {/* CTA Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {ctaOptions.map((option, index) => (
            <Card
              key={index}
              className="glass glass-hover h-full"
              sx={{
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
                <CardContent sx={{ p: 4 }}>
                  {/* Icon */}
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      margin: '0 auto 24px',
                      background: option.gradient,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(6deg)',
                      },
                    }}
                  >
                    {option.icon}
                  </Avatar>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#22d3ee',
                      },
                    }}
                  >
                    {option.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.7 }}
                  >
                    {option.description}
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    href={option.href}
                    sx={{
                      background: option.gradient,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {option.buttonText}
                  </Button>
                </CardContent>
              </Card>
          ))}
        </Box>

        {/* Guarantee Badge */}
        <Box textAlign="center">
          <Chip
            label="✨ 100% Gratis, Tanpa Komitmen - Konsultasi pertama tidak mengikat"
            className="glass"
            sx={{
              px: 4,
              py: 3,
              fontSize: '1rem',
              fontWeight: 500,
              color: '#22d3ee',
              height: 'auto',
              '& .MuiChip-label': {
                px: 2,
                py: 1,
              },
            }}
          />
        </Box>
      </Container>
    </section>
  );
};

export default CTA;
