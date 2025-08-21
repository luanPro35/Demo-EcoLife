package com.ecolife.controller;

import com.ecolife.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @PostMapping("/upload")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please select a file to upload."));
        }
        try {
            // Placeholder for file storage logic
            String fileName = file.getOriginalFilename();
            // Save the file to a designated location
            // For example: Files.copy(file.getInputStream(), Paths.get("uploads", fileName));
            System.out.println("File uploaded successfully: " + fileName);
            return ResponseEntity.ok(ApiResponse.success("File uploaded successfully: " + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to upload file: " + e.getMessage()));
        }
    }

    @GetMapping("/download/{fileName}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> downloadFile(@PathVariable String fileName) {
        // Placeholder for file download logic
        // In a real application, you would return a Resource (e.g., ByteArrayResource)
        // and set appropriate headers for file download.
        System.out.println("Attempting to download file: " + fileName);
        return ResponseEntity.ok(ApiResponse.success("File download initiated for: " + fileName));
    }
}
