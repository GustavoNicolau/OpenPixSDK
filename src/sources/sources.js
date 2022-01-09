const sources = {
    "production": {
        "baseUrl": "https://api.openpix.com.br",
        "charge": "/api/openpix/v1/charge",
        "createCharge": "/api/openpix/v1/charge",
        "refund": "/api/openpix/v1/refund/",
        "createRefund": "/api/openpix/v1/refund/"
    },
    "tests": {
        "baseUrl": "https://jsonplaceholder.typicode.com",
        "charge": "/todos/",
        "createCharge": "",
        "refund": "",
        "createRefund": ""
    },
    "mockTests": {
        "baseUrl": "https://raw.githubusercontent.com/EternalQuasar0206/OpenPixSDK/main/src/mocks/",
        "charge": "chargeMock.json",
        "createCharge": "createChargeMock.json",
        "refund": "refundMock.json",
        "createRefund": "createRefundMock.json"
    }
};

export { sources }