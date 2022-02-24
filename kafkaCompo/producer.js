const {Kafka} = require("kafkajs");

const msg = process.argv[2];
run();

async function run() {
  try {

    const kafka = new Kafka({
        "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        const producer = kafka.producer();
        console.log('Connecting to producer...')
        await producer.connect()
        console.log('Connected to producer!');
        //A-M: partition 0, N-Z: partition 1
        //the logic below sets which partition the producer wants the msg to be in
        const partition = msg[0] < "N" ? 0 : 1;

        const data = {
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        }
        console.log(data.messages[0]);
        const result = await producer.send(data);
        
        console.log(`Message sent successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();

    }

    catch(ex) 
    {
        console.error(`An error occurred ${ex}`);
    }

    finally{
        process.exit(0);
    }
}
