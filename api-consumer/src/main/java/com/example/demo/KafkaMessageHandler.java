package com.example.demo;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageHandler {

    private final SimpMessagingTemplate messagingTemplate;

    public KafkaMessageHandler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "${kafka.topic}")
    public void handle(ConsumerRecord<String, String> record) {
        String message = record.value();
        messagingTemplate.convertAndSend("/topic/messages", message);
    }

}
