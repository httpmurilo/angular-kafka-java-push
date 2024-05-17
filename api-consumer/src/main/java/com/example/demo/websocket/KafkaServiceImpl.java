//package com.example.demo.websocket;
//
//import com.fasterxml.jackson.databind.deser.std.StringDeserializer;
//import org.apache.kafka.clients.consumer.ConsumerConfig;
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.springframework.core.io.support.PropertiesLoaderUtils;
//import org.springframework.stereotype.Service;
//import reactor.core.publisher.Flux;
//import reactor.kafka.receiver.KafkaReceiver;
//import reactor.kafka.receiver.ReceiverOptions;
//import reactor.kafka.receiver.ReceiverRecord;
//
//import java.io.IOException;
//import java.util.Collections;
//import java.util.Properties;
//
//@Service
//public class KafkaServiceImpl implements KafkaService{
//
//    private Flux<ReceiverRecord<String, String>> testTopicStream;
//
//    KafkaServiceImpl() throws IOException {
//
//        Properties props = new Properties();
//        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        props.put(ConsumerConfig.CLIENT_ID_CONFIG, "reactive-consumer");
//        props.put(ConsumerConfig.GROUP_ID_CONFIG, "sample-group");
//        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
//
//        ReceiverOptions<String, String> receiverOptions = ReceiverOptions.create(props);
//
//        testTopicStream = createTopicCache(receiverOptions, "test");
//    }
//
//
//    public Flux<ReceiverRecord<String, String>> getTestTopicFlux() {
//
//        return testTopicStream;
//    }
//
//    private <T, G> Flux<ReceiverRecord<T, G>> createTopicCache(ReceiverOptions<T, G> receiverOptions, String topicName) {
//        ReceiverOptions<T, G> options = receiverOptions.subscription(Collections.singleton(topicName));
//
//        return KafkaReceiver.create(options).receive().cache();
//    }
//}
