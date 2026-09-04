# OIL AI - Project Intelligence

Frontend interactive demo for Oil India Limited's Smart Automation and Project Intelligence initiative.

## Problem Statement

**SIH Problem Statement:** 26122

**Title:** Intelligent Data Capture & Schedule-Linking Layer for Infrastructure Project Management: Real-Time Actual Progress Tracking (Planning-to-Execution Bridge)

## Project Objective

OIL AI presents a unified project-control workspace for turning field updates, schedules, milestones, evidence, and progress signals into a clear operational view. The experience is designed to help project teams identify emerging delays, understand their likely causes, and evaluate recovery actions before schedule impact spreads.

## Dashboard And Control Tower

The Project Intelligence Control Tower brings project health, critical-path activity, milestones, alerts, recommendations, evidence, and analytics into one frontend workflow. Users can move from portfolio-level status to project activities, schedules, documents, site photos, and operational updates.

## Frontend Features

- Project Health, Critical Path, Milestones, Projects, Activities, and Schedule
- Documents, Site Photos, Voice Updates, and Data Sources
- Progress Contradiction Engine and New Activity Discovery
- Delay Intelligence, Root Cause Analysis, Evidence, Alerts, and Recommendations
- Impact Propagation Simulation and What-If Simulator
- Recovery Plans, AI Copilot, Reports, Analytics, and Admin views

## AI Intelligence Modules

- Progress Contradiction Engine for surfacing conflicting progress signals
- New Activity Discovery for identifying work that is not yet represented in the schedule
- Delay Intelligence for highlighting schedule risk
- Root Cause Analysis for organizing likely drivers of delay
- Evidence and Recommendations for connecting decisions to available project signals
- AI Copilot for guided project-intelligence workflows

## Impact Propagation Simulation

The Impact Propagation Simulation models how a change to an activity can affect dependent work, milestones, and project outcomes. The What-If Simulator supports comparison of scenarios so teams can reason about schedule consequences and recovery options.

## Technology Stack

- React 19
- TypeScript
- Vite
- React Router
- Recharts
- Lucide React
- Oxlint

Tailwind CSS, shadcn/ui, ESLint, and Prettier configuration are not part of the current project setup. The existing styling and configuration are preserved as implemented.

## Project Structure

```text
src/
	assets/                  Static application assets
	services/                Frontend service and simulation logic
	App.tsx                  Main application experience
	ImpactPropagation.tsx    Impact propagation interface
	data.ts                  Synthetic demo data
	App.css                  Application styles
	index.css                Global styles
	main.tsx                 Application entry point
public/                    Public static assets
package.json               Scripts and dependencies
package-lock.json          Locked dependency versions
vite.config.ts             Vite configuration
tsconfig*.json             TypeScript configuration
netlify.toml               Frontend deployment configuration
```

## Local Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Demo Data Disclaimer

This is a frontend-only interactive demo. It uses synthetic/mock data where applicable and does not include a backend, database, real authentication, external AI service, or production data connection.

## Future Scope

Future iterations may connect the interface to secure project systems, authenticated role-based workflows, live schedule and field-data ingestion, document intelligence, production AI services, audit trails, and deployment-specific observability. Those integrations are outside the scope of this frontend repository.
