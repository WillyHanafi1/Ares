'use client';

import React from 'react';
import { Cpu, Bot, BarChart } from 'lucide-react';
import { Card, CardContent, Typography, Box, Container } from '@mui/material';

// Interface untuk tipe data service item
interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Services: React.FC = () => {
  // Data untuk kartu layanan
  const services: ServiceItem[] = [
    {
      title: "Automasi Proses Bisnis (BPA)",
      description: "Kami mengotomatiskan tugas manual berulang seperti entri data, alur kerja, dan pelaporan, membebaskan waktu tim Anda.",
      icon: <Cpu className="w-12 h-12 text-cyan-400" />
    },
    {
      title: "Chatbot & Asisten Virtual Cerdas",
      description: "Membangun agen percakapan AI yang memberikan layanan pelanggan 24/7, memahami konteks, dan terintegrasi dengan sistem Anda.",
      icon: <Bot className="w-12 h-12 text-purple-400" />
    },
    {
      title: "Analisis & Prediksi Data",
      description: "Mengubah tumpukan data Anda menjadi insight yang dapat ditindaklanjuti. Kami membuat model prediktif untuk membantu Anda mengambil keputusan.",
      icon: <BarChart className="w-12 h-12 text-cyan-400" />
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            gutterBottom
          >
            Solusi AI untuk Setiap Kebutuhan
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
            Kami merancang dan mengimplementasikan solusi AI kustom yang mendorong efisiensi nyata bagi bisnis Anda.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass glass-hover h-full"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
                <CardContent sx={{ p: 4 }}>
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
                    {service.icon}
                  </Box>

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
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default Services;
