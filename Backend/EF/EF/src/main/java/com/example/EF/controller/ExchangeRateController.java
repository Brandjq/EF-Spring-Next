/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.EF.controller;

import com.example.EF.service.ExchangeRateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/exchange-rate")
@CrossOrigin(origins = "*")
public class ExchangeRateController {
    
    private final ExchangeRateService service;
    
    public ExchangeRateController(ExchangeRateService service) {
        this.service = service;
    }
    
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentRate() {
        String rate = service.getCurrentExchangeRate();
        
        Map<String, Object> response = new HashMap<>();
        response.put("rate", rate);
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
}