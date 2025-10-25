# How to Detect and Process Charging Sessions with Webhooks

Learn how to use Smartcar webhooks to detect when a vehicle starts and ends charging, and how to process charging session data.

Smartcar webhooks make it easy to detect and process vehicle charging sessions in real time. This guide explains how to configure your webhook, handle charging events, and process charging session data in your backend.

## Step 1: Configure Your Webhook for Charging Events

In the [Smartcar Dashboard](https://dashboard.smartcar.com), create or edit a webhook integration. Under **Triggers**, select the following events:

- `Charge.IsCharging`
- `Charge.IsChargingCableConnected`

These signals will act as triggers for detecting when a vehicle starts and stops charging and when it is plugged in or unplugged. Whenever these signals change, Smartcar will send a webhook event to your configured endpoint.

Next, configure your data. This is the information you want to receive in your webhook payload every time you receive a webhook event. Triggers are included by default, but you can also add additional signals to the data payload, such as:

- `Charge.StateOfCharge` (included as a trigger)
- `Charge.ChargingCurrent` (included as a trigger)
- `Charge.ActiveLimit`
- `Charge.Amperage`
- `Charge.Voltage`
- `Charge.Wattage`
- `Charge.EnergyAdded`
- `Charge.TimeToComplete`
- `TractionBattery.Range`
- `TractionBattery.NominalCapacity`
- `Location.PreciseLocation`

These data signals will be delivered for every webhook event, allowing you to track the state of charge and other relevant metrics while the vehicle is charging.

Next, provide your webhook URL where Smartcar will send the events. Ensure your endpoint is publicly accessible and can handle POST requests. You can choose to auto-enroll all your vehicles to this webhook or manually subscribe vehicles later. For this guide, select “don’t subscribe any vehicles”. Now, save and verify your webhook.

## Step 2: Validate Webhook Events

Smartcar will send a verification request to your endpoint, which you must respond to with a `200 OK` status code to complete the setup (see [Webhook Verification guide](https://smartcar.com/docs)). Once verified, you will start to receive vehicle data for the vehicles subscribed to this webhook.

For this guide, since we chose not to auto-subscribe vehicles, go to the Smartcar Dashboard to manually subscribe a vehicle to your webhook. Select a vehicle from your list of connected vehicles, click on the three dots action menu to the right of the row, and click **Subscribe**. Select your newly created webhook from the options and click **Subscribe**.

At this point, your webhook is fully configured to receive charging events from the subscribed vehicle. Now, let’s handle the incoming webhook events in your backend.

Every webhook will include an `eventId` and an `eventType` field. The `eventType` will indicate the type of event that occurred, such as `VEHICLE_STATE` or `VEHICLE_ERROR`. Your handler should gracefully handle both event types. For `VEHICLE_STATE` events, you will receive the updated vehicle data in a `data` property of the payload. There will also be an array of signals under a `triggers` property that caused the event to be sent. Lastly, you will receive a `meta` property with additional context about the event, such as the webhook ID, name, delivery ID, delivery timestamp, etc.

## How to Track Charging Sessions

When a vehicle starts charging, you will receive a webhook event with the `eventType` of `VEHICLE_STATE` and the `Charge.IsCharging` signal set to `true`. When the vehicle stops charging, you will receive another event with `Charge.IsCharging` set to `false`. You can use these events to track the start and end of each charging session.

**Example event payload**:

```json
{
  "eventId": "a7738a15-7ee2-40b3-9815-823d146230cd",
  "eventType": "VEHICLE_STATE",
  "data": {
    "user": {
      "id": "deee49b6-d638-4be4-82dc-121ea613eed9"
    },
    "vehicle": {
      "id": "829e30ab-5a13-40b5-9f8a-8538af86ed95",
      "make": "Tesla",
      "model": "Model 3",
      "year": 2020
    },
    "signals": [
      {
        "code": "charge-ischarging",
        "name": "IsCharging",
        "group": "Charge",
        "body": {
          "value": true
        },
        "meta": {
          "oemUpdatedAt": 1754365413366,
          "retrievedAt": 1754365413366
        }
      }
    ],
    "triggers": [
      {
        "type": "SIGNAL_UPDATED",
        "signal": {
          "code": "charge-ischarging",
          "name": "IsCharging",
          "group": "Charge"
        }
      }
    ],
    "meta": {
      "webhookId": "f1c2d3e4-5678-90ab-cdef-1234567890ab",
      "webhookName": "My Charging Webhook",
      "deliveryId": "b1c2d3e4-5678-90ab-cdef-1234567890ab",
      "deliveryTimestamp": "2024-08-04T17:00:00Z",
      "mode": "LIVE",
      "signalCount": 1
    }
  }
}
```

**Tip**: Always validate the webhook signature to ensure the request is from Smartcar.