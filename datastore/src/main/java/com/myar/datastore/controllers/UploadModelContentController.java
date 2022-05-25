package com.myar.datastore.controllers;

import com.myar.datastore.services.FileSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class UploadModelContentController {

    private final FileSaveService fileSaveService;

    @PostMapping
    @CrossOrigin
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return fileSaveService.saveFile(file);
    }

    @PostMapping("/image")
    @CrossOrigin
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return fileSaveService.saveImage(file);
    }

    @PostMapping("/model")
    @CrossOrigin
    public String uploadModel(@RequestParam("file") MultipartFile file) throws IOException {
        return fileSaveService.saveModel(file);
    }
}
