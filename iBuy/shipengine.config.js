

module.exports = {
  negateTests: [],
  methods: {
    connectionFormDataProps: {
      account_id: process.env.ACCOUNT_ID,
      account_email: process.env.ACCOUNT_EMAIL,
      account_password: process.env.ACCOUNT_PASSWORD,
      agree_to_eula: true,
    },
    getSeller: [
      {
        id: "12345"
      },
      {
        id: "56789"
      }
    ],
    getSalesOrder: [
      {
        id: "12345"
      },
      {
        id: "56789"
      }
    ],
    getSalesOrdersByDate: [
      {
        startDateTime: new Date(),
        endDateTime: new Date(),
        includeChanges: true
      },
      {
        startDateTime: new Date().toISOString(),
        endDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
      },
      {
        startDateTime: {
          value: new Date().toISOString().slice(0, -1),
          timeZone: "America/Chicago"
        },
        endDateTime: {
          value: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, -1),
          timeZone: "America/Chicago"
        }
      }
    ],
    shipmentCancelled: [{
      trackingNumber: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      shipFrom: {
        name: "John Doe",
        email: "john.doe@gmail.com",
        phoneNumber: "123-456-7890",
        company: "US International",
        addressLines: ["3800 N Lamar Blvd #220"],
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        country: "US",
        timeZone: "America/Chicago",
      },
      shipTo: {
        name: "Jane Doe",
        email: "Jane.doe@gmail.com",
        phoneNumber: "987-654-3210",
        company: "Company Inc",
        addressLines: ["333 O'Farrell St"],
        cityLocality: "San Francisco",
        stateProvince: "CA",
        postalCode: "94102",
        country: "US",
        timeZone: "America/Los_Angeles",
      },
      shipDateTime: new Date(),
      packages: [
        {
          contents: [
            {
              salesOrder: {
                id: "123456"
              },
              salesOrderItem: {
                id: "1234556",
                sku: "987653"
              },
              quantity: {
                value: 3,
                unit: "ea"
              }
            }
          ]
        }
      ]
    }],
    shipmentCreated: [{
      trackingNumber: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      shipFrom: {
        name: "John Doe",
        email: "john.doe@gmail.com",
        phoneNumber: "123-456-7890",
        company: "US International",
        addressLines: ["3800 N Lamar Blvd #220"],
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        country: "US",
        timeZone: "America/Chicago",
      },
      shipTo: {
        name: "Jane Doe",
        email: "Jane.doe@gmail.com",
        phoneNumber: "987-654-3210",
        company: "Company Inc",
        addressLines: ["333 O'Farrell St"],
        cityLocality: "San Francisco",
        stateProvince: "CA",
        postalCode: "94102",
        country: "US",
        timeZone: "America/Los_Angeles",
      },
      shipDateTime: new Date(),
      packages: [
        {
          contents: [
            {
              salesOrder: {
                id: "123456"
              },
              salesOrderItem: {
                id: "1234556",
                sku: "482045"
              },
              quantity: {
                value: 3,
                unit: "ea"
              }
            }
          ]
        }
      ]
    }]
  }
};