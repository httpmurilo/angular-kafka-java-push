//package com.example.demo.websocket.handlers;
//
//import com.example.demo.websocket.KafkaService;
//import com.example.demo.websocket.models.Message;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.socket.WebSocketHandler;
//import org.springframework.web.reactive.socket.WebSocketMessage;
//import org.springframework.web.reactive.socket.WebSocketSession;
//import reactor.core.publisher.Mono;
//
//@Component
//public class ReactiveWebSocketHandler implements WebSocketHandler {
//
//    private static final Logger logger = LoggerFactory.getLogger(ReactiveWebSocketHandler.class);
//    private final ObjectMapper json;
//    private final KafkaService kafkaService;
//
//    @Autowired
//    public ReactiveWebSocketHandler(KafkaService kafkaService) {
//        this.kafkaService = kafkaService;
//        this.json = new ObjectMapper();
//    }
//
//    @Override
//    public Mono<Void> handle(WebSocketSession webSocketSession) {
//        return webSocketSession.send(
//                        kafkaService.getTestTopicFlux()
//                                .map(record -> {
//                                    String jsonMessage;
//                                    try {
//                                        Message message = new Message("[Test] Add message", record.value());
//                                        jsonMessage = json.writeValueAsString(message);
//                                        logger.debug("Serialized message: {}", jsonMessage);
//                                        logger.debug("Received record: {}", record.value());
//                                    } catch (JsonProcessingException e) {
//                                        logger.error("Error while serializing to JSON", e);
//                                        jsonMessage = "Error while serializing to JSON";
//                                    }
//                                    return webSocketSession.textMessage(jsonMessage);
//                                }))
//                .and(
//                        webSocketSession.receive()
//                                .map(WebSocketMessage::getPayloadAsText)
//                                .doOnNext(message -> logger.debug("Received message: {}", message))
//                                .doOnError(error -> logger.error("Error in WebSocket receive: ", error))
//                                .then());
//    }
//}
