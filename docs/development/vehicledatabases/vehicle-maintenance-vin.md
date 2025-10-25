Vehicle Maintenance by VIN
This API provides information about the OEM vehicle maintenance schedules at mileage intervals

Support: US manufactures.

Legacy API (v3)

Vehicle Maintenance (V3).

HTTP Request
GET https://api.vehicledatabases.com/vehicle-maintenance/v4/{vin}

GET Parameters
Parameter	Required	Description
VIN	True	17 digits VIN number

JSON Response
This API return OEM maintenance schedules for a vehicle.

Parameter	Description
status	success or error
data	An object containing all data available.


    {
    "status": "success",
    "data": {
        "vin": "2HGFE2F20NH507968",
        "year": 2022,
        "make": "Honda",
        "model": "Civic",
        "trim": "LX 4dr Sedan CVT",
        "maintenance": [
            {
                "mileage": {
                    "miles": 15000,
                    "km": 24100
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 25000,
                    "km": 40200
                },
                "service_items": [
                    "Replace Automatic Transaxle (cvt) Fluid"
                ]
            },
            {
                "mileage": {
                    "miles": 30000,
                    "km": 48200
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 45000,
                    "km": 72400
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 50000,
                    "km": 80400
                },
                "service_items": [
                    "Replace Automatic Transaxle (cvt) Fluid"
                ]
            },
            {
                "mileage": {
                    "miles": 60000,
                    "km": 96500
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 75000,
                    "km": 120700
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Automatic Transaxle (cvt) Fluid",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 90000,
                    "km": 144800
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 100000,
                    "km": 160900
                },
                "service_items": [
                    "Replace Automatic Transaxle (cvt) Fluid"
                ]
            },
            {
                "mileage": {
                    "miles": 105000,
                    "km": 168900
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 120000,
                    "km": 193100
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 125000,
                    "km": 201100
                },
                "service_items": [
                    "Replace Automatic Transaxle (cvt) Fluid"
                ]
            },
            {
                "mileage": {
                    "miles": 135000,
                    "km": 217200
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 150000,
                    "km": 241400
                },
                "service_items": [
                    "Replace Air Cleaner Element",
                    "Replace Automatic Transaxle (cvt) Fluid",
                    "Replace Cabin Air Filter"
                ]
            },
            {
                "mileage": {
                    "miles": 160000,
                    "km": 257400
                },
                "service_items": [
                    "Inspect Idle Speed"
                ]
            }
        ]
    }
}