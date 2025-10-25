# Sample Data Generation Guide

This guide explains how to generate realistic sample data for your Carvetka car maintenance app.

## Overview

The sample data generator creates comprehensive test data including:
- **Meter Entries**: Odometer readings over time
- **Fuel Entries**: Gas fill-ups with pricing and station info
- **Issues**: Various car problems with different priorities and statuses
- **Service Records**: Maintenance and repair records
- **Expenses**: Service costs and general car expenses
- **Reminders**: Maintenance reminders and due dates
- **Documents**: Sample car documents and receipts

## Prerequisites

1. **Environment Variables**: Ensure you have the following in your `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Car Record**: The car with ID `35cfb0b1-e9a4-4be3-a18d-4587153affa1` must exist in your database.

3. **Dependencies**: Make sure you have the required packages installed:
   ```bash
   npm install
   ```

## Usage

### Method 1: Using npm script (Recommended)

```bash
# Generate sample data for the default car
npm run generate-sample-data

# Generate sample data for a specific car ID
npm run generate-sample-data -- your-car-id-here
```

### Method 2: Direct Node.js execution

```bash
# Default car ID
node scripts/generate-sample-data.js

# Specific car ID
node scripts/generate-sample-data.js 35cfb0b1-e9a4-4be3-a18d-4587153affa1
```

### Method 3: Using the SQL file directly

If you prefer to run the SQL directly in your database:

```bash
# Replace the car_id variable in the SQL file
psql -d your_database -f generate_sample_data.sql
```

## Generated Data Details

### Meter Entries (11 records)
- Odometer readings from 15,000 to 51,500 miles
- Covers a 2-year period (2023-2024)
- Mix of manual entries and service-related readings

### Fuel Entries (10 records)
- Realistic fuel consumption data
- Different gas stations (Shell, Exxon, Chevron, BP, Costco)
- Premium fuel type
- Varying prices per gallon ($3.38 - $3.65)
- Linked to meter entries

### Issues (6 records)
- **Resolved Issues**: Squeaky brakes, AC problems, check engine light
- **Open Issues**: Tire wear, dashboard rattle, brake fluid leak
- Different priority levels (critical, high, medium, low)
- Realistic descriptions and labels

### Service Records (6 records)
- Oil changes, brake repairs, engine diagnostics
- Transmission service, tire rotation
- Different service providers
- Costs ranging from $78 to $312
- Linked to meter entries

### Expenses (9 records)
- Service-related expenses (linked to service records)
- General expenses (insurance, registration, roadside assistance)
- Different payment methods and categories
- Tax calculations included

### Reminders (5 records)
- Mix of date-based and mileage-based reminders
- Some completed, some pending
- Realistic maintenance intervals

### Documents (5 records)
- Service manual, insurance card, registration
- Warranty info, service receipts
- Different file types and sizes
- Proper categorization

## Data Relationships

The generated data maintains proper relationships:

```
Cars
├── Meter Entries
│   ├── Fuel Entries
│   └── Service Records
│       └── Expenses
├── Issues
├── Expenses (general)
├── Reminders
└── Documents
```

## Customization

### Modifying the Car ID

To generate data for a different car, either:
1. Pass the car ID as a command line argument
2. Edit the `DEFAULT_CAR_ID` in `scripts/generate-sample-data.js`

### Adding More Data

To add more sample data:

1. **Edit the arrays** in `scripts/generate-sample-data.js`
2. **Add new data types** by following the existing patterns
3. **Maintain relationships** by linking to existing records

### Changing Time Periods

The script generates data for 2023-2024. To change this:
1. Update the `entry_date` values in the data arrays
2. Ensure chronological order is maintained
3. Update any date-based reminders accordingly

## Troubleshooting

### Common Issues

1. **"Car not found" error**
   - Ensure the car ID exists in your database
   - Check that the car belongs to a valid user

2. **"Missing environment variables" error**
   - Verify your `.env.local` file has the correct Supabase credentials
   - Ensure the service role key has proper permissions

3. **"Foreign key constraint" errors**
   - The script handles relationships automatically
   - If you get constraint errors, check that all referenced records exist

4. **"Permission denied" errors**
   - Ensure your Supabase service role key has write permissions
   - Check your RLS (Row Level Security) policies

### Verification

After running the script, verify the data:

```sql
-- Check total counts
SELECT 
  'meter_entries' as table_name, COUNT(*) as count FROM meter_entries WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'fuel_entries', COUNT(*) FROM fuel_entries WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'issues', COUNT(*) FROM issues WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'service_records', COUNT(*) FROM service_records WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'expenses', COUNT(*) FROM expenses WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'reminders', COUNT(*) FROM reminders WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1'
UNION ALL
SELECT 'documents', COUNT(*) FROM documents WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
```

## Cleanup

To remove the generated sample data:

```sql
-- Delete in reverse order of dependencies
DELETE FROM documents WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM reminders WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM expenses WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM service_records WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM issues WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM fuel_entries WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
DELETE FROM meter_entries WHERE car_id = '35cfb0b1-e9a4-4be3-a18d-4587153affa1';
```

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your database schema matches the expected structure
3. Ensure all foreign key relationships are properly set up
4. Check your Supabase permissions and RLS policies
