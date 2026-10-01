# Atmos Weather

Weather Forecasting Web Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

## Description

A modern, responsive weather application that provides current weather information and forecasts using the OpenWeatherMap API. Designed as a portfolio-quality project demonstrating professional development practices.

## Purpose

Demonstrate modern web development skills through a production-ready weather application featuring React, TypeScript, API integration, clean architecture, responsive UI/UX, and professional Git workflows with CI/CD deployment.

## Features

- Real-time weather data for any city worldwide with search functionality
- Detailed weather metrics: temperature, humidity, wind speed, pressure, visibility, sunrise/sunset
- 5-day/3-hour forecast with hourly and daily aggregations
- Geolocation support for automatic weather detection
- Mobile-first responsive design with dark mode support
- Loading and error state management for better UX
- API rate limiting with debounced search and response caching

## Setup

```bash
npm install
cp .env.example .env
```

Add your OpenWeatherMap API key to `.env`:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

```bash
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
