const {Kafka} = require("kafkajs"); 
run();

async function run() {
  try {

    const kafka = new Kafka({
      "clientId": "myapp",
      "brokers": ["localhost:9092"]
    })

    const consumer = kafka.consumer({"groupId": "test"});
    console.log('Connecting to consumer...')
    await consumer.connect()
    console.log('Connected to consumer!');
    // A-M: partition 0, N-Z: partition 1 (sharding)
    await consumer.subscribe({
        "topic": "Users",
        "fromBeginning": true
    })

    await consumer.run({
        "eachMessage": async result => {
        console.log(`Received Msg ${result.message.value} on Partition ${result.partition}`)
        }
    })

  }

    catch(ex) 
      {
        console.error(`An error occurred ${ex}`);
      }

}