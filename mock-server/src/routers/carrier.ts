import {Router} from 'express'

import {labelCancel} from '../controllers/carrier/label-cancel'
import {labelCreate} from '../controllers/carrier/label-create'
import {manifestCreate} from '../controllers/carrier/manifest-create'
import {pickupCancel} from '../controllers/carrier/pickup-cancel'
import {pickupCreate} from '../controllers/carrier/pickup-create'
import {shipmentTrack} from '../controllers/carrier/shipment-track'
import {shipmentRates} from '../controllers/carrier/shipment-rates'

export const carrierRouter = Router()

carrierRouter.post('/label/cancel', labelCancel)
carrierRouter.post('/label/create', labelCreate)
carrierRouter.post('/manifest/creat', manifestCreate)
carrierRouter.post('/pickup/cancel', pickupCancel)
carrierRouter.post('/pickup/create', pickupCreate)
carrierRouter.post('/shipment/rates', shipmentRates)
carrierRouter.post('/shipment/track', shipmentTrack)
