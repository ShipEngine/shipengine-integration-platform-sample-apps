const fs = require("fs");
const path = require("path");

const dayjs = require('dayjs');
const yaml = require("js-yaml");

const apiClient = require("./api/client");

const nextDayPath = path.join(__dirname, "..", "pickup-services", "next-day.yaml");
const nextDayPickup = yaml.safeLoad(fs.readFileSync(nextDayPath, "utf8"));

/**
 * Schedules a pick-up at a specific time and location.
 */
async function schedulePickup(transaction, pickup) {
    // STEP 1: Validation
    if (dayjs(pickup.timeWindow.startDateTime.value) < dayjs().subtract(1, 'day')) {
        throw new Error(`${nextDayPickup.name} must be scheduled 24 hours in advance.`);
    }

    // STEP 2: Create the data that the carrier's API expects
    let data = {
        session_id: transaction.session.id,
        service_code: pickup.pickupService.code,
        date_time: pickup.timeWindow.startDateTime,
        zone: Number.parseInt(pickup.address.postalCode),
        contact_phone: pickup.contact.phoneNumber,
        total_weight: pickup.shipments.reduce((weight, ship) => {
            if(ship.package.weight) {
                return weight + ship.package.weight.ounces
            }

            return weight;
        }, 0)
    };

    // STEP 3: Call the carrier's API
    const response = await apiClient('carrier').post('/pickup/create', data);

    // STEP 4: Create the output data that ShipEngine Connect expects
    return formatConfirmation(response.data);
}

/**
 * Formats a pickup confirmation in the way ShipEngine Connect expects.
 */
function formatConfirmation(response) {
    return {
        id: response.id,
        timeWindows: [
            {
                startDateTime: dayjs(response.date_time).toDate(),
                endDateTime: dayjs(response.date_time).add(4, 'hours').toDate(),
            }
        ],
        charges: [
            {
                name: 'Pickup Fee',
                type: 'pickup',
                amount: {
                    value: Number(response.pickup_cost),
                    currency: 'USD',
                }
            },
            {
                name: 'Transport Tax',
                type: 'tax',
                amount: {
                    value: Number(response.tax_cost),
                    currency: 'USD',
                }
            },
            {
                name: 'Location Fee',
                type: 'location_fee',
                amount: {
                    value: response.location_cost,
                    currency: 'USD',
                }
            },
        ]
    };
}

module.exports = schedulePickup;
