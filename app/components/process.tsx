'use client';

import React from 'react';
import { Search, Lightbulb, Cog, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent, Typography, Box, Container, Avatar, Button } from '@mui/material';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Penemuan",
      subtitle: "Discovery",
      description: "Kami memahami masalah Anda secara mendalam, menganalisis proses bisnis, dan mengidentifikasi peluang automasi terbaik.",
      icon: <Search className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "02",
      title: "Strategi",
      subtitle: "Strategy",
      description: "Kami merancang solusi AI yang disesuaikan dengan kebutuhan spesifik bisnis Anda dan memetakan roadmap implementasi.",
      icon: <Lightbulb className="w-10 h-10 text-purple-400" />
    },
    {
      number: "03",
      title: "Implementasi",
      subtitle: "Implementation",
      description: "Kami membangun dan mengintegrasikan solusi AI ke dalam sistem Anda dengan minimal disruption pada operasional.",
      icon: <Cog className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "04",
      title: "Dukungan",
      subtitle: "Support",
      description: "Kami memastikan semuanya berjalan lancar dengan monitoring berkelanjutan, training, dan support teknis 24/7.",
      icon: <HeadphonesIcon className="w-10 h-10 text-purple-400" />
    }
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            gutterBottom
          >
            Proses Kami
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
            AI tidak harus rumit. Kami membuat prosesnya sederhana, jelas, dan bebas risiko untuk bisnis Anda.
          </Typography>
        </Box>

        {/* Process Steps */}
        <Box position="relative">
          {/* Steps Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 4,
            }}
          >
            {steps.map((step, index) => (
              <Card
                key={index}
                className="glass-dark glass-hover h-full"
                sx={{
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                  <CardContent sx={{ p: 4, pt: 6 }}>
                    {/* Number Badge */}
                    <Avatar
                      sx={{
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.5)',
                      }}
                    >
                      {step.number}
                    </Avatar>

                    {/* Icon */}
                    <Box
                      mb={3}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {step.icon}
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#22d3ee',
                        },
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#22d3ee',
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      {step.subtitle}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
        </Box>

        {/* Bottom CTA */}
        <Box mt={8} textAlign="center">
          <Typography variant="h6" color="text.secondary" mb={3}>
            Siap untuk memulai transformasi AI di bisnis Anda?
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="#contact"
            sx={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Jadwalkan Konsultasi Gratis
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export default Process;
