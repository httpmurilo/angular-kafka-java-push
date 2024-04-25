package com.example.demo.controler;

import com.example.demo.kafka.ProducerService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ProducerService service;

    @GetMapping
    public ResponseEntity<String> postUserToKafka() {
        User user = new User(1,"MURILO","email", false);
        return ResponseEntity.ok("");
    }







}
