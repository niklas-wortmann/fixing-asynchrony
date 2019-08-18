package com.rxjslive.demo.controller;

import com.github.javafaker.Beer;
import com.github.javafaker.Faker;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocket {

    Faker faker = new Faker();

    @MessageMapping("/beer")
    @SendTo("/topic/messages")
    public Beer beer() throws Exception {
        Thread.sleep(1000); // simulated delay
        return this.faker.beer();
    }

}
