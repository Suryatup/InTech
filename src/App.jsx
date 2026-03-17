import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fab,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Paper,
  Zoom,
  useScrollTrigger,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationOnIcon,
  DesktopWindows as DesktopWindowsIcon,
  LaptopMac as LaptopMacIcon,
  Print as PrintIcon,
  Router as RouterIcon,
  Videocam as VideocamIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  CheckCircle as CheckCircleIcon,
  Send as SendIcon
} from '@mui/icons-material';
import './App.css';

// Create a custom premium theme
const techTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Gold
      dark: '#B8860B',
      light: '#F9E5BC',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#0A0A0A', // Slate Black
      paper: '#141414',   // Slate Grey
    },
    text: {
      primary: '#FCFBF7',
      secondary: '#8E8E8E',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 }, // Preserved for Hero
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700, fontFamily: '"Outfit", sans-serif', letterSpacing: '0.02em' },
    overline: { fontFamily: '"Space Mono", monospace', letterSpacing: '0.25em', fontWeight: 700 }
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 28px',
          boxShadow: 'none',
          borderRadius: 2, 
          fontWeight: 700,
          letterSpacing: '0.01em',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #CFB53B 0%, #B8860B 100%)',
          color: '#000',
          '&:hover': {
            background: 'linear-gradient(135deg, #dcb534ff, #c48f09ff)',
            transform: 'translateY(-4px)',
            boxShadow: '0 25px 60px rgba(212, 175, 55, 0.4)',
          }
        },
        outlinedInherit: {
          borderColor: 'rgba(212, 175, 55, 0.3)',
          '&:hover': {
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            transform: 'translateY(-4px)',
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 20, 20, 0.4)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          borderRadius: 4, // More sharp luxury edges
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: '#D4AF37', 
            transform: 'translateY(-15px)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.15)',
          }
        }
      }
    }
  }
});

const CounterBadge = () => {
  const [count, setCount] = useState(0);
  const [hasActed, setHasActed] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasActed) {
          setHasActed(true);
          let start = 0;
          const end = 100;
          const duration = 2000;
          const incrementTime = 25;
          const step = end / (duration / incrementTime);
          
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, incrementTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasActed]);

  return (
    <Box ref={ref} className="trusted-badge float-animation" sx={{ 
      p: 8, 
      border: '6px solid rgba(212, 175, 55, 0.1)', 
      borderRadius: '50%', 
      display: 'inline-flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: 320, 
      height: 320, 
      boxShadow: '0 0 100px rgba(212, 175, 55, 0.15)', 
      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)' 
    }}>
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 900, color: 'primary.main', lineHeight: 1, fontFamily: '"Space Mono", monospace' }}>
        {count}<Box component="span" sx={{ fontSize: '3rem' }}>%</Box>
      </Typography>
      <Typography variant="h6" sx={{ letterSpacing: 8, mt: 2, color: 'text.secondary', fontWeight: 900, fontFamily: '"Space Mono", monospace' }}>
        VERIFIED
      </Typography>
    </Box>
  );
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const scrollerRef = React.useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => observer.observe(el));

    // Parallax scrolling for the horizontal hero cards & Scroll Progress
    const handleScroll = () => {
      if (scrollerRef.current) {
        requestAnimationFrame(() => {
          scrollerRef.current.scrollLeft = window.scrollY * 0.5 - 50;
        });
      }
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CONTACT_SRIDHAR = "8122636317";
  const CONTACT_SURYA = "6382318556";
  const WHATSAPP_MESSAGE = encodeURIComponent("Hello IN-TECH SOLUTIONS, I have an inquiry regarding your IT services.");
  const WHATSAPP_SRIDHAR = `https://wa.me/91${CONTACT_SRIDHAR}?text=${WHATSAPP_MESSAGE}`;
  const WHATSAPP_SURYA = `https://wa.me/91${CONTACT_SURYA}?text=${WHATSAPP_MESSAGE}`;

  const navLinks = [
    { title: "About us", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Why Choose Us", href: "#why" },
    { title: "Areas", href: "#areas" },
    { title: "Contact us", href: "#contact" },
  ];

  const services = [
    { title: "OS Installation & System Setup", icon: <DesktopWindowsIcon />, desc: "Expert OS setup for Windows, Linux, and specialized software.", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80" },
    { title: "Desktop / Laptop Service", icon: <LaptopMacIcon />, desc: "Hardware repair, component upgrades, and performance tuning.", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80" },
    { title: "Printer Installation & AMC", icon: <PrintIcon />, desc: "Professional setup and annual maintenance for all printers.", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80" },
    { title: "Network & WiFi Setup", icon: <RouterIcon />, desc: "Internal office networking and router configuration for business.", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80" },
    { title: "CCTV Installation & Service", icon: <VideocamIcon />, desc: "Secure surveillance with mobile access and maintenance.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80" },
    { title: "Data Backup & Recovery", icon: <SecurityIcon />, desc: "Reliable data protection and recovery for lost files.", image: "https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&w=600&q=80" },
    { title: "Website Design & Development", icon: <LanguageIcon />, desc: "Modern, responsive websites built with latest technologies.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" },
    { title: "Full Stack Projects", icon: <CodeIcon />, desc: "Complex application development with secure backends.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" },
    { title: "Final Year Projects", icon: <SchoolIcon />, desc: "Project support for BSc, BCA, BE, & Diploma students.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" },
  ];

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <ThemeProvider theme={techTheme}>
      <CssBaseline />
      <Box className="hero-gradient" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── Navbar ────────────────────────────────────────────────── */}
        <Box className="navbar-container">
          <Box className={`navbar-floating ${trigger ? 'scrolled' : ''}`}>
            {/* Scroll Progress Bar */}
            <Box sx={{ 
              position: 'absolute', bottom: 0, left: '10%', right: '10%', 
              height: '2px', bgcolor: 'rgba(212, 175, 55, 0.1)', overflow: 'hidden',
              borderRadius: '2px' 
            }}>
              <Box sx={{ width: `${scrollProgress}%`, height: '100%', bgcolor: 'primary.main', transition: 'width 0.4s cubic-bezier(0.1, 0, 0.3, 1)' }} />
            </Box>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2.5 }, textDecoration: 'none' }}>
              <Box sx={{ position: 'relative' }}>
                <img src="/brand-logo.png" alt="IN-TECH Logo" style={{ 
                  width: 'min(56px, 12vw)', 
                  height: 'auto',
                  filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))',borderRadius:'50%',marginTop:'10px',marginLeft:'10px'
                }} />
              </Box>
              <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400, letterSpacing: { xs: 2, md: 4 }, fontSize: { xs: '1rem', md: '1.2rem' }, fontFamily: '"Playfair Display", serif' }}>
                 IN<Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>-</Box>TECH
              </Typography>
            </Box>

            {/* Desktop Links */}
            <Stack direction="row" spacing={4} className="nav-links-desktop" sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link-item" style={{ fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{link.title}</a>
              ))}
            </Stack>

            {/* CTA & Mobile Menu */}
            <Stack direction="row" spacing={3} alignItems="center">
              <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                <PhoneIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 500, fontFamily: '"Space Mono", monospace', letterSpacing: 1 }}>+91 {CONTACT_SRIDHAR}</Typography>
              </Stack>
              <Button
                variant="contained"
                href="#contact"
                sx={{ 
                  display: { xs: 'none', lg: 'block' }, 
                  background: 'linear-gradient(135deg, #CFB53B, #B8860B)', 
                  color: '#000', 
                  fontWeight: 900,
                  px: 4,borderRadius: 6
                }}
              >
                Inquire Now
              </Button>
              <IconButton color="default" sx={{ color: '#FFF', display: { lg: 'none' } }} onClick={() => setIsMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* ── Mobile Menu (Drawer) ─────────────────────────────────── */}
        <Drawer anchor="right" open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <Box sx={{ width: 280, p: 3, pt: 8, bgcolor: 'background.default', height: '100%' }}>
            <List>
              {navLinks.map((link) => (
                <ListItem key={link.href} component="a" href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <ListItemText primary={link.title} sx={{ color: 'text.primary', typography: 'h6' }} />
                </ListItem>
              ))}
              <Divider sx={{ my: 2, opacity: 0.1 }} />
              <ListItem component="a" href={`tel:+91${CONTACT_SRIDHAR}`} sx={{ color: 'text.primary', textDecoration: 'none' }}>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText 
                  primary="Call Sridhar" 
                  secondary={CONTACT_SRIDHAR} 
                  slotProps={{ secondary: { sx: { color: 'primary.light', opacity: 0.8 } } }}
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* ── Hero Section ─────────────────────────────────────────── */}
        <Box id="home" sx={{
          position: 'relative',
          pt: { xs: 15, md: 20 },
          pb: { xs: 10, md: 0 },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 1
        }}>
          {/* Using Global Background from index.css */}

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 4, md: 8 }
            }}>
              {/* Left Text Content */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                maxWidth: { xs: '100%', lg: '650px' }
              }}>
                {/* Main Title */}
                <Box className="reveal-up">
                  <Typography variant="h1" className="hero-title" sx={{ color: '#FFF', fontSize: { xs: '2.4rem', md: '5.8rem' }, fontWeight: 700, lineHeight: 0.9, mb: 4, letterSpacing: '-0.03em' }}>
                    Elite IT <br />
                    <Box component="span" sx={{ 
                      background: 'linear-gradient(135deg, #D4AF37, #F9E5BC, #CFB53B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block', mt: 1 
                    }}>Architecture.</Box>
                  </Typography>
                </Box>

                {/* Subtext */}
                <Box className="reveal-up" sx={{ transitionDelay: '0.2s' }}>
                  <Typography variant="body1" className="hero-subtext" sx={{ mb: 5, fontSize: '1rem', maxWidth: 600, color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Montserrat", sans-serif' }}>
                    Consultation, planning, execution, and care — every step is transparent,
                    thoughtful, and made just for you. Home, office, or student, we've got you covered.
                  </Typography>
                  
                  {/* Button */}
                  <Box>
                    <Button
                      variant="contained"
                      size="large"
                      href="#contact"
                      sx={{ 
                        background: 'linear-gradient(135deg, #CFB53B, #B8860B)', 
                        color: '#000', 
                        px: { xs: 3, md: 8 }, 
                        py: { xs: 1.5, md: 2.5 }, 
                        fontSize: { xs: '0.9rem', md: '1.2rem' }, 
                        fontWeight: 900,
                        boxShadow: '0 30px 60px rgba(212, 175, 55, 0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        fontFamily: '"Montserrat", sans-serif'
                      }}
                    >
                      Inquire Premium Services
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Right Side GIF */}
              <Box className="reveal-up float-animation" sx={{ transitionDelay: '0.4s', display: { xs: 'none', lg: 'block' }, flex: '1', textAlign: 'right' }}>
                <img 
                  src="/hero-animation.gif" 
                  alt="IT Services Animation" 
                  style={{ width: '100%', maxWidth: '500px', borderRadius: '30px', opacity: 0.9 }} 
                />
              </Box>
            </Box>

            {/* Bottom Scroller (Service cards) */}
            <Box sx={{ mt: 30 }}>
              <Box ref={scrollerRef} className="service-cards-scroller reveal-up" sx={{ transitionDelay: '0.4s' }}>
                {services.slice(0, 5).map((s, idx) => (
                  <Box key={idx} className="hero-service-card">
                    <Box sx={{ mb: 'auto', p: 1.5, bgcolor: `${s.color}20`, borderRadius: 2, width: 'fit-content', color: s.color }}>
                      {s.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{s.title}</Typography>
                    <Typography variant="caption" color="text.secondary">Professional support for all your digital needs.</Typography>
                  </Box>
                ))}
                <Box className="hero-service-card" sx={{ background: 'linear-gradient(135deg, #1E3A8A, #111827)', border: '1px dashed var(--primary)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Explore All Services</Typography>
                  <Typography variant="caption" color="primary.light">9+ Professional Services →</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box id="about" sx={{ py: 20, position: 'relative' }}>
          {/* Using Global Background */}
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
              <Box className="reveal-up" sx={{ position: 'relative' }}>
                <Paper sx={{ 
                  p: 5, 
                  bgcolor: 'rgba(24, 24, 27, 0.3)', 
                  border: '1px solid rgba(255,255,255,0.06)', 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>IN-TECH SOLUTIONS</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                    IN-TECH SOLUTIONS provides complete IT sales and service support for homes, offices, and students.
                    We specialize in system installation, networking, CCTV installation, printer services, and website development.
                    Our goal is to deliver reliable, affordable, and professional IT solutions with quick service and dependable technical support.
                  </Typography>
                  <Stack spacing={2}>
                    {['Reliable & Affordable', 'Professional Solutions', 'Quick Service Support'].map(t => (
                      <Stack direction="row" spacing={2} key={t} alignItems="center">
                        <CheckCircleIcon color="secondary" sx={{ fontSize: '1.4rem' }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{t}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Box>

              <Box className="reveal-up" sx={{ transitionDelay: '0.2s' }}>
                <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 900, letterSpacing: 4 }}>DISTINCTION</Typography>
                <Typography variant="h2" sx={{ mt: 1, mb: 3, fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.1 }}>
                  Next-Level IT <br />
                  <Box component="span" sx={{ color: 'secondary.main' }}>Intelligence</Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 5, lineHeight: 1.8 }}>
                  Trusted by local businesses and residents across Puliampatti, Coimbatore, and Tiruppur to deliver reliable technology solutions.
                </Typography>
                <Button variant="outlined" color="primary" size="large" href={`tel:+91${CONTACT_SRIDHAR}`} sx={{ p: 2, px: 4, fontWeight: 800 }}>
                  Speak with an Expert
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Services Detail Grid ────────────────────────────────── */}
        <Box id="services" sx={{ py: 15 }}>
          <Container maxWidth="lg">
            <Box className="reveal-up" sx={{ textAlign: 'center', mb: 10 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Our Expertise</Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>Services We Provide</Typography>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={3}>
              {services.map((s, i) => (
                <Card key={i} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', transitionDelay: `${i * 0.1}s` }} className="reveal-up">
                  <CardMedia
                    component="img"
                    height="200"
                    image={s.image}
                    alt={s.title}
                    sx={{
                      transition: 'transform 0.4s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ color: s.color, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                      {s.icon}
                      <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.title}</Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, flex: 1 }}>{s.desc}</Typography>
                    {/* <Button variant="text" size="small" sx={{ p: 0, fontWeight: 800, color: s.color, justifyContent: 'flex-start' }}>Learn more →</Button> */}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Why Us ────────────────────────────────────────────────── */}
        <Box id="why" sx={{ py: 15, bgcolor: '#080C16' }}>
          <Container maxWidth="lg">
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
              <Box className="reveal-up">
                <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Why Choose Us</Typography>
                <Typography variant="h2" sx={{ mt: 1, mb: 6 }}>The IN-TECH Advantage</Typography>
                <Stack spacing={4}>
                  {[
                    { title: 'Experienced IT Technicians', desc: 'Skilled professionals with years of hands-on technical experience in solving complex problems.' },
                    { title: 'Affordable Pricing', desc: 'Premium IT support that fits your budget without ever compromising on service quality.' },
                    { title: 'Fast Service Support', desc: 'Most problems resolved within the same day. We understand how much you value your time.' },
                    { title: 'Reliable Solutions', desc: 'Long-term fixes and quality hardware components for lasting peace of mind.' }
                  ].map((item, i) => (
                    <Box key={i}>
                      <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, color: 'text.primary' }}>
                        <CheckCircleIcon color="secondary" />
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ pl: 4.5 }}>{item.desc}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box className="reveal-up" sx={{ textAlign: 'center' }}>
                <CounterBadge />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Service Areas ─────────────────────────────────────────── */}
        <Box id="areas" sx={{ py: 15 }}>
          <Container maxWidth="lg">
            <Box className="reveal-up" sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Coverage Matrix</Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>Service Areas</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>Providing on-site and remote support across these key locations</Typography>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={4}>
              {['Puliampatti', 'Coimbatore', 'Tiruppur'].map((area, idx) => (
                <Box key={area} className="reveal-up" sx={{ transitionDelay: `${idx * 0.15}s` }}>
                  <Paper sx={{ 
                    height: '100%', p: 5, textAlign: 'center', 
                    bgcolor: 'rgba(24, 24, 27, 0.3)', 
                    border: '1px solid rgba(255,255,255,0.06)', 
                    borderRadius: 2,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                    '&:hover': { borderColor: 'primary.main', transform: 'translateY(-10px)', background: 'rgba(24, 24, 27, 0.6)' } 
                  }}>
                    <LocationOnIcon sx={{ fontSize: '4rem', mb: 2, color: idx % 2 === 0 ? 'primary.main' : 'secondary.main' }} />
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>{area}</Typography>
                    <Typography variant="body2" color="text.muted" sx={{ mt: 1, letterSpacing: 1 }}>PREMIUM SERVICE ZONE</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Project Showcase ────────────────────────────────────────── */}
        <Box id="projects" sx={{ py: 15, bgcolor: '#050505' }}>
          <Container maxWidth="lg">
            <Box className="reveal-up" sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Our Portfolio</Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>Featured Projects</Typography>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              {[
                { title: 'Full-Stack E-commerce', type: 'WEB DEVELOPMENT', desc: 'Secure retail platform with gold-themed UI and local payment gateway.' },
                { title: 'College Management System', type: 'STUDENT PROJECT', desc: 'Java-based infrastructure for student records and fee management.' },
                { title: 'CCTV Network Deployment', type: 'INFRASTRUCTURE', desc: '16-camera cloud-monitored security setup for major textile mill.' },
                { title: 'Smart Attendance System', type: 'ML PROJECT', desc: 'Face-recognition based system utilizing Python and OpenCV.' }
              ].map((p, i) => (
                <Paper key={i} className="reveal-up" sx={{ 
                  p: 4, bgcolor: 'rgba(212, 175, 55, 0.03)', 
                  border: '1px solid rgba(212, 175, 55, 0.1)', 
                  borderRadius: 2,
                  transition: '0.4s',
                  '&:hover': { borderColor: 'primary.main', transform: 'scale(1.02)' }
                }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800 }}>{p.type}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 1 }}>{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.desc}</Typography>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <Box sx={{ py: 15, position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="lg">
            <Box className="reveal-up" sx={{ textAlign: 'center', mb: 10 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Wall of Trust</Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>What Clients Say</Typography>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {[
                { text: 'Prompt service and excellent technical knowledge. They setup our office network in a single day.' },
                { text: 'The support for my final year project was exceptional. Highly recommend for technical guidance.' },
                { text: 'Reliable and affordable laptop repair service. My 5-year-old system is running like new now.' }
              ].map((t, i) => (
                <Card key={i} className="reveal-up" sx={{ bgcolor: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2, color: 'primary.main' }}>
                      {[...Array(5)].map((_, i) => <CheckCircleIcon key={i} sx={{ fontSize: '1rem' }} />)}
                    </Stack>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, opacity: 0.8 }}>"{t.text}"</Typography>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 800 }}>{t.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main' }}>{t.role}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── FAQ Section ────────────────────────────────────────────── */}
        <Box id="faq" sx={{ py: 15, bgcolor: '#050505' }}>
          <Container maxWidth="md">
            <Box className="reveal-up" sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Inquiries</Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>Common Questions</Typography>
            </Box>

            <Box className="reveal-up">
              {[
                { q: "Do you provide on-site services?", a: "Yes, we provide on-site services in Puliampatti, Coimbatore, and Tiruppur for networking, CCTV, and system repairs." },
                { q: "What is your typical response time?", a: "We usually respond within 1-2 hours and aim for same-day resolution for most hardware and software issues." },
                { q: "Do you offer project guidance for college students?", a: "Absolutely! We support BSc, BCA, BE, and Diploma students with their final year projects, from coding to documentation." }
              ].map((faq, i) => (
                <Paper key={i} sx={{ mb: 2, bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mb: 1 }}>{faq.q}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{faq.a}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>
        <Box id="contact" sx={{ py: 15, pb: { xs: 25, md: 15 }, bgcolor: '#080C16' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }} className="reveal-up">
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>Contact Us</Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>Get In <Box component="span" color="primary.main">Touch</Box></Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem', maxWidth: 800, mx: 'auto' }}>
                Ready to solve your IT problems? Reach out to our team directly via phone or WhatsApp.
              </Typography>
            </Box>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={6}>
              <Box className="reveal-up">

                <Stack spacing={4}>
                  {[
                    { name: 'SRIDHAR S', phone: CONTACT_SRIDHAR, wa: WHATSAPP_SRIDHAR },
                    { name: 'SURYA A', phone: CONTACT_SURYA, wa: WHATSAPP_SURYA }
                  ].map(p => (
                    <Box key={p.name} sx={{ 
                      p: 4, 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: 2,
                      // marginTop: 12,
                      bgcolor: 'rgba(24, 24, 27, 0.4)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <Typography variant="subtitle2" color="primary.light" sx={{ mb: 2, fontWeight: 900, letterSpacing: 2 }}>{p.name}</Typography>
                      <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: '#FFF' }}>+91 {p.phone}</Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button variant="outlined" color="primary" component="a" href={`tel:+91${p.phone}`} sx={{ flex: 1, fontWeight: 800, borderRadius: 2 }}>Call Now</Button>
                        <Button variant="contained" color="primary" component="a" href={p.wa} target="_blank" rel="noopener noreferrer" startIcon={<WhatsAppIcon />} sx={{ flex: 1, fontWeight: 800, borderRadius: 2, color: '#000' }}>WhatsApp</Button>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box className="reveal-up" sx={{ transitionDelay: '0.2s' }}>
                <Paper sx={{ 
                  p: { xs: 3, sm: 4 }, 
                  bgcolor: 'rgba(24, 24, 27, 0.5)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: 2,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)'
                }}>
                  {!formSubmitted ? (
                    <Box component="form" onSubmit={(e) => {
                      e.preventDefault();
                      const data = new FormData(e.target);
                      const name = data.get('name');
                      const phone = data.get('phone');
                      const area = data.get('area');
                      const message = data.get('message') || 'No additional message provided.';
                      
                      const subject = encodeURIComponent(`New Service Request from ${name}`);
                      const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nService Area: ${area}\n\nMessage:\n${message}`);
                      
                      window.location.href = `mailto:intechsolutions.support@gmail.com?subject=${subject}&body=${body}`;
                      setFormSubmitted(true);
                    }}>
                      <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Service Request</Typography>

                      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={3}>
                        <TextField name="name" fullWidth label="Your Name" variant="outlined" required />
                        <TextField name="phone" fullWidth label="Phone Number" variant="outlined" required />
                        <TextField
                          name="area"
                          fullWidth
                          label="Service Area"
                          variant="outlined"
                          required
                          placeholder="e.g. Coimbatore"
                          sx={{ gridColumn: '1 / -1' }}
                        />
                        <TextField
                          name="message"
                          fullWidth
                          multiline
                          rows={4}
                          label="How can we help you?"
                          variant="outlined"
                          sx={{ gridColumn: '1 / -1' }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          color="primary"
                          endIcon={<SendIcon />}
                          sx={{ py: 2.5, fontWeight: 800, fontSize: '1.1rem', gridColumn: '1 / -1', borderRadius: 2 }}
                        >
                          Send Service Request
                        </Button>
                      </Box>

                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                      <CheckCircleIcon sx={{ fontSize: '6rem', color: '#10B981', mb: 3, filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.4))' }} />
                      <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: '#FFF' }}>Success Connection.</Typography>
                      <Typography variant="h6" sx={{ color: 'text.secondary', opacity: 0.8, fontFamily: '"Space Mono", monospace' }}>TECHNICAL DISPATCH IN PROGRESS</Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <Box component="footer" sx={{ 
          pt: 15, pb: 8, 
          borderTop: '1px solid rgba(212, 175, 55, 0.15)', 
          bgcolor: '#050505',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Pattern */}
          <Box sx={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundImage: 'url("/bg-luxury-pattern.png")', 
            opacity: 0.03, pointerEvents: 'none' 
          }} />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1.2fr' }} gap={8} mb={12}>
              
              {/* Column 1: Brand & About */}
              <Box className="reveal-up">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2, mb: 4 }}>
                  <img src="/brand-logo.png" alt="IN-TECH Logo" style={{ width: '48px', height: 'auto' }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF', fontFamily: '"Playfair Display", serif', letterSpacing: 3 }}>
                    IN<Box component="span" sx={{ color: 'primary.main' }}>-</Box>TECH
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, mb: 4, maxWidth: { xs: '100%', md: 300 }, textAlign: { xs: 'center', md: 'left' } }}>
                  Excellence in technological solutions. We provide high-end IT infrastructure and support services for residential and corporate sectors.
                </Typography>
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <IconButton size="small" sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: '#000' } }}>
                    <WhatsAppIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: '#000' } }}>
                    <LanguageIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>

              {/* Column 2: Our Services */}
              <Box className="reveal-up" sx={{ transitionDelay: '0.1s' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 800, mb: 4, letterSpacing: 2, fontSize: '0.9rem', textAlign: { xs: 'center', md: 'left' } }}>OUR SERVICES</Typography>
                <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  {services.slice(0, 5).map(s => (
                    <Typography key={s.title} variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer', '&:hover': { color: 'primary.main' }, transition: '0.3s', textAlign: { xs: 'center', md: 'left' } }}>
                      {s.title}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              {/* Column 3: Quick Links */}
              <Box className="reveal-up" sx={{ transitionDelay: '0.2s' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 800, mb: 4, letterSpacing: 2, fontSize: '0.9rem', textAlign: { xs: 'center', md: 'left' } }}>QUICK LINKS</Typography>
                <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  {navLinks.map(link => (
                    <Box key={link.title} component="a" href={link.href} sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: 'primary.main' }, transition: '0.3s', display: 'block', textAlign: { xs: 'center', md: 'left' } }}>
                      {link.title}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Column 4: Office Info */}
              <Box className="reveal-up" sx={{ transitionDelay: '0.3s' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 800, mb: 4, letterSpacing: 2, fontSize: '0.9rem', textAlign: { xs: 'center', md: 'left' } }}>OFFICE</Typography>
                <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                    <LocationOnIcon sx={{ color: 'primary.main', fontSize: '1.2rem', mt: 0.5 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Puliampatti, Coimbatore<br />
                      Tamil Nadu, India.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                    <PhoneIcon sx={{ color: 'primary.main', fontSize: '1.2rem', mt: 0.5 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      +91 {CONTACT_SRIDHAR}<br />
                      +91 {CONTACT_SURYA}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)', mb: 5 }} />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
                © 2026 IN-TECH SOLUTIONS. ALL RIGHTS RESERVED.
              </Typography>
              <Stack direction="row" spacing={{ xs: 2, sm: 4 }} justifyContent="center">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(text => (
                  <Typography key={text} variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    {text}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* ── Floating Elements ────────────────────────────────────── */}
        <Zoom in={true}>
          <Fab
            color="primary"
            href={WHATSAPP_SRIDHAR}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: 'fixed', bottom: 30, right: 30, zIndex: 1200,
              background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
              color: '#000',
              boxShadow: '0 20px 50px rgba(212, 175, 55, 0.4)',
              '&:hover': { transform: 'scale(1.1) rotate(15deg)' }
            }}
          >
            <WhatsAppIcon />
          </Fab>
        </Zoom>

        {trigger && (
          <Zoom in={trigger}>
            <Fab
              size="small"
              color="primary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ position: 'fixed', bottom: 100, right: 35, zIndex: 1200, boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)' }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Zoom>
        )}

      </Box>
    </ThemeProvider>
  );
}

export default App;
