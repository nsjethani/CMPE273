var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        //console.log("Topic name in getconsumer", topic_name)
       // console.log("Consumer connection ",this.kafkaConsumerConnection)
            this.client = new kafka.Client("localhost:2181");
            //console.log("Topic inside if ",topic_name)
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: topic_name, partition: 0 }],{fetchMaxBytes: 1024 * 1024 *1024});
            this.client.on('ready', function () { console.log('client ready on topic!', topic_name) })
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;