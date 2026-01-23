# Technical Design Document: KhetBuddy

## 1. Architecture Overview
KhetBuddy is a modular Single Page Application (SPA) built with **React 19**. It utilizes a service-oriented approach to integrate advanced AI capabilities with geospatial data and predictive analytics.

### High-Level Components
*   **View Layer (React 19)**: Responsive UI using Tailwind CSS for professional "Glassmorphic" aesthetics.
*   **Intelligence Layer (Gemini API)**: 
    *   `Gemini 3 Pro`: Powers complex reasoning and advisory (Krishi Mitra).
    *   `Gemini 3 Flash`: Handles low-latency image processing for diagnostics and KYC.
*   **Service Layer**:
    *   `predictionService.ts`: Simulates ML price forecasting.
    *   `geminiService.ts`: Manages AI model configurations and prompts.
    *   `translations.ts`: Centralized multilingual context management.
*   **Visualization Layer**:
    *   `Leaflet.js`: Geospatial mapping for weather risk advisories.
    *   `Recharts`: Interactive data visualization for Mandi trends.

## 2. Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 (Hooks, Context API) |
| **Styling** | Tailwind CSS 3.x |
| **AI (LLM/Vision)**| @google/genai (Gemini 3 Pro/Flash) |
| **Mapping** | Leaflet.js |
| **Charts** | Recharts (SVG-based) |
| **Icons** | FontAwesome 6 |
| **Build Tool** | Vite |

## 3. Key Component Design

### 3.1 Layout & Navigation
*   **Sidebar**: Permanent navigation with active section highlighting and persistent language context.
*   **Header**: Features a real-time weather ticker, notification center, and theme switcher.
*   **Fluid Section Switcher**: Custom CSS animations (`animate-sectionEnter`) ensure smooth transitions between modules.

### 3.2 AI Integration (Gemini)
*   **Vision Diagnostics**: Images captured via `navigator.mediaDevices` are converted to base64 and sent to Gemini Flash for instant pathogen identification.
*   **Voice Assistant**: Integrated Browser `SpeechRecognition` (STT) and `SpeechSynthesis` (TTS) mapped to Gemini Pro’s expert reasoning.

### 3.3 Geospatial Weather Module
*   Custom Leaflet implementation using `L.divIcon` for crop-specific markers.
*   Visualizes 9 atmospheric risk zones using semi-transparent `L.circle` overlays with tooltips.
*   Theme-aware tile layers (Satellite vs. Infrastructure Dark).

## 4. Performance & Optimization

### 4.1 Manual Chunking (Vite)
To ensure fast initial loading on rural networks, the application implements manual rollup chunking:
*   `react-vendor`: Core framework libs.
*   `viz-libs`: Heavy visualization libraries (Leaflet, Recharts).
*   `genai`: Google SDK.

### 4.2 Asset Optimization
*   **Parallax Hero**: Uses staggered reveal animations to maintain perceived performance.
*   **News Ticker**: CSS-based infinite scroll to minimize CPU overhead.

## 5. Security & Inclusivity
*   **Krishi-Eye**: A simulated Biometric/KYC flow that demonstrates document OCR and face-scanning security.
*   **Regional Localization**: Context-aware translations that prioritize scientific accuracy in local languages (e.g., specific chemical dosages).
