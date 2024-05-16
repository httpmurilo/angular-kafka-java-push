package com.example.demo.new;

import reactor.core.publisher.Flux;
import reactor.kafka.receiver.ReceiverRecord;

public  KafkaConfig {

    public Flux<ReceiverRecord<String, String>> getTestTopicFlux();
}
