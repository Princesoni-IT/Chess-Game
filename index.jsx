<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Master | Play & Learn Chess Online</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        /* ============================================
           CSS RESET & BASE STYLES
           ============================================ */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-amber: #f59e0b;
            --primary-amber-dark: #d97706;
            --primary-amber-light: #fcd34d;
            --bg-dark: #0f172a;
            --bg-dark-secondary: #1e293b;
            --bg-card: rgba(30, 41, 59, 0.7);
            --text-white: #ffffff;
            --text-gray: #94a3b8;
            --text-gray-light: #cbd5e1;
            --border-gray: #334155;
            --gradient-amber: linear-gradient(135deg, #f59e0b, #d97706);
            --shadow-amber: 0 10px 40px rgba(245, 158, 11, 0.3);
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-secondary) 50%, var(--bg-dark) 100%);
            color: var(--text-white);
            min-height: 100vh;
            overflow-x: hidden;
            line-height: 1.6;
        }

        /* ============================================
           ANIMATED BACKGROUND
           ============================================ */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }

        .floating-piece {
            position: absolute;
            font-size: 4rem;
            opacity: 0.05;
            animation: float 20s infinite ease-in-out;
        }

        .floating-piece:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .floating-piece:nth-child(2) { top: 20%; right: 10%; animation-delay: 3s; }
        .floating-piece:nth-child(3) { top: 60%; left: 15%; animation-delay: 6s; }
        .floating-piece:nth-child(4) { top: 80%; right: 20%; animation-delay: 9s; }
        .floating-piece:nth-child(5) { top: 40%; left: 80%; animation-delay: 12s; }
        .floating-piece:nth-child(6) { top: 70%; left: 50%; animation-delay: 15s; }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-30px) rotate(5deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(30px) rotate(-5deg); }
        }

        .glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.3;
            animation: pulse-glow 8s infinite ease-in-out;
        }

        .glow-orb.amber {
            background: var(--primary-amber);
            width: 400px;
            height: 400px;
            top: 10%;
            right: 10%;
        }

        .glow-orb.blue {
            background: #3b82f6;
            width: 300px;
            height: 300px;
            bottom: 20%;
            left: 5%;
            animation-delay: 4s;
        }

        @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.2); opacity: 0.4; }
        }

        /* ============================================
           CONTAINER & LAYOUT
           ============================================ */
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
            position: relative;
            z-index: 1;
        }

        /* ============================================
           HEADER & NAVIGATION
           ============================================ */
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            padding: 1rem 0;
            backdrop-filter: blur(20px);
            background: rgba(15, 23, 42, 0.8);
            border-bottom: 1px solid rgba(51, 65, 85, 0.5);
            transition: all 0.3s ease;
        }

        header.scrolled {
            padding: 0.5rem 0;
            background: rgba(15, 23, 42, 0.95);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
        }

        .logo-icon {
            width: 45px;
            height: 45px;
            background: var(--gradient-amber);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: var(--shadow-amber);
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary-amber-light), var(--primary-amber));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        nav {
            display: flex;
            gap: 2.5rem;
        }

        nav a {
            color: var(--text-gray-light);
            text-decoration: none;
            font-weight: 500;
            position: relative;
            padding: 0.5rem 0;
            transition: color 0.3s ease;
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-amber);
            transition: width 0.3s ease;
        }

        nav a:hover {
            color: var(--primary-amber);
        }

        nav a:hover::after {
            width: 100%;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.75rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
        }

        .btn-primary {
            background: var(--gradient-amber);
            color: var(--text-white);
            box-shadow: var(--shadow-amber);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 50px rgba(245, 158, 11, 0.4);
        }

        .btn-secondary {
            background: transparent;
            color: var(--text-white);
            border: 2px solid var(--border-gray);
        }

        .btn-secondary:hover {
            border-color: var(--primary-amber);
            color: var(--primary-amber);
        }

        .btn-large {
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--text-white);
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* ============================================
           HERO SECTION
           ============================================ */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 8rem 0 4rem;
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .hero-text {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0.3s;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            color: var(--primary-amber);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
        }

        .hero-badge::before {
            content: '♔';
            font-size: 1rem;
        }

        .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
        }

        .hero-title span {
            background: linear-gradient(135deg, var(--primary-amber-light), var(--primary-amber), var(--primary-amber-dark));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-description {
            font-size: 1.25rem;
            color: var(--text-gray);
            margin-bottom: 2.5rem;
            max-width: 500px;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .hero-stats {
            display: flex;
            gap: 3rem;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-gray);
        }

        .stat {
            text-align: left;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-amber);
        }

        .stat-label {
            font-size: 0.875rem;
            color: var(--text-gray);
        }

        .hero-visual {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0.6s;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ============================================
           CHESS BOARD
           ============================================ */
        .board-wrapper {
            position: relative;
            padding: 1.5rem;
        }

        .board-glow {
            position: absolute;
            inset: -20px;
            background: var(--gradient-amber);
            opacity: 0.15;
            filter: blur(60px);
            border-radius: 30px;
        }

        .board-container {
            position: relative;
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 1.5rem;
            border: 1px solid var(--border-gray);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .chess-board {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .square {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }

        .square.light {
            background: linear-gradient(135deg, #f3d9b1, #e8c89e);
        }

        .square.dark {
            background: linear-gradient(135deg, #b58863, #8b6f47);
        }

        .square:hover {
            filter: brightness(1.2);
        }

        .square.selected {
            box-shadow: inset 0 0 0 4px var(--primary-amber);
        }

        .piece {
            transition: transform 0.2s ease;
            user-select: none;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .piece.white {
            color: #fff;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .piece.black {
            color: #1a1a1a;
        }

        .square:hover .piece {
            transform: scale(1.1);
        }

        .floating-badge {
            position: absolute;
            background: var(--gradient-amber);
            color: white;
            padding: 0.75rem 1.25rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.875rem;
            box-shadow: var(--shadow-amber);
            animation: bounce 2s infinite ease-in-out;
        }

        .floating-badge.top-right {
            top: -20px;
            right: -20px;
        }

        .floating-badge.bottom-left {
            bottom: -15px;
            left: -15px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* ============================================
           FEATURES SECTION
           ============================================ */
        .features {
            padding: 6rem 0;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-tag {
            display: inline-block;
            background: rgba(245, 158, 11, 0.1);
            color: var(--primary-amber);
            padding: 0.5rem 1.25rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-title {
            font-size: 2.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .section-description {
            font-size: 1.125rem;
            color: var(--text-gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .feature-card {
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 2.5rem;
            border: 1px solid var(--border-gray);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-amber);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            border-color: rgba(245, 158, 11, 0.3);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-icon {
            width: 70px;
            height: 70px;
            background: rgba(245, 158, 11, 0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
            background: var(--gradient-amber);
            transform: scale(1.1);
        }

        .feature-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .feature-description {
            color: var(--text-gray);
            line-height: 1.7;
        }

        /* ============================================
           STATS SECTION
           ============================================ */
        .stats-section {
            padding: 4rem 0;
        }

        .stats-container {
            background: var(--gradient-amber);
            border-radius: 30px;
            padding: 4rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            box-shadow: var(--shadow-amber);
            position: relative;
            overflow: hidden;
        }

        .stats-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .stat-item {
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .stat-number {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .stat-text {
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.9;
        }

        /* ============================================
           TESTIMONIALS SECTION
           ============================================ */
        .testimonials {
            padding: 6rem 0;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .testimonial-card {
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 2rem;
            border: 1px solid var(--border-gray);
            transition: all 0.3s ease;
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
            border-color: rgba(245, 158, 11, 0.3);
        }

        .testimonial-rating {
            color: var(--primary-amber);
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            color: var(--text-gray-light);
            margin-bottom: 1.5rem;
            font-style: italic;
            line-height: 1.8;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            background: var(--gradient-amber);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            font-weight: 600;
        }

        .author-info h4 {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .author-info p {
            font-size: 0.875rem;
            color: var(--text-gray);
        }

        /* ============================================
           CTA SECTION
           ============================================ */
        .cta {
            padding: 6rem 0;
        }

        .cta-container {
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            padding: 5rem;
            text-align: center;
            border: 1px solid var(--border-gray);
            position: relative;
            overflow: hidden;
        }

        .cta-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            background: var(--gradient-amber);
            opacity: 0.05;
            filter: blur(100px);
            border-radius: 50%;
        }

        .cta-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            position: relative;
        }

        .cta-description {
            font-size: 1.25rem;
            color: var(--text-gray);
            margin-bottom: 2.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            position: relative;
        }

        /* ============================================
           FOOTER
           ============================================ */
        footer {
            background: var(--bg-dark);
            border-top: 1px solid var(--border-gray);
            padding: 4rem 0 2rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-brand p {
            color: var(--text-gray);
            margin-top: 1rem;
            line-height: 1.7;
        }

        .footer-links h4 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: var(--text-white);
        }

        .footer-links ul {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 0.75rem;
        }

        .footer-links a {
            color: var(--text-gray);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary-amber);
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .social-link {
            width: 45px;
            height: 45px;
            background: var(--bg-dark-secondary);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-gray);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 1.25rem;
        }

        .social-link:hover {
            background: var(--gradient-amber);
            color: var(--text-white);
            transform: translateY(-3px);
        }

        .footer-bottom {
            border-top: 1px solid var(--border-gray);
            padding-top: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-gray);
            font-size: 0.875rem;
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 1024px) {
            .hero-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .hero-text {
                text-align: center;
            }

            .hero-description {
                margin: 0 auto 2.5rem;
            }

            .hero-buttons {
                justify-content: center;
            }

            .hero-stats {
                justify-content: center;
            }

            .features-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
            }

            .testimonials-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }

            nav {
                display: none;
            }

            .mobile-menu-btn {
                display: block;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .stats-container {
                padding: 2rem;
            }

            .stat-number {
                font-size: 2.5rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .cta-container {
                padding: 3rem 1.5rem;
            }

            .cta-title {
                font-size: 2rem;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .social-links {
                justify-content: center;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            .square {
                font-size: 1.5rem;
            }
        }

        /* ============================================
           ANIMATIONS
           ============================================ */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .chess-move {
            animation: chessMove 3s infinite ease-in-out;
        }

        @keyframes chessMove {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    </style>
</head>
<body>
    <!-- Animated Background -->
    <div class="animated-bg">
        <div class="floating-piece">♔</div>
        <div class="floating-piece">♕</div>
        <div class="floating-piece">♖</div>
        <div class="floating-piece">♗</div>
        <div class="floating-piece">♘</div>
        <div class="floating-piece">♙</div>
        <div class="glow-orb amber"></div>
        <div class="glow-orb blue"></div>
    </div>

    <!-- Header -->
    <header id="header">
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">
                    <div class="logo-icon">♔</div>
                    <span class="logo-text">Chess Master</span>
                </a>
                
                <nav>
                    <a href="#features">Features</a>
                    <a href="#play">Play</a>
                    <a href="#learn">Learn</a>
                    <a href="#community">Community</a>
                </nav>
                
                <a href="#" class="btn btn-primary">Sign In</a>
                
                <button class="mobile-menu-btn">☰</button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <div class="hero-badge">World's #1 Chess Platform</div>
                    <h1 class="hero-title">
                        Master the Game of<br>
                        <span>Kings & Queens</span>
                    </h1>
                    <p class="hero-description">
                        Join millions of players worldwide. Improve your skills with interactive lessons, 
                        challenging puzzles, and compete in live tournaments against players of all levels.
                    </p>
                    <div class="hero-buttons">
                        <a href="#" class="btn btn-primary btn-large">Play Now — It's Free</a>
                        <a href="#" class="btn btn-secondary btn-large">Watch Demo</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat">
                            <div class="stat-value">10M+</div>
                            <div class="stat-label">Active Players</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">500K+</div>
                            <div class="stat-label">Daily Games</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">150+</div>
                            <div class="stat-label">Countries</div>
                        </div>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="board-wrapper">
                        <div class="board-glow"></div>
                        <div class="board-container">
                            <div class="chess-board" id="chessBoard">
                                <!-- Board squares will be generated by JavaScript -->
                            </div>
                            <div class="floating-badge top-right">♟ Your Move!</div>
                            <div class="floating-badge bottom-left">🏆 Play & Win</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Features</span>
                <h2 class="section-title">Why Choose Chess Master?</h2>
                <p class="section-description">
                    Everything you need to become a chess grandmaster, all in one platform.
                </p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card fade-in">
                    <div class="feature-icon">📚</div>
                    <h3 class="feature-title">Interactive Lessons</h3>
                    <p class="feature-description">
                        Learn from beginner to advanced with our comprehensive, structured curriculum designed by grandmasters.
                    </p>
                </div>
                
                <div class="feature-card fade-in">
                    <div class="feature-icon">🧩</div>
                    <h3 class="feature-title">Daily Puzzles</h3>
                    <p class="feature-description">
                        Sharpen your tactical skills with thousands of puzzles tailored to your skill level.
                    </p>
                </div>
                
                <div class="feature-card fade-in">
                    <div class="feature-icon">🏆</div>
                    <h3 class="feature-title">Live Tournaments</h3>
                    <p class="feature-description">
                        Compete against players worldwide in daily tournaments with real prizes and rankings.
                    </p>
                </div>
                
                <div class="feature-card fade-in">
                    <div class="feature-icon">📊</div>
                    <h3 class="feature-title">Game Analysis</h3>
                    <p class="feature-description">
                        AI-powered analysis reviews your games and identifies areas for improvement.
                    </p>
                </div>
                
                <div class="feature-card fade-in">
                    <div class="feature-icon">👥</div>
                    <h3 class="feature-title">Play Friends</h3>
                    <p class="feature-description">
                        Challenge your friends or make new ones in our vibrant global chess community.
                    </p>
                </div>
                
                <div class="feature-card fade-in">
                    <div class="feature-icon">📱</div>
                    <h3 class="feature-title">Play Anywhere</h3>
                    <p class="feature-description">
                        Seamless experience across all devices. Start a game on desktop, continue on mobile.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="container">
            <div class="stats-container">
                <div class="stat-item">
                    <div class="stat-number">10M+</div>
                    <div class="stat-text">Active Players</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">50M+</div>
                    <div class="stat-text">Games Played</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">1000+</div>
                    <div class="stat-text">Lessons</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">150+</div>
                    <div class="stat-text">Countries</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="community">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Testimonials</span>
                <h2 class="section-title">Loved by Players Worldwide</h2>
                <p class="section-description">
                    See what our community has to say about their experience.
                </p>
            </div>
            
            <div class="testimonials-grid">
                <div class="testimonial-card fade-in">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">
                        "Chess Master transformed my game completely. The lessons are incredibly well-structured and the puzzles keep me sharp every day!"
                    </p>
                    <div class="testimonial-author">
                        <div class="author-avatar">MK</div>
                        <div class="author-info">
                            <h4>Magnus K.</h4>
                            <p>Rating: 2100</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-card fade-in">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">
                        "The best chess platform I've ever used. The community is amazing and I've improved from 800 to 1500 rating in just 6 months!"
                    </p>
                    <div class="testimonial-author">
                        <div class="author-avatar">SA</div>
                        <div class="author-info">
                            <h4>Sarah A.</h4>
                            <p>Rating: 1500</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-card fade-in">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">
                        "The AI analysis feature is incredible. It's like having a personal grandmaster coach available 24/7. Highly recommended!"
                    </p>
                    <div class="testimonial-author">
                        <div class="author-avatar">JC</div>
                        <div class="author-info">
                            <h4>James C.</h4>
                            <p>Rating: 1850</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <div class="cta-container fade-in">
                <h2 class="cta-title">Ready to Become a Chess Master?</h2>
                <p class="cta-description">
                    Join millions of players and start your journey today. It's completely free to get started!
                </p>
                <div class="cta-buttons">
                    <a href="#" class="btn btn-primary btn-large">Start Playing Free</a>
                    <a href="#" class="btn btn-secondary btn-large">Explore Features</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="#" class="logo">
                        <div class="logo-icon">♔</div>
                        <span class="logo-text">Chess Master</span>
                    </a>
                    <p>The world's leading chess platform. Learn, play, and compete with millions of players worldwide.</p>
                    <div class="social-links">
                        <a href="#" class="social-link">𝕏</a>
                        <a href="#" class="social-link">📘</a>
                        <a href="#" class="social-link">📸</a>
                        <a href="#" class="social-link">▶️</a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#">Play Online</a></li>
                        <li><a href="#">Lessons</a></li>
                        <li><a href="#">Puzzles</a></li>
                        <li><a href="#">Tournaments</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Chess Master. All rights reserved.</p>
                <p>Made with ♔ for chess lovers worldwide</p>
            </div>
        </div>
    </footer>

    <script>
        // ============================================
        // CHESS BOARD INITIALIZATION
        // ============================================
        const initialPosition = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
        ];

        const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♟'];
        
        function initChessBoard() {
            const board = document.getElementById('chessBoard');
            board.innerHTML = '';
            
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement('div');
                    const isLight = (row + col) % 2 === 0;
                    square.className = `square ${isLight ? 'light' : 'dark'}`;
                    square.dataset.row = row;
                    square.dataset.col = col;
                    
                    const piece = initialPosition[row][col];
                    if (piece) {
                        const pieceSpan = document.createElement('span');
                        pieceSpan.className = `piece ${blackPieces.includes(piece) ? 'black' : 'white'} chess-move`;
                        pieceSpan.textContent = piece;
                        pieceSpan.style.animationDelay = `${(row + col) * 0.1}s`;
                        square.appendChild(pieceSpan);
                    }
                    
                    square.addEventListener('click', function() {
                        document.querySelectorAll('.square').forEach(sq => sq.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                    
                    board.appendChild(square);
                }
            }
        }

        // ============================================
        // SCROLL ANIMATIONS
        // ============================================
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // ============================================
        // HEADER SCROLL EFFECT
        // ============================================
        function handleHeaderScroll() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // ============================================
        // COUNTER ANIMATION
        // ============================================
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number, .stat-value');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                
                if (numericValue) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
            });
        }

        // ============================================
        // INITIALIZE
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            initChessBoard();
            handleScrollAnimations();
            
            // Trigger counter animation when stats section is visible
            const statsSection = document.querySelector('.stats-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            if (statsSection) {
                observer.observe(statsSection);
            }
        });

        window.addEventListener('scroll', function() {
            handleScrollAnimations();
            handleHeaderScroll();
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>
