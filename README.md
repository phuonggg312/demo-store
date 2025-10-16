# Demo Store 🛍️

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## Overview

This project is a modern, responsive e-commerce storefront built with React and Vite. It showcases a clean design and smooth user experience for browsing products, viewing product details, and managing a shopping cart. The project fetches data from a mock e-commerce API using GraphQL.

## Features

- **Product Listings:** Browse products by category (Men, Women, Unisex).
- **Product Details Page:** View detailed information about each product, including multiple images, price, and description.
- **Interactive Header:** The header hides on scroll-down and reappears on scroll-up for a better viewing experience.
- **Responsive Design** 
- **GraphQL Integration:** Fetches product data efficiently using GraphQL queries.

## Packages & Tech Stack

This project is built with the following core technologies and packages:

### Frameworks & Libraries
- **React (`react`, `react-dom`):** A JavaScript library for building user interfaces.
- **Vite (`vite`):** A next-generation frontend build tool.
- **React Router (`react-router-dom`):** For client-side routing.

### Styling
- **Tailwind CSS (`tailwindcss`):** A utility-first CSS framework.
- **Scss**


### API & Data
- **GraphQL (`graphql`, `graphql-request`):** A query language for APIs.

### Development & Tooling

- **Vite React Plugin (`@vitejs/plugin-react`):** The official Vite plugin for React.

## Demo Link

Website (Cloudflare Pages): https://demo-store-cuc.pages.dev/

## Installation

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- **Node.js**: Version 18.x or higher is required. This includes `npm` (Node Package Manager). You can download it from [nodejs.org](https://nodejs.org/).
-v22.19.0

### Setup Instructions

1.  **Clone the Repository**
    Open your terminal and run the following command:
    ```sh
    git clone https://github.com/phuonggg312/demo-store.git
    ```

2.  **Navigate to the Project Directory**
    ```sh
    cd demo-store
    ```

3.  **Install Dependencies**
    Run the following command to install all the necessary packages defined in `package.json`:
    ```sh
    npm install
    ```
    **What does this command do?**
    - It downloads all project dependencies (like React, Vite, etc.) into the `node_modules` folder.
    - **Tailwind CSS Setup**: The setup for Tailwind CSS is already pre-configured in this project via the `tailwind.config.js` and `postcss.config.js` files. The `npm install` command automatically installs Tailwind and its dependencies. **No manual setup is required.**

4.  **Run the Development Server**
    Once the installation is complete, start the development server:
    ```sh
    npm run dev
    ```
    The application will now be running and accessible at `http://localhost:5173`.
    # install terser minify code
    - npm install -D terser
