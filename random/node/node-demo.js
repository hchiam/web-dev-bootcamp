let fake = require('faker');

console.log(
`_________________________
WELCOME TO THE FAKE SHOP:
-------------------------`);

for (let i=0; i<10; i++) {
    console.log(`${i+1}) ${fake.commerce.productName()} - $${fake.commerce.price()}`);
}

console.log('-------------------------');
console.log('Contact info:');
console.log(fake.helpers.userCard());
