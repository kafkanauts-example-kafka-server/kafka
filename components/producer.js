const { Kafka } = require('kafkajs');

class KafkaProducer {
  static #instance = null;
  #admin = null;
  #producer = null;
  #consumer = null;
  #isConnected = false;

  constructor() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });
    this.#admin = kafka.admin();
    this.#producer = kafka.producer();
  }

  static getInstance() {
    if (!KafkaProducer.#instance) {
      KafkaProducer.#instance = new KafkaProducer();
    }
    return KafkaProducer.#instance;
  }

  get isConnected() {
    return this.#isConnected;
  }

  async connect() {
    try {
      await Promise.all([
        this.#producer.connect(),
        this.#admin.connect(),
      ]);
      this.#isConnected = true;
    }
    catch (e) {
      console.error('async connect error:', e)
    }
  }

  async createTopics(topics) {
    try {
      return await this.#admin.createTopics(topics);
    }
    catch (e) {
      console.error('async createTopics error:', e);
    }
  }
  async send(topic, value, partition) {
    try {
      return await this.#producer.send({
        topic,
        messages: [{
          value,
          partition
        }]
      })
    }
    catch (e) {
      console.error('async send error', e);
    }
  }

  get producer() {
    return this.#producer;
  }
  get consumer() {
    return this.#consumer;
  }
  // get admin() {
  //   return this.#admin;
  // }
}
//-----------------------------------------------------
const kafka = KafkaProducer.getInstance();

(async () => {
  await kafka.connect();
  await kafka.createTopics({
    waitForLeaders: true,
    topics: [
      {
        topic: 'topic1',
        numPartitions: 2,
      },
      {
        topic: 'topic2',
        numPartitions: 2,
      },
      {
        topic: 'topic3',
        numPartitions: 2,
      },
      {
        topic: 'topic4',
        numPartitions: 2,
      },
    ]
  })
  while (true) {
    const sent = await Promise.all([
      kafka.send('topic1', 'hi topic1, partition0', 0),
      kafka.send('topic1', 'hi topic1, partition1', 1),
      kafka.send('topic2', 'hi topic2, partition0', 0),
      kafka.send('topic2', 'hi topic2, partition1', 1),
      kafka.send('topic3', 'hi topic3, partition0', 0),
      kafka.send('topic3', 'hi topic3, partition1', 1),
      kafka.send('topic4', 'hi topic4, partition0', 0),
      kafka.send('topic4', 'hi topic4, partition1', 1),
    ])
    console.log(sent);
    console.log("----------------------------")
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
  
})()

// const {Kafka} = require("kafkajs");

// const msg = process.argv[2];
// run();

// async function run() {
//   try {

//     const kafka = new Kafka({
//         "clientId": "myapp",
//         "brokers": ['localhost:9092']
//     })

//         const producer = kafka.producer();
//         console.log('Connecting to producer...')
//         await producer.connect()
//         console.log('Connected to producer!');
//         //A-M: partition 0, N-Z: partition 1
//         //the logic below sets which partition the producer wants the msg to be in
//         const partition = msg[0] < "N" ? 0 : 1;


//         // if (typeof msg === 'string') {
//         //     topic = "Users"
//         //     if (msg[0] < "F") {
//         //         partition = 0;
//         //     } else if (msg[0] < "N") {
//         //         partition = 1;
//         //     } else if (msg[0] < "V") {
//         //         partition = 2;
//         //     } else {
//         //         partition = 3;
//         //     }
//         // };

//         // if (typeof msg === 'number') {
//         //     topic = "Transactions"
//         //     if (msg[0] < 10) {
//         //         partition = 0;
//         //     } else if (msg[0] < 100) {
//         //         partition = 1;
//         //     } else if (msg[0] < 1000) {
//         //         partition = 2;
//         //     } else {
//         //         partition = 3;
//         //     }
//         // };

//         const data = {
//             "topic": "Users",
//             "messages": [
//                 {
//                     "value": msg,
//                     "partition": partition
//                 }
//             ]
//         }
//         console.log(data.messages[0]);
//         const result = await producer.send(data);
        
//         console.log(`Message sent successfully! ${JSON.stringify(result)}`);
//         await producer.disconnect();

//     }

//     catch(ex) 
//     {
//         console.error(`An error occurred ${ex}`);
//     }

//     finally{
//         process.exit(0);
//     }
// }
