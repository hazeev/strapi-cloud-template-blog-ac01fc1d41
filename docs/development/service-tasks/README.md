# Service Tasks Module

## Overview

The Service Tasks module provides a comprehensive catalog of standard vehicle maintenance and service tasks based on industry standards (Fleetio). This allows users to create custom maintenance schedules without relying on external APIs.

## Features

- **400+ Standard Service Tasks**: Imported from Fleetio's industry-standard catalog
- **Hierarchical Classification**: Tasks organized by Category → System → Assembly → Component
- **Smart Search**: Full-text search with category filtering
- **ShadCN UI Integration**: Beautiful, accessible UI components using Combobox
- **Custom Maintenance Schedules**: Users can add their own maintenance schedules with custom intervals

## Database Schema

### Tables

#### `service_categories`
Top-level classification (7 categories):
- **0**: A/C & HVAC
- **1**: Chassis & Brakes
- **2**: Drivetrain
- **3**: Electrical
- **4**: Engine & Fuel
- **5**: Fluids & Supplies
- **9**: Administrative

#### `service_systems`
Second-level classification (34 systems)
- Links tasks to specific vehicle systems (e.g., 013 = Brakes, 045 = Engine)

#### `service_assemblies`
Third-level classification (34 assemblies)
- Links to specific assemblies within systems

#### `service_components`
Fourth-level classification (77 components)
- Most granular level of classification

#### `service_tasks`
Main catalog of 400 service tasks with:
- `external_id`: Fleetio ID for reference
- `name`: Human-readable task name
- Classification links (category, system, assembly, component)
- Boolean flags: `is_inspection`, `is_replacement`, `is_fluid_service`
- Metadata: `estimated_hours`, `description`, `notes`

### Integration with Maintenance Module

The `maintenance_schedules` and `maintenance_items` tables now include:
- `service_task_id`: Optional link to the service task catalog
- This allows both OEM schedules (from external API) and custom user schedules

## Components

### `ServiceTaskSelector`
A ShadCN Combobox-based component for selecting service tasks.

**Features:**
- Real-time search
- Category filtering with badges
- Task metadata display (inspection/replacement/fluid indicators)
- Hierarchical information (category, system, assembly, component)

**Usage:**
```tsx
import { ServiceTaskSelector } from '@/components/service-task-selector'

<ServiceTaskSelector
  value={taskId}
  onValueChange={(taskId, task) => {
    // Handle selection
  }}
  placeholder="Select a service task..."
  categoryFilter="1" // Optional: pre-filter by category
/>
```

### `AddMaintenanceScheduleDialog`
A dialog for creating custom maintenance schedules.

**Features:**
- Service task selection via `ServiceTaskSelector`
- Custom interval configuration (miles)
- Optional notes
- Automatic creation of first maintenance item

**Usage:**
```tsx
import { AddMaintenanceScheduleDialog } from '@/components/add-maintenance-schedule-dialog'

<AddMaintenanceScheduleDialog
  carId={carId}
  currentMileage={currentMileage}
  onSuccess={() => {
    // Refresh maintenance data
  }}
/>
```

## API Endpoints

### `GET /api/service-tasks`
Fetch service tasks with optional filtering.

**Query Parameters:**
- `action=categories`: Get all service categories
- `category`: Filter by category code
- `system`: Filter by system code
- `search`: Search by task name
- `inspection=true`: Filter inspection tasks
- `replacement=true`: Filter replacement tasks
- `fluid=true`: Filter fluid service tasks
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset

**Response:**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "name": "Engine Oil & Filter Replacement",
      "category": { "code": "4", "name": "Engine & Fuel" },
      "system": { "code": "045", "name": "System 045" },
      "is_inspection": false,
      "is_replacement": true,
      "is_fluid_service": true
    }
  ]
}
```

### `GET /api/service-tasks/:id`
Get a single service task by ID.

### `POST /api/maintenance/:carId/schedules`
Create a custom maintenance schedule.

**Request Body:**
```json
{
  "service_task_id": "uuid",
  "interval_miles": 5000,
  "notes": "Optional notes",
  "task_name": "Engine Oil & Filter Replacement"
}
```

## Service Functions

Located in `/src/lib/service-tasks.ts`:

### Available Functions
- `getServiceTasks(options)`: Get tasks with filtering
- `getServiceTask(id)`: Get single task
- `getServiceCategories()`: Get all categories
- `searchServiceTasks(query, limit)`: Search tasks
- `getPopularServiceTasks(limit)`: Get common tasks
- `getServiceTasksByCategory(categoryCode)`: Filter by category
- `getInspectionTasks(limit)`: Get inspection-only tasks
- `getReplacementTasks(limit)`: Get replacement-only tasks
- `getFluidServiceTasks(limit)`: Get fluid service-only tasks

## Data Import

### Import Script
Location: `/scripts/import-service-tasks.js`

**Usage:**
```bash
node scripts/import-service-tasks.js
```

**What it does:**
1. Parses the Fleetio CSV export
2. Extracts unique systems, assemblies, and components
3. Populates lookup tables
4. Imports all 400 service tasks with metadata inference
5. Links tasks to their hierarchical classifications

**Metadata Inference:**
- `is_inspection`: Task name contains "inspect", "test", or "check"
- `is_replacement`: Task name contains "replacement" or "replace"
- `is_fluid_service`: Task name contains "fill", "fluid", "drain", "refill", "oil", or "coolant"

## Integration Points

### Maintenance Tab
Updated to include "Add Custom Schedule" button:
```tsx
<MaintenanceTab 
  carId={car.id} 
  currentMileage={car.current_mileage}
  odometerUnit={car.odometer_unit} 
/>
```

### User Workflow
1. User views their car's maintenance tab
2. Click "Add Custom Schedule" button
3. Search/browse service task catalog
4. Select a task
5. Set maintenance interval (miles)
6. Add optional notes
7. System creates schedule and first maintenance item

## Benefits Over External API

1. **No API Costs**: Free to use, no rate limits
2. **Offline Capability**: All data stored locally
3. **Customizable**: Users control their own schedules
4. **Fast**: No external API calls needed
5. **Flexible**: Can add custom tasks if needed
6. **Reliable**: No dependency on external service availability

## Future Enhancements

- [ ] Add estimated hours to tasks
- [ ] Allow users to create completely custom tasks (not just from catalog)
- [ ] Task recommendations based on vehicle age/mileage
- [ ] Popular task suggestions by vehicle type
- [ ] Integration with service records (auto-suggest tasks)
- [ ] Bulk schedule creation for new vehicles
- [ ] Export/import maintenance schedules between vehicles

## Migration Reference

Database migration: `supabase/migrations/20251016_018_service_tasks_schema.sql`

This creates all necessary tables, indexes, and RLS policies for the service tasks feature.

