const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});
// console.log(kafka)

(async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' });
  await consumer.connect()

  await Promise.all([
    consumer.subscribe({ topic: 'topic1', fromBeginning: true }),
    consumer.subscribe({ topic: 'topic2', fromBeginning: true }),
    consumer.subscribe({ topic: 'topic3', fromBeginning: true }),
    consumer.subscribe({ topic: 'topic4', fromBeginning: true }),
  ])
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      })
    },
  })
})()

// const {Kafka} = require("kafkajs"); 
// run();

// async function run() {
//   try {

//     const kafka = new Kafka({
//       "clientId": "myapp",
//       "brokers": ["localhost:9092", 'localhost:9093', 'localhost:9094', 'localhost:9095']
//     })

//     const consumer = kafka.consumer({"groupId": "test"});
//     console.log('Connecting to consumer...')
//     await consumer.connect()
//     console.log('Connected to consumer!');
//     // A-M: partition 0, N-Z: partition 1 (sharding)
//     await consumer.subscribe({
//         "topic": "Users",
//         "fromBeginning": true
//     })

//     await consumer.run({
//         "eachMessage": async result => {
//         console.log(`Received Msg ${result.message.value} on Partition ${result.partition}`)
//         }
//     })

//   }

//     catch(ex) 
//       {
//         console.error(`An error occurred ${ex}`);
//       }

// }