'use strict';

const axios = require('axios');

const BASE_URI = 'https://connect-mock-server.herokuapp.com'

const client = (app = null) => {
  const baseURI = process.env.BASE_URI ? process.env.BASE_URI : BASE_URI;
  const baseURL = app ? `${baseURI}/${app}/` : baseURI;

  return axios.create({baseURL});
}

module.exports = client;
