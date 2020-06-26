const { apiClient } = require("./mock-api/client");
const { ONE_DAY, ONE_HOUR } = require("./mock-api/pickup-cancellation");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const nextDayPath = path.join(__dirname, "..", "pickup-services", "next-day.yaml");
const nextDayPickup = yaml.safeLoad(fs.readFileSync(nextDayPath, "utf8"));

/**
 * Schedules a pick-up at a specific time and location
 */
async function schedulePickup(transaction, pickup) {

    // STEP 1: Validation
    if (pickup.pickupService.id === nextDayPickup.id
        && pickup.timeWindow.startDateTime.getTime() < (Date.now() + ONE_DAY)) {
        throw new Error(`${nextDayPickup.name} must be scheduled 24 hours in advance`);
    }

    // STEP 2: Create the data that the carrier's API expects
    let data = {
        operation: "pick_up",
        session_id: transaction.session.id,
        service_code: pickup.pickupService.identifiers.apiCode,
        date_time: pickup.timeWindow.startDateTime.toISOString(),
        zone: Number.parseInt(pickup.address.postalCode),
        contact_phone: pickup.contact.phoneNumber,
        total_weight: pickup.shipments.reduce((w, ship) => w + ship.package.weight.ounces, 0),
    };

    // STEP 3: Call the carrier's API
    const response = await apiClient.request({ data });

    // STEP 4: Create the output data that ShipEngine expects
    return formatConfirmation(response.data);
}

/**
 * Formats a pickup confirmation in the way ShipEngine expects
 */
function formatConfirmation(response) {
    let pickupDateTime = new Date(response.date_time);

    return {
        id: response.id,
        timeWindows: [
            {
                startDateTime: pickupDateTime,
                endDateTime: new Date(pickupDateTime.getTime() + (ONE_HOUR * 4)),
            }
        ],
        charges: [
            {
                name: "Pickup Fee",
                code: "PU2",
                type: "pickup",
                amount: {
                    value: response.pickup_cost,
                    currency: "USD",
                }
            },
            {
                name: "Transport Tax",
                code: "TX7",
                type: "tax",
                amount: {
                    value: response.tax_cost,
                    currency: "USD",
                }
            },
            {
                name: "Location Fee",
                code: "L4",
                type: "location_fee",
                amount: {
                    value: response.location_cost,
                    currency: "USD",
                }
            },
        ]
    };
}

module.exports = schedulePickup;