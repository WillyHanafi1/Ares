'use client';

import Services from "./components/services";
import Process from "./components/process";
import CTA from "./components/cta";
import Contact from "./components/contact";
import { Button, Container, Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />
        
        <Container maxWidth="lg">
          <Box
            textAlign="center"
            position="relative"
            zIndex={1}
            className="glass-strong"
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              gutterBottom
            >
              Seriaflow
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              mb={4}
              sx={{ fontSize: { xs: '1.25rem', md: '1.875rem' } }}
            >
              AI Automation Agency untuk Bisnis Modern
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="#contact"
              sx={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                px: 4,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 40px rgba(6, 182, 212, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Jadwalkan Konsultasi Gratis
            </Button>
          </Box>
        </Container>
      </section>

      {/* Services Section */}
      <Services />

      {/* Process Section */}
      <Process />

      {/* CTA Section */}
      <CTA />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-black">
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            &copy; 2025 Seriaflow. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </main>
  );
}
