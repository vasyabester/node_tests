const axios = require('axios');

const userId = 1;
const amount = -20;
const url = 'http://localhost:3000/users/updateBalance';
const totalRequests = 1000;

async function sendRequest() {
    try {
        const response = await axios.post(url, { userId, amount });
        console.log('Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

async function loadTest() {
    const requests = [];
    for (let i = 0; i < totalRequests; i++) {
        requests.push(sendRequest());
    }
    await Promise.all(requests);
    console.log('Load test completed');
}

loadTest();
