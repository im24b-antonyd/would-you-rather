package dev.zwazel.springintro.images;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Controller
@RequestMapping("/api/images")
public class ImageController {
    @Value("${upload.directory}")
    private String uploadDir;

    //get Image
    @GetMapping("/")
    public String index (Model model){
        File folder = new File(uploadDir);
        File[] listOfFiles = folder.listFiles();
        model.addAttribute("files", listOfFiles);
        return "index";
    }

    @GetMapping("/upload")
    public String uploadForm() {
        return "upload";
    }

    // upload image
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  "redirect:/";
    }
}
