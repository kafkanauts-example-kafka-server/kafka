const Kafka = require('kafkajs').Kafka;
run();

async function run() {
    try {
        const kafka = new Kafka({
            clientId: 'myapp',
            brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094', 'localhost:9095']
        });

        const admin = kafka.admin();
        console.log('Connecting...');
        await admin.connect();
        console.log('Connected!');
        // adding a param to createTopics can add the functionality of creating any num of topics
        await admin.createTopics({
            waitForLeaders: true,
            topics: [
                {
                    topic: 'Users',
                    numPartitions: 2,
                }, 

                {
                    topic: 'Transactions',
                    numPartitions: 2,
                },

                { 
                    topic: 'Orders',
                    numPartitions: 2,
                },
                
                {
                    topic: 'Order Status',
                    numPartitions: 2,
                }
            ]
        });
        console.log('Created Successfully!');
        await admin.disconnect();
    } catch (ex) {
        console.error(`An error occurred ${ex}`);
    } finally {
        process.exit(0);
    }
}
