# Parts and Expenses System - Usage Examples

## 📦 **Workflow 1: Buying Parts for Future Use**

### Scenario
You buy brake pads on sale, planning to use them later.

### Steps
1. **Add Part to Master Catalog**
   ```sql
   INSERT INTO parts (user_id, part_number, part_name, brand, category, compatible_makes)
   VALUES ('user-123', 'D1432', 'Brake Pads Front', 'Brembo', 'brakes', ARRAY['Toyota', 'Honda']);
   ```

2. **Record Purchase Transaction**
   ```sql
   INSERT INTO parts_inventory (part_id, transaction_type, quantity, unit_cost, total_cost, supplier, purchase_date)
   VALUES ('part-456', 'purchase', 1, 89.99, 89.99, 'AutoZone', '2024-01-15');
   ```

3. **Record as General Expense**
   ```sql
   INSERT INTO expenses (user_id, title, amount, expense_date, category, vendor, parts_inventory_id)
   VALUES ('user-123', 'Brake Pads Purchase', 89.99, '2024-01-15', 'parts', 'AutoZone', 'inventory-789');
   ```

**Result**: Part is in your inventory, expense is tracked, stock is automatically updated to 1.

---

## 🔧 **Workflow 2: Using Parts in Service**

### Scenario
You perform brake service using the parts you bought earlier.

### Steps
1. **Create Service Record**
   ```sql
   INSERT INTO service_records (car_id, date, mileage, cost, category, title)
   VALUES ('car-123', '2024-02-01', 45000, 150.00, 'brake', 'Front Brake Pad Replacement');
   ```

2. **Record Part Usage**
   ```sql
   INSERT INTO parts_inventory (part_id, car_id, transaction_type, quantity, service_record_id, usage_date)
   VALUES ('part-456', 'car-123', 'usage', 1, 'service-789', '2024-02-01');
   ```

3. **Link Part to Service**
   ```sql
   INSERT INTO service_parts (service_record_id, part_id, quantity_used, unit_cost, labor_hours, labor_cost)
   VALUES ('service-789', 'part-456', 1, 89.99, 2.5, 125.00);
   ```

**Result**: Part stock decreases to 0, service record shows parts used, total cost includes parts + labor.

---

## 💰 **Workflow 3: General Car Expenses**

### Scenario
You pay for insurance, get a car wash, pay for parking.

### Steps
1. **Insurance Payment**
   ```sql
   INSERT INTO expenses (user_id, car_id, title, amount, expense_date, category, vendor, payment_method)
   VALUES ('user-123', 'car-123', 'Auto Insurance - Monthly', 150.00, '2024-01-01', 'insurance', 'State Farm', 'credit_card');
   ```

2. **Car Wash**
   ```sql
   INSERT INTO expenses (user_id, car_id, title, amount, expense_date, category, vendor, odometer_reading)
   VALUES ('user-123', 'car-123', 'Car Wash', 25.00, '2024-01-05', 'other', 'Quick Clean', 44800);
   ```

3. **Parking**
   ```sql
   INSERT INTO expenses (user_id, car_id, title, amount, expense_date, category, tags)
   VALUES ('user-123', 'car-123', 'Airport Parking', 45.00, '2024-01-10', 'parking', ARRAY['airport', 'travel']);
   ```

**Result**: All expenses tracked with flexible categorization and tagging.

---

## 📊 **Workflow 4: Inventory Management**

### Scenario
You want to track parts across multiple cars and manage stock levels.

### Features Available

1. **Multi-Car Compatibility**
   - Parts can be marked compatible with multiple makes/models
   - Universal parts (oil filters, bulbs) work across your fleet

2. **Stock Alerts**
   - Set minimum stock levels
   - Get notified when parts are running low

3. **Cost Tracking**
   - Average cost calculation across purchases
   - Price trend analysis

4. **Supplier Management**
   - Track preferred suppliers
   - Compare prices and ratings

---

## 🔄 **Workflow 5: Advanced Scenarios**

### Warranty Claims
```sql
INSERT INTO expenses (user_id, car_id, title, amount, expense_date, category, is_warranty_claim, warranty_amount)
VALUES ('user-123', 'car-123', 'Transmission Repair', 2500.00, '2024-01-20', 'repairs', true, 2000.00);
```

### Part Returns
```sql
INSERT INTO parts_inventory (part_id, transaction_type, quantity, unit_cost, total_cost, notes)
VALUES ('part-456', 'return', 1, 89.99, 89.99, 'Wrong fitment - returned to AutoZone');
```

### Bulk Purchases
```sql
INSERT INTO parts_inventory (part_id, transaction_type, quantity, unit_cost, total_cost, supplier, purchase_date)
VALUES ('oil-filter-123', 'purchase', 12, 8.99, 107.88, 'Amazon', '2024-01-15');
```

---

## 🎯 **Key Benefits**

### **Flexibility**
- ✅ Buy parts without immediate use
- ✅ Track general expenses unrelated to parts
- ✅ Link parts to service records when used
- ✅ Handle complex scenarios (warranties, returns, bulk purchases)

### **Comprehensive Tracking**
- ✅ Parts inventory with automatic stock updates
- ✅ Cost analysis and price trends
- ✅ Supplier management and ratings
- ✅ Tax-deductible expense tracking

### **Integration**
- ✅ Seamless integration with existing service records
- ✅ Maintains data integrity with foreign keys
- ✅ Automatic cost calculations and stock updates

### **Reporting Capabilities**
- ✅ Total expenses by category/time period
- ✅ Parts usage patterns
- ✅ Supplier performance analysis
- ✅ Cost per mile/kilometer tracking

---

## 🚀 **User Interface Components Needed**

1. **Parts Management**
   - Parts catalog with search/filter
   - Add/edit parts with compatibility info
   - Stock level monitoring dashboard

2. **Inventory Transactions**
   - Purchase entry form
   - Usage tracking interface
   - Return/adjustment forms

3. **Expense Tracking**
   - Quick expense entry
   - Receipt upload and OCR
   - Expense categorization with tags

4. **Reports & Analytics**
   - Monthly/yearly expense summaries
   - Cost per vehicle analysis
   - Parts usage trends
   - Supplier performance metrics

5. **Integration Points**
   - Service record creation with parts selection
   - Automatic expense generation from parts usage
   - Inventory alerts and notifications 