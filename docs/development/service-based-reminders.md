# Service-Based Reminders Implementation

## Overview

The Service-Based Reminders system automatically calculates maintenance reminders based on the user's actual service history with specific service tasks. This replaces static maintenance schedules with dynamic calculations that adapt to real-world usage patterns.

## Key Features

- **Service History Based**: Reminders are calculated from actual service records, not static schedules
- **Automatic Calculation**: Next due dates are calculated based on when services were last performed
- **Service Task Integration**: Links maintenance schedules to specific service tasks from the catalog
- **Dual Calculation Methods**: Supports both mileage-based and time-based intervals
- **Real-time Updates**: Reminders update automatically as new services are logged

## How It Works

### 1. Service Task Linking
- Maintenance schedules are linked to specific service tasks via `service_task_id`
- Users create maintenance schedules by selecting service tasks from the catalog
- Each schedule defines intervals (mileage and/or time) for the service task

### 2. Service History Analysis
- System analyzes service records to find when each service task was last performed
- Looks at `service_parts` table to match service tasks with actual service records
- Tracks both the date and mileage when services were performed

### 3. Next Due Date Calculation
- **Mileage-based**: `next_due_mileage = last_performed_mileage + interval_miles`
- **Time-based**: `next_due_date = last_performed_date + interval_days`
- **Never performed**: Uses current mileage/date as baseline

### 4. Status Calculation
- **Overdue**: Past due date or mileage
- **Due Soon**: Within threshold (default: 7 days or 500 miles)
- **Upcoming**: Beyond threshold

## Database Schema

### Existing Tables (Enhanced)
- `maintenance_schedules`: Added `service_task_id` column
- `maintenance_items`: Added `service_task_id` column
- `service_records`: Links to service history
- `service_parts`: Links service records to specific service tasks

### Key Relationships
```
maintenance_schedules -> service_tasks (via service_task_id)
service_records -> service_parts -> service_tasks
maintenance_items -> service_tasks (via service_task_id)
```

## API Implementation

### Backend (Next.js)

#### Core Service Function
**File**: `src/lib/service-based-reminders.ts`
- `calculateServiceBasedReminders()`: Main calculation function
- Analyzes service history and calculates next due dates
- Returns structured reminder data with status and counts

#### API Endpoints
**File**: `src/app/api/reminders/v2/route.ts`
- `GET /api/reminders/v2`: New service-based reminders endpoint
- Supports both service-based and legacy methods
- Query parameters: `carId`, `status`, `serviceBased`

**File**: `src/app/api/reminders/service-based/route.ts`
- Dedicated service-based reminders endpoint
- Simplified interface for service-based calculations only

### Frontend (iOS)

#### Service Layer
**File**: `iOS/Carvetka/Carvetka/Services/ServiceBasedReminderService.swift`
- `ServiceBasedReminderService`: Observable service for managing reminders
- `loadServiceBasedReminders()`: Fetches and processes reminders
- `completeServiceBasedReminder()`: Marks reminders as completed

#### Data Models
```swift
struct ServiceBasedReminder {
    let id: String
    let carId: UUID
    let serviceTaskId: UUID
    let serviceTask: ServiceTask
    let lastPerformedAt: Date?
    let lastPerformedMileage: Int?
    let nextDueAt: Date?
    let nextDueMileage: Int?
    let status: ReminderStatus
    let daysUntilDue: Int?
    let milesUntilDue: Int?
    let intervalDays: Int?
    let intervalMiles: Int?
}
```

#### UI Components
**File**: `iOS/Carvetka/Carvetka/Views/Reminders/ServiceBasedRemindersView.swift`
- `ServiceBasedRemindersView`: Main reminders list view
- `ServiceBasedReminderRowView`: Individual reminder row
- `StatusBadge`: Visual status indicator
- Filtering by car and status

## Usage Examples

### Creating a Service-Based Maintenance Schedule

1. **User selects service task**: "Tire & Wheel Assembly Inspect"
2. **Sets intervals**: Every 1 week OR 400 km
3. **System creates schedule**: Links to service task with intervals
4. **Automatic reminders**: Calculated based on actual service history

### Reminder Calculation Flow

1. **Service performed**: User logs "Tire & Wheel Assembly Inspect" service
2. **History updated**: Service record created with service task link
3. **Next due calculated**: 1 week from service date OR 400 km from service mileage
4. **Status updated**: Reminder shows as "upcoming" until threshold reached
5. **Automatic progression**: "upcoming" → "due_soon" → "overdue"

### Example Scenarios

#### Scenario 1: Time-Based Reminder
- **Schedule**: "Oil Change" every 3 months
- **Last performed**: January 1st at 50,000 miles
- **Next due**: April 1st (3 months later)
- **Current status**: "upcoming" (if before March 25th)

#### Scenario 2: Mileage-Based Reminder
- **Schedule**: "Brake Inspection" every 5,000 miles
- **Last performed**: January 1st at 45,000 miles
- **Next due**: 50,000 miles
- **Current status**: "due_soon" (if at 49,500 miles)

#### Scenario 3: Combined Intervals
- **Schedule**: "Tire Rotation" every 6 months OR 7,500 miles
- **Last performed**: January 1st at 40,000 miles
- **Next due**: Whichever comes first (July 1st OR 47,500 miles)
- **Current status**: "overdue" (if past both dates)

## Benefits

### For Users
- **Accurate reminders**: Based on actual service history, not estimates
- **Personalized intervals**: Adapts to individual driving patterns
- **Reduced guesswork**: Clear next due dates based on real data
- **Better maintenance**: Proactive reminders prevent missed services

### For the System
- **Data-driven**: Uses actual service history for calculations
- **Flexible**: Supports both time and mileage-based intervals
- **Scalable**: Works with any service task in the catalog
- **Maintainable**: Clear separation between schedules and calculations

## Migration Strategy

### Phase 1: Parallel Implementation
- Keep existing maintenance items system
- Add service-based reminders as alternative
- Users can choose between methods

### Phase 2: Gradual Migration
- Encourage users to create service-based schedules
- Migrate existing schedules to use service tasks
- Provide migration tools and guidance

### Phase 3: Full Transition
- Make service-based reminders the default
- Deprecate legacy maintenance items
- Remove old system after migration complete

## Testing

### Test Cases
1. **New schedule**: Create maintenance schedule with service task
2. **Service logging**: Log service with specific service task
3. **Reminder calculation**: Verify next due date calculation
4. **Status updates**: Check status progression (upcoming → due_soon → overdue)
5. **Multiple intervals**: Test both time and mileage-based calculations
6. **Edge cases**: Never performed, overdue items, multiple cars

### Sample Data
```sql
-- Create maintenance schedule
INSERT INTO maintenance_schedules (car_id, service_task_id, mileage_miles, time_interval, time_interval_unit)
VALUES ('car-uuid', 'service-task-uuid', 5000, 3, 'months');

-- Log service with service task
INSERT INTO service_records (car_id, date, mileage, ...)
VALUES ('car-uuid', '2024-01-01', 45000, ...);

INSERT INTO service_parts (service_record_id, service_task_id, ...)
VALUES ('service-record-uuid', 'service-task-uuid', ...);
```

## Future Enhancements

### Advanced Features
- **Predictive analytics**: ML-based interval recommendations
- **Usage patterns**: Analyze driving patterns for optimal intervals
- **Cost optimization**: Suggest service timing for cost efficiency
- **Integration**: Connect with external service providers

### API Improvements
- **Real-time updates**: WebSocket support for live updates
- **Batch operations**: Bulk reminder updates
- **Analytics**: Detailed reporting and insights
- **Notifications**: Push notifications for due reminders

## Conclusion

The Service-Based Reminders system provides a more accurate, personalized, and data-driven approach to vehicle maintenance scheduling. By linking maintenance schedules to actual service tasks and calculating reminders based on real service history, users get more relevant and timely maintenance reminders that adapt to their individual usage patterns.
