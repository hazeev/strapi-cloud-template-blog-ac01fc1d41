# Service Reminders

The Service Reminders module helps you stay on top of maintenance schedules across all your vehicles, minimizing downtime and ensuring timely service.

## Overview

The reminders system automatically tracks maintenance schedules and provides real-time status updates based on:
- **Mileage**: Due dates calculated from current vehicle mileage
- **Time**: Due dates based on calendar dates
- **Thresholds**: Configurable "due soon" warnings to give you advance notice

## Features

### 1. Automatic Status Calculation

Reminders are automatically categorized into three statuses:

- **Overdue**: Service is past due based on mileage or date
- **Due Soon**: Service is approaching based on configured thresholds
- **Upcoming**: Service is scheduled but not yet approaching

### 2. Smart Filtering

View reminders by status with real-time counts:
- All reminders across all vehicles
- Overdue items requiring immediate attention
- Due soon items requiring planning
- Upcoming items for future reference

### 3. Vehicle Context

Each reminder displays:
- Service name and description
- Vehicle information (year, make, model, license plate)
- Due mileage and remaining miles
- Due date and remaining days
- Current status badge

### 4. Quick Actions

From each reminder card, you can:
- Mark service as complete
- Navigate to the vehicle details page
- View all maintenance for that vehicle

## Status Calculation Logic

### Mileage-Based

A reminder is calculated as overdue or due soon based on:
1. Current vehicle mileage
2. Scheduled due mileage (from maintenance schedule)
3. Mileage due soon threshold (default: 500 miles)

**Example:**
- Vehicle current mileage: 24,500 miles
- Scheduled service: 25,000 miles
- Threshold: 500 miles
- Status: **Due Soon** (500 miles remaining)

### Time-Based

A reminder is calculated based on:
1. Current date
2. Scheduled due date
3. Time due soon threshold (default: 2 weeks)

**Example:**
- Current date: October 17, 2025
- Scheduled service: November 1, 2025
- Threshold: 2 weeks (14 days)
- Status: **Due Soon** (15 days remaining)

### Combined (Mileage + Time)

When both mileage and time intervals are set:
- **Overdue**: Either mileage OR time is overdue
- **Due Soon**: Either mileage OR time is due soon
- **Upcoming**: Both are upcoming

The system uses the most urgent status to ensure nothing is missed.

## API Endpoints

### GET `/api/reminders`

Fetch all maintenance reminders for the current user.

**Query Parameters:**
- `status` (optional): Filter by status (`overdue`, `due_soon`, `upcoming`, `all`)
- `car_id` (optional): Filter by specific vehicle

**Response:**
```json
{
  "reminders": [
    {
      "id": 1,
      "car_id": "...",
      "service_item": "Oil Change",
      "due_at_miles": 25000,
      "due_at_date": "2025-11-01",
      "status": "due_soon",
      "miles_until_due": 500,
      "days_until_due": 15,
      "car": { ... },
      "schedule": { ... }
    }
  ],
  "counts": {
    "all": 12,
    "overdue": 2,
    "due_soon": 5,
    "upcoming": 5
  }
}
```

## User Interface

### Reminders Page (`/reminders`)

The main reminders page includes:

1. **Page Header**: Title and description
2. **Filter Tabs**: Quick status filtering with counts
3. **Alert Banner**: Shown when there are overdue items
4. **Reminder Cards**: Grid of all matching reminders with:
   - Status badge (color-coded)
   - Service name and description
   - Vehicle information with link
   - Due mileage with remaining miles
   - Due date with remaining days
   - Action buttons

### Empty States

- No reminders at all: Prompt to add maintenance schedules
- No reminders for filter: Message explaining no items match

### Visual Design

- **Overdue**: Red border and badge
- **Due Soon**: Orange border and badge
- **Upcoming**: Default gray badge

## Integration with Maintenance Module

The reminders system works seamlessly with:
- **Maintenance Schedules**: Recurring schedules automatically create reminder items
- **Maintenance Items**: Each item is tracked as a reminder until completed
- **Vehicle Updates**: Mileage updates automatically recalculate reminder status
- **Service Records**: Completing a service marks the reminder as complete

## Future Enhancements

Planned features include:
- Email/push notifications for due soon and overdue reminders
- Calendar view for scheduling
- Bulk actions (mark multiple as complete)
- Forecasting view to predict future maintenance needs
- Compliance reports
- Service history integration

## Related Documentation

- [Maintenance Schedules](../development/maintenance-schedules.md)
- [Service Tasks](../development/service-tasks/README.md)
- [API Documentation](../api/reminders.md)

