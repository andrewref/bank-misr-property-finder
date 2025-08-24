# Property Finder Application

## 📋 Overview

A full frontend Property Finder Application built with Angular that implements component-based architecture, UI routing, and navigation with responsive design using Tailwind CSS.

## 🛠️ Tech Stack

- **Angular**: 20.1.0+
- **TypeScript**: ~5.8.2
- **Tailwind CSS**: 3.4.17 (chosen UI library)
- **RxJS**: ~7.8.0
- **Font Awesome**: 6.4.0
- **npm**: Package Manager

## ✨ Features

### Core Components
- **NavbarComponent**: Navigation bar with routing
- **FooterComponent**: Site footer
- **PropertyListComponent**: Display property listings
- **PropertyDetailsComponent**: Individual property details
- **SearchFilterComponent**: Advanced search and filtering
- **NotFoundComponent**: 404 error handling

### Routing & Navigation
- `/properties` → Property List
- `/property/:id` → Property Details
- `/search` → Filtered Results
- `**` → NotFoundComponent

### Search & Filter Functionality
- Location search
- Price range filtering (min/max)
- Property type filtering
- @Input/@Output communication between components

### Data Management
- Mock property dataset using Angular services
- Service layer for data operations
- Component data binding through PropertyService

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Angular CLI (v20.1.5 or higher)

### Installation

1. **Clone and navigate to project**
   ```bash
   cd bank-misr-property-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open browser**
   Navigate to `http://localhost:4200`

### Build for Production
```bash
ng build
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/                 # Navigation component
│   │   ├── footer/                 # Footer component
│   │   ├── property-list/          # Property listings
│   │   ├── property-details/       # Property details page
│   │   ├── search/                 # Search page
│   │   ├── search-filter/          # Filter component
│   │   └── not-found/              # 404 error page
│   ├── app.routes.ts               # Routing configuration
│   └── app.component.*             # Root component
├── models/
│   └── property.ts                 # Property interfaces
├── services/
│   └── property.service.ts         # Property data service
└── styles.css                      # Global styles
```

## 🎯 Usage

1. **Property Listings**: Navigate to `/properties` to browse all properties
2. **Property Details**: Click any property to view detailed information
3. **Search & Filter**: Use `/search` for advanced filtering by location, price, and type
4. **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🔧 Development Commands

```bash
# Development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Generate component
ng generate component component-name
```

## 📦 Requirements Fulfilled

✅ **2-1**: Project Initialization & Environment Setup  
✅ **2-2**: Core UI Components Created  
✅ **2-3**: Routing & Navigation Implemented  
✅ **2-4**: Mock Data Integration Using Services  
✅ **2-5**: Search & Filter Functionality with @Input/@Output  

---

**Built with Angular 20+ | Styled with Tailwind CSS | Developed for Bank Misr**