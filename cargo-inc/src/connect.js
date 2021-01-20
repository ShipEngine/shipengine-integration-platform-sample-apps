"use strict";

const apiClient = require('./api/client');

/**
 * Connects a user's Cargo Incorporated account to ShipEngine Connect
 */
async function connect(transaction, connectionFormData) {
  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error('You must agree to the terms and conditions.');
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    account_id: connectionFormData.account_id,
    account_email: connectionFormData.account_email,
    account_password: connectionFormData.account_password,
    agree_to_eula: connectionFormData.agree_to_eula,
    eula: connectionFormData.eula,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient('auth').post('/connect', data);

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    id: response.data.id,
    ip: response.data.ip,
    created: response.data.created,
    language: response.data.language,
  };
}

module.exports = connect;
