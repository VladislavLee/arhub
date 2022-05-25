package com.myar.datastore.services;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileSaveService {

    @Value("${file.save.path}")
    private String filePath;

    public String saveFile(MultipartFile uploadFile) throws IOException {
        return saveFile(uploadFile, Strings.EMPTY);
    }

    public String saveImage(MultipartFile uploadFile) throws IOException {
        return saveFile(uploadFile, ".jpg");
    }

    public String saveModel(MultipartFile uploadFile) throws IOException {
        return saveFile(uploadFile, ".glb");
    }

    private String saveFile(MultipartFile uploadFile, String fileType) throws IOException {
        String id = UUID.randomUUID().toString().substring(0, 5) + fileType;

        final String destination = filePath + id;
        final File file = new File(destination);
        uploadFile.transferTo(file);
        return id;
    }
}
