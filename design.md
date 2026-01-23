# Technical Design Document: KhetBuddy

## 1. Architecture Overview
KhetBuddy follows a **Modern Modular Frontend Architecture**. It is built as a Single Page Application (SPA) using React 19, leveraging a service-oriented approach for AI and data processing.

### High-Level Architecture
*   **View Layer**: React components (Tailwind CSS for styling).
*   **Intelligence Layer**: Google Gemini API (@google/genai) for Vision and NLP.
*   **Service Layer**: Logic for Mandi predictions, Translation management, and GIS rendering.
*   **Data Visualization**: Recharts (Analytics) and Leaflet.js (Geospatial).

## 2. Technology Stack
| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 | High performance, modern hook-based lifecycle. |
| **Styling** | Tailwind CSS | Rapid prototyping, utility-first responsiveness. |
| **AI (Text/Voice)**| Gemini 3 Pro | Complex reasoning for agronomy and advisory. |
| **AI (Vision)** | Gemini 3 Flash | Low-latency image analysis for disease detection. |
| **Maps** | Leaflet.js | Lightweight GIS capabilities with custom SVG overlays. |
| **Charts** | Recharts | SVG-based responsive data visualization. |
| **Build Tool** | Vite | Extremely fast HMR and optimized production builds. |

## 3. Component Design
### 3.1 Layout Strategy
*   **Sidebar**: Persistent navigation with active-state indicators.
*   **Header**: Context-aware top bar featuring a real-time weather ticker, theme toggle, and notification system.
*   **Main Container**: Uses a "Fluid Section Switcher" with entrance animations (`animate-sectionEnter`) to maintain user flow.

### 3.2 AI Integration
*   **ChatAssistant**: Implements a "Mute-First" speech policy. Uses the Browser Speech API for STT and Gemini Pro for generating professional scientific responses.
*   **Profile (KYC)**: Utilizes Gemini Flash-Image to perform OCR and entity extraction from uploaded identity documents.

### 3.3 Data Visualization
*   **MandiPriceChart**: A multi-series line chart distinguishing between "Historical" and "Predicted" data points.
*   **WeatherAdvisory**: A custom Leaflet implementation that simulates 9 risk zones using `L.circle` with color-coded opacity layers.

## 4. UI/UX Philosophy
*   **Glassmorphism**: Usage of `backdrop-blur` and translucent borders to give a high-tech "Aero" feel.
*   **Indian Heritage Palette**: Emerald Green (#059669) representing growth, Stone Gray (#1c1917) for modern hardware feel.
*   **Mobile-First**: All layouts are optimized for vertical scrolling and large touch-targets, catering to the primary device of Indian farmers.

## 5. Security & Verification
*   **Krishi-Eye**: A simulated biometric FaceID login sequence to build trust and demonstrate future secure-access capabilities.
*   **Secure API Handling**: Named parameter initialization for Gemini API to ensure compatibility with modern SDK standards.

## 6. Optimization Techniques
*   **Manual Chunking**: Implemented in `vite.config.ts` to separate `react-vendor`, `viz-libs`, and `genai` into distinct bundles for efficient browser caching and faster initial paint.
*   **Asset Management**: Lazy-loading of heavy GIS components until the user navigates to the Weather section.
