package com.example.demo.kafka;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

    private final KafkaProducer<String, String> producer;

    public ProducerService(KafkaProducer<String, String> producer) {
        this.producer = producer;
    }

    public void sendMessage(String message) {
        ProducerRecord<String, String> record = new ProducerRecord<>("test", message);
        producer.send(record);
    }

}
