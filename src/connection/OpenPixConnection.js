import { ConnectionType } from "../models/enums/ConnectionType.js"
import { 
    getChargeAsync, 
    createChargeAsync, 
    getRefundAsync,
    createRefundAsync,
    getCustomerAsync,
    createCustomerAsync,
    getTransactionAsync,
    createPaymentAsync,
    confirmPaymentAsync
} from "../utils/restCaller.js";
import { genericErrors } from "../models/errors/genericErrors.js";
import { PixRefund } from "../models/pix/PixRefund.js";
import { PixCharge } from "../models/pix/PixCharge.js";
import { PixCustomer } from "../models/pix/PixCustomer.js";
import { PixTransaction } from "../models/pix/PixTransaction.js";
import { PixPayment } from "../models/pix/PixPayment.js";

class OpenPixConnection {
    constructor(authorization, type = ConnectionType.production) {
        this.setupConnection(authorization, type); 
    }

    _type = null;
    _cache = {
        charges: {},
        refunds: {},
        customers: {},
        transactions: {}
    };

    setupConnection = (newAuth, newType) => {
        typeof newAuth === 'string' ? 
        this._authorization = newAuth : {};

        this._headers = {
            'Authorization': this._authorization,
            'Cache-Control': 'no-cache'
        };

        this._type = newType[1];
    }

    getCharge = async (chargeId) => {
        if(!this._cache.charges[chargeId]) {
            const result = await getChargeAsync({
                id: chargeId,
                callType: this._type,
                callHeaders: this._headers
            });
    
            result.data instanceof Object && chargeId ?
            this._cache.charges[chargeId] = result.data : {};

            return new PixCharge(result.data.charge);
        }

        return new PixCharge(this._cache.charges[chargeId].data.charge);
    };

    createCharge = async (chargeBody) => {
        if(!chargeBody.correlationID)
            throw new Error(genericErrors.requiredFieldRequired + "correlationID");

        if(!chargeBody.value)
            throw new Error(genericErrors.requiredFieldRequired + "value");

        const result = await createChargeAsync({
            callType: this._type,
            callHeaders: this._headers,
            body: chargeBody
        });

        return new PixCharge(result.data.charge);
    }

    getRefund = async (refundId) => {
        if(!this._cache.refunds[refundId]) {
            const result = await getRefundAsync({
                id: refundId,
                callType: this._type,
                callHeaders: this._headers
            });
    
            result.data instanceof Object && refundId ?
            this._cache.refunds[refundId] = result.data : {};

            return new PixRefund(result.data.refund);
        }

        return new PixRefund(this._cache.refunds[refundId].data.charge);
    }

    createRefund = async (refundBody) => {
        if(!refundBody.value)
            throw new Error(genericErrors.requiredFieldRequired + "value");

        if(!refundBody.transactionEndToEndId)
            throw new Error(genericErrors.requiredFieldRequired + "transactionEndToEndId");    

        if(!refundBody.correlationID)
            throw new Error(genericErrors.requiredFieldRequired + "correlationID");

        const result = await createRefundAsync({
            callType: this._type,
            callHeaders: this._headers,
            body: refundBody
        });

        return new PixRefund(result.data.refund);
    }

    getCustomer = async (customerId) => {
        if(!this._cache.customers[customerId]) {
            const result = await getCustomerAsync({
                id: customerId,
                callType: this._type,
                callHeaders: this._headers
            });
    
            result.data instanceof Object && customerId ?
            this._cache.customers[customerId] = result.data : {};

            return new PixCustomer(result.data.customer);
        }

        return new PixCustomer(this._cache.customers[customerId].data.charge);
    }

    createCustomer = async (customerBody) => {
        if(!customerBody.name)
            throw new Error(genericErrors.requiredFieldRequired + "name");

        const result = await createCustomerAsync({
            callType: this._type,
            callHeaders: this._headers,
            body: customerBody
        });

        return new PixCustomer(result.data.customer);
    }

    getTransaction = async (transactionId) => {
        if(!this._cache.transactions[transactionId]) {
            const result = await getTransactionAsync({
                id: transactionId,
                callType: this._type,
                callHeaders: this._headers
            });
    
            result.data instanceof Object && transactionId ?
            this._cache.transactions[transactionId] = result.data : {};

            return new PixTransaction(result.data.transaction);
        }

        return new PixTransaction(this._cache.transactions[customerId].data.transaction);
    }

    startPayment = async (paymentBody) => {
        if(!paymentBody.correlationID)
            throw new Error(genericErrors.requiredFieldRequired + "correlationID");

        if(!paymentBody.pixKey)
            throw new Error(genericErrors.requiredFieldRequired + "pixKey");

        if(!paymentBody.pixKeyType)
            throw new Error(genericErrors.requiredFieldRequired + "pixKeyType");

        if(!paymentBody.value)
            throw new Error(genericErrors.requiredFieldRequired + "value");

        const result = await createPaymentAsync({
            callType: this._type,
            callHeaders: this._headers,
            body: paymentBody
        });

        return new PixPayment(result.data.payment);
    }

    confirmPayment = async (paymentBody) => {
        if(!paymentBody.correlationID)
            throw new Error(genericErrors.requiredFieldRequired + "correlationID");

        const result = await confirmPaymentAsync({
            callType: this._type,
            callHeaders: this._headers,
            body: paymentBody
        });

        return new PixPayment(result.data.payment);
    }

    getPixQrCode = async () => {
        
    }
}

export { OpenPixConnection }