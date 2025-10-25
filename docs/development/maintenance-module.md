# Maintenance & Service Items Module

## Overview

The Maintenance & Service Items module provides comprehensive OEM-recommended maintenance schedule tracking for vehicles. It integrates with the Vehicle Databases API to fetch manufacturer maintenance schedules and allows users to track completion of individual maintenance items.

## Features

✅ **OEM Maintenance Schedules** - Fetch factory-recommended maintenance intervals from Vehicle Databases API
✅ **VIN & YMMT Lookup** - Support for both VIN-based and Year/Make/Model/Trim lookups
✅ **Maintenance Tracking** - Track individual service items and mark them as complete
✅ **Smart Caching** - 30-day cache to minimize API calls and improve performance
✅ **Overdue Detection** - Automatically identify overdue maintenance based on current mileage
✅ **Upcoming Reminders** - Show upcoming maintenance intervals
✅ **Analytics & Insights** - Maintenance health scores, cost analysis, and insights
✅ **Dual Units** - Support for both miles and kilometers
✅ **Service Integration** - Optional linking to service records

## Architecture

### Database Schema

The module uses three main tables:

1. **`vehicle_maintenance_cache`** - Caches API responses (30-day expiration)
2. **`maintenance_schedules`** - Normalized maintenance intervals with service items
3. **`maintenance_items`** - Individual trackable maintenance tasks

### API Integration

- **Provider**: Vehicle Databases API (https://api.vehicledatabases.com)
- **Coverage**: US vehicles 1983-2025
- **Endpoints Used**:
  - `/vehicle-maintenance/v4/{year}/{make}/{model}/{trim}` - YMMT lookup
  - `/vehicle-maintenance-vin/v4/{vin}` - VIN lookup

### Components

#### Backend
- **`/src/lib/vehicle-databases-client.ts`** - API client for Vehicle Databases
- **`/src/lib/maintenance-service.ts`** - Business logic and data management
- **`/src/lib/maintenance-analytics.ts`** - Analytics and insights generation
- **`/src/app/api/maintenance/`** - RESTful API routes

#### Frontend
- **`/src/components/maintenance-schedule-card.tsx`** - Displays upcoming/overdue schedules
- **`/src/components/maintenance-items-list.tsx`** - Interactive item checklist
- **`/src/components/maintenance-tab.tsx`** - Main container component
- **`/src/components/maintenance-stats-card.tsx`** - Analytics dashboard

## Installation

### 1. Database Migration

Run the migration to create the required tables:

```bash
# The migration file is already created
supabase/migrations/20251015_015_maintenance_schedules.sql
```

This creates:
- Tables with proper indexes and RLS policies
- Trigger functions for auto-creating maintenance items
- Helper functions for querying upcoming/overdue maintenance

### 2. Environment Variables

Add your Vehicle Databases API key to `.env.local`:

```env
VEHICLE_DATABASES_API_KEY=your_api_key_here
```

Get your API key from: https://vehicledatabases.com

### 3. Type Definitions

The types are already added to `/src/types/database.ts`:
- `VehicleMaintenanceCache`
- `MaintenanceSchedule`
- `MaintenanceItem`
- `MaintenanceScheduleData`
- `MaintenanceInterval`

## Usage

### Syncing Maintenance Schedule

The maintenance schedule is fetched automatically the first time a user views the Maintenance tab. They can also manually sync:

```typescript
// API call
POST /api/maintenance/{carId}/sync

// Response
{
  "success": true,
  "message": "Maintenance schedule synced successfully",
  "data": {
    "schedules": 25,
    "vehicle": {
      "year": 2022,
      "make": "Honda",
      "model": "Civic",
      "trim": "LX 4dr Sedan CVT"
    }
  }
}
```

### Fetching Maintenance Summary

```typescript
// API call
GET /api/maintenance/{carId}

// Response
{
  "success": true,
  "data": {
    "upcoming": [...], // Next 3 maintenance intervals
    "overdue": [...], // Overdue intervals with incomplete items
    "nextMaintenance": {...}, // Nearest upcoming interval
    "totalIncomplete": 5
  }
}
```

### Completing Maintenance Items

```typescript
// Mark as complete
PATCH /api/maintenance/items/{itemId}/complete
{
  "completed_mileage": 75000,
  "notes": "Completed at dealership",
  "cost": 89.99,
  "currency": "USD",
  "service_record_id": "optional-link-to-service-record"
}

// Mark as incomplete
DELETE /api/maintenance/items/{itemId}/complete
```

### Using the UI Component

In any car details page:

```tsx
import MaintenanceTab from "@/components/maintenance-tab"

<MaintenanceTab 
  carId={car.id} 
  odometerUnit={car.odometer_unit} 
/>
```

## Data Flow

1. **Initial Load**:
   - Check cache for existing maintenance data
   - If cache valid (< 30 days old), return cached data
   - If cache expired or missing, fetch from API

2. **API Lookup Priority**:
   - Try VIN-based lookup first (if VIN available)
   - Fall back to YMMT lookup if VIN fails
   - Cache successful response for 30 days

3. **Schedule Sync**:
   - Delete existing schedules for the vehicle
   - Insert new schedules from API response
   - Auto-create maintenance items via database trigger

4. **Item Tracking**:
   - Users can mark items complete/incomplete
   - Completion data includes mileage, cost, notes
   - Optional linking to full service records

## Analytics & Insights

The module provides rich analytics:

### Maintenance Statistics
- Total items
- Completion rate
- Overdue count
- Upcoming intervals

### Cost Analysis
- Total maintenance costs
- Average cost per item
- Most expensive items
- Cost by category

### Health Score
Calculated based on:
- Completion rate (+10 for 100%)
- Overdue items (-5 points each)
- Incomplete items (-2 points each)
- Score range: 0-100

### Insights
Auto-generated insights:
- ⚠️ **Warning**: Overdue maintenance detected
- ⚠️ **Warning**: Maintenance due soon (< 500 miles)
- ℹ️ **Info**: Upcoming maintenance (< 1000 miles)
- ✅ **Success**: All maintenance up to date
- ℹ️ **Info**: Cost tracking suggestions

### Priority Ranking
Items prioritized by:
- **High**: > 5000 miles overdue
- **Medium**: 1000-5000 miles overdue or due < 500 miles
- **Low**: < 1000 miles overdue or due < 2000 miles

## API Reference

### GET `/api/maintenance/{carId}`
Get maintenance summary for a vehicle

**Response:**
```json
{
  "success": true,
  "data": {
    "upcoming": [...],
    "overdue": [...],
    "nextMaintenance": {...},
    "totalIncomplete": 5
  }
}
```

### POST `/api/maintenance/{carId}/sync`
Sync maintenance schedule from Vehicle Databases API

**Response:**
```json
{
  "success": true,
  "message": "Maintenance schedule synced successfully",
  "data": {
    "schedules": 25,
    "vehicle": {...}
  }
}
```

### GET `/api/maintenance/{carId}/upcoming?limit=3`
Get upcoming maintenance intervals

**Query Parameters:**
- `limit` - Number of intervals to return (default: 3)

### GET `/api/maintenance/{carId}/overdue`
Get overdue maintenance intervals with incomplete items

### PATCH `/api/maintenance/items/{itemId}/complete`
Mark maintenance item as complete

**Request Body:**
```json
{
  "completed_mileage": 75000,
  "notes": "Optional notes",
  "cost": 89.99,
  "currency": "USD",
  "service_record_id": "optional-uuid"
}
```

### DELETE `/api/maintenance/items/{itemId}/complete`
Mark maintenance item as incomplete

## Database Functions

### `get_upcoming_maintenance(car_id, current_mileage, limit)`
Returns next N scheduled maintenance intervals

### `get_overdue_maintenance(car_id, current_mileage)`
Returns overdue intervals with incomplete items

### `create_maintenance_items_from_schedule()`
Trigger function that auto-creates items when schedule is added

## Security

- **Row Level Security**: All tables have RLS policies
- **User Ownership**: Users can only access maintenance for their vehicles
- **API Authentication**: Vehicle Databases API key stored server-side only
- **Input Validation**: All API inputs validated and sanitized

## Performance Considerations

1. **Caching**: 30-day cache reduces API calls significantly
2. **Indexes**: Optimized indexes on frequently queried columns
3. **Batch Operations**: Schedule sync uses batch inserts
4. **Lazy Loading**: Maintenance data fetched only when tab viewed

## Error Handling

The module handles various error scenarios:

- **404 Not Found**: Vehicle not in database (shows user-friendly message)
- **429 Rate Limit**: API rate limit exceeded (retry suggested)
- **401 Unauthorized**: Invalid API key (configuration error)
- **Missing Trim**: Requires trim information for YMMT lookup
- **Network Errors**: Graceful degradation with cached data

## Future Enhancements

Potential improvements for future versions:

- [ ] Push notifications for upcoming maintenance
- [ ] Bulk completion of maintenance intervals
- [ ] Custom maintenance schedules for modified vehicles
- [ ] Maintenance cost budget tracking
- [ ] Integration with local service providers
- [ ] Export maintenance history to PDF
- [ ] Multi-vehicle maintenance calendar view
- [ ] Maintenance reminder emails

## Testing

### Manual Testing Checklist

- [ ] Sync schedule for vehicle with VIN
- [ ] Sync schedule for vehicle without VIN (YMMT fallback)
- [ ] View upcoming maintenance intervals
- [ ] Mark items as complete/incomplete
- [ ] Check overdue maintenance alerts
- [ ] Verify cache expiration (30 days)
- [ ] Test with different odometer units (miles/km)
- [ ] Verify RLS policies (can't access other users' data)

### API Testing

Use the provided endpoints to test:

```bash
# Sync maintenance
curl -X POST http://localhost:3000/api/maintenance/{carId}/sync

# Get summary
curl http://localhost:3000/api/maintenance/{carId}

# Complete item
curl -X PATCH http://localhost:3000/api/maintenance/items/{itemId}/complete \
  -H "Content-Type: application/json" \
  -d '{"completed_mileage": 75000}'
```

## Troubleshooting

### Issue: "Vehicle trim information is required"
**Solution**: Update the vehicle with trim information before syncing

### Issue: "Rate limit exceeded"
**Solution**: Wait before trying again. Cache prevents excessive calls.

### Issue: "Vehicle not found in database"
**Solution**: Vehicle may not be in the Vehicle Databases API (pre-1983 or non-US)

### Issue: Maintenance schedule not showing
**Solution**: 
1. Check API key is configured
2. Verify vehicle has year, make, model, and trim
3. Check browser console for errors
4. Try manual sync

## License & Attribution

- Vehicle data provided by [Vehicle Databases](https://vehicledatabases.com)
- US vehicles 1983-2025 coverage
- OEM maintenance schedules are manufacturer-recommended intervals

## Support

For issues or questions:
1. Check this documentation
2. Review API logs in browser console
3. Verify environment configuration
4. Check Supabase database logs

---

**Version**: 1.0.0  
**Last Updated**: October 15, 2025  
**Author**: Carvetka Development Team

