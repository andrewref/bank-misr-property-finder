Property Finder Application
📋 General Description of the Task
1-1 Objectives

Build a full frontend for a Property Finder Application using Angular.

Implement component-based architecture, UI routing, and navigation.

Ensure responsive design using a modern UI library (Tailwind CSS chosen).

1-2 Tools to be Used

Framework: Angular 20+

Routing: Angular Router

UI Library: Tailwind CSS

Package Manager: npm

Others: TypeScript, Git

✅ Requirements
🔹 2-1 Project Initialization & Environment Setup

Create a new Angular project using ng new property-finder.

Add Angular routing.

Install Tailwind CSS as the UI library.

Deliverable: Angular project initialized with routing and Tailwind integrated.

🔹 2-2 Create Core UI Components

Components created:

NavbarComponent (Navigation bar)

FooterComponent

PropertyListComponent

PropertyDetailsComponent

SearchFilterComponent

NotFoundComponent

Deliverable: Functional and styled responsive components.

🔹 2-3 Implement Routing & Navigation

Defined routes:

/properties → Property List

/property/:id → Property Details

/search → Filtered Results

** → NotFoundComponent

Navigation handled via NavbarComponent.

Deliverable: Fully working router with navigation.

🔹 2-4 Connect Components with Mock Data

Mock dataset created using Angular services.

Data bound to PropertyListComponent and PropertyDetailsComponent.

Deliverable: Components dynamically load data via services.

🔹 2-5 Add Search & Filter Functionality

SearchFilterComponent allows filtering by:

Location

Price (min & max)

Property type

Communication implemented using @Input and @Output.

Deliverable: Fully functional search and filter system.

📦 Final Deliverables

✅ Angular project with component-based structure

✅ Routing and navigation implemented

✅ Responsive UI with Tailwind CSS

✅ Mock data integration using services

✅ Search and filter functionality

✅ README with setup and usage instructions

🚀 Setup & Usage

# Install dependencies
npm install

# Start development server
ng serve