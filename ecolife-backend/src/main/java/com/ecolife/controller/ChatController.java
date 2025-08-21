package com.ecolife.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public String sendMessage(@Payload String chatMessage) {
        // In a real application, you would process the message, save it to a database, etc.
        System.out.println("Received message: " + chatMessage);
        return chatMessage; // Echo the message to all subscribers
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public String addUser(@Payload String username) {
        // In a real application, you would handle user joining, e.g., add to active users list
        System.out.println("User joined: " + username);
        return username + " joined the chat!";
    }
}
