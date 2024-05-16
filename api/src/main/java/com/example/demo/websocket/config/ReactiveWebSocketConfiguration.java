package com.example.demo.websocket.config;

import com.example.demo.websocket.handlers.ReactiveWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.result.SimpleHandlerAdapter;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSocket
@Controller
public class ReactiveWebSocketConfiguration {

    @Autowired
    private ReactiveWebSocketHandler webSocketHandler;

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

    @Bean
    public SimpleHandlerAdapter simpleHandlerAdapter() {
        return new SimpleHandlerAdapter();
    }

    @Bean
    public SimpleUrlHandlerMapping webSocketMapping() {
        Map<String, WebSocketHandler> urlMap = new HashMap<>();
        urlMap.put("/websocket", webSocketHandler);

        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setUrlMap(urlMap);
        mapping.setOrder(1);
        return mapping;
    }


}
