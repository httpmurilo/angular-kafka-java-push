package com.example.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/user")
public class WebSocketController {

    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    @GetMapping
    public String sendMessage(String message) {
        return message;
    }
}

