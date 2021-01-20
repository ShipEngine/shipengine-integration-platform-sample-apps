import {OrderAppDefinition} from '@shipengine/connect'

const orderSource: OrderAppDefinition = {
  id: '3b76c08d-4299-4333-90bb-cd952bc68525',
  name: 'IBuy MarketPlace',
  description: 'Welcome to iBuy, the international marketplace for all of your needs.',
  websiteURL: 'https://www.iBuy.net',
  logo: './../logo.svg',
  icon: './../logo.svg',
  connectionForm: import('./forms/connect'),
  settingsForm: import('./forms/settings'),
  oauthConfig: import('./forms/oauth'),
  getSalesOrdersByDate: import('./methods/getSalesOrdersByDate'),
  acknowledgeOrders: import('./methods/acknowledgeOrders'),
  shipmentCreated: import('./methods/shipmentCreated')
}

export default orderSource;
