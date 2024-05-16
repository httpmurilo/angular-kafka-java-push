package com.example.demo.controler;

import com.example.demo.kafka.ProducerService;
import com.example.demo.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ProducerService service;

    @GetMapping
    public ResponseEntity<String> postUserToKafka() throws JsonProcessingException {

        var r = new Random();
        User user = new User(r.nextInt(),"MURILO","email", false);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);
        service.sendMessage(json);
        return ResponseEntity.ok(json);
    }
}
