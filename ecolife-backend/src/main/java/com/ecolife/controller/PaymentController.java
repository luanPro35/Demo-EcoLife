package com.ecolife.controller;

import com.ecolife.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping("/momo")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> processMomoPayment(@RequestBody String paymentDetails) {
        // Placeholder for Momo payment processing logic
        System.out.println("Processing Momo payment: " + paymentDetails);
        return ResponseEntity.ok(ApiResponse.success("Momo payment processed successfully!"));
    }

    @PostMapping("/paypal")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> processPaypalPayment(@RequestBody String paymentDetails) {
        // Placeholder for Paypal payment processing logic
        System.out.println("Processing Paypal payment: " + paymentDetails);
        return ResponseEntity.ok(ApiResponse.success("Paypal payment processed successfully!"));
    }

    @PostMapping("/stripe")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> processStripePayment(@RequestBody String paymentDetails) {
        // Placeholder for Stripe payment processing logic
        System.out.println("Processing Stripe payment: " + paymentDetails);
        return ResponseEntity.ok(ApiResponse.success("Stripe payment processed successfully!"));
    }
}
