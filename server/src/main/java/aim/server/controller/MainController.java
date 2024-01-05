package aim.server.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xendit.exception.XenditException;

import aim.server.dto.LoginRequest;
import aim.server.dto.NonVerified;
import aim.server.dto.PayoutData;
import aim.server.dto.RegisterRequest;
import aim.server.dto.Token;
import aim.server.dto.TransactionData;
import aim.server.mapper.UserMapper;
import aim.server.model.Role;
import aim.server.model.User;
import aim.server.model.UserRequest;
import aim.server.service.AuthenticationService;
import aim.server.service.CsvExportService;
import aim.server.service.EmailService;
import aim.server.service.UserService;
import aim.server.service.XenditService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/aim")
@RequiredArgsConstructor
public class MainController {

    @Autowired
    private UserMapper userMapper;
    private final AuthenticationService authenticationService;
    private final CsvExportService csvExportService;
    private final XenditService xenditService;
    private final UserService userService;
    private final EmailService emailService;

    @PostMapping("/authenticate")
    public ResponseEntity<Token> authenticate(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/registerStudent")
    public ResponseEntity<String> registerStudent(
            @RequestPart("file") MultipartFile file,
            @RequestBody Role role) {
        try {
            if (file != null && !file.isEmpty()) {
                byte[] fileBytes = file.getBytes();
                role.setPicture(fileBytes);
            }
            return ResponseEntity.ok("Student registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering student: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserRequest>> fetchAllUsers() {
        return ResponseEntity.ok(userService.fetchAllUsers());
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserRequest>> search(@RequestBody UserRequest request) {
        return ResponseEntity.ok(authenticationService.search(request));
    }

    @GetMapping("/search")
    public ResponseEntity<User> searchUser(@RequestParam String id) {
        System.out.println(id);
        return ResponseEntity.ok(authenticationService.searchUser(Integer.parseInt(id)));
    }

    @PostMapping("/export-to-csv")
    public ResponseEntity<byte[]> toCsv(@RequestBody List<RegisterRequest> request) throws IOException {
        byte[] csvContent = csvExportService.exportToCsv(request);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "students.csv");
        return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    }

    @GetMapping("/get-data")
    public ResponseEntity<Object> getSampleData() {
        return ResponseEntity.ok(userMapper.getData());
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDirectory = "C:\\Users\\mortega\\Documents\\images\\";
            File destinationFile = new File(uploadDirectory + file.getOriginalFilename());

            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs(); // creates the directory including any necessary but nonexistent parent
                                    // directories
            }

            // Log the file path
            System.out.println("File path: " + destinationFile.getAbsolutePath());

            file.transferTo(destinationFile);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace(); // log the exception
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<Number> getBalance() throws XenditException {
        return ResponseEntity.ok(xenditService.getBalance());
    }

    @GetMapping("/transactions")
    public ResponseEntity<TransactionData[]> getTransactions(@RequestParam String gte, @RequestParam String lte)
            throws XenditException {
        return ResponseEntity.ok(xenditService.getTransactions(lte, gte));
    }

    @PostMapping("/payout")
    public ResponseEntity<String> postPayout(@RequestBody PayoutData payoutData) throws XenditException {
        xenditService.payout(payoutData);
        return ResponseEntity.ok("Sent");
    }

    @PostMapping("/non-verified-instructor")
    public ResponseEntity<String> nonVerified(@RequestBody NonVerified nonVerified) {
        if (nonVerified.getPassword().equals(nonVerified.getConfirmPassword())
                && userMapper.findByEmail(nonVerified.getEmail()) == null) {
            emailService.sendMail(nonVerified.getEmail(), nonVerified.getPassword());
        } else {
            return ResponseEntity.ok("email exist");
        }
        return ResponseEntity.ok(" ");
    }

    @GetMapping("/verified-email")
    public ResponseEntity<LoginRequest> verified(@RequestParam String token) {
        return ResponseEntity.ok(userMapper.checkToken(token));
    }

    @DeleteMapping("/delete-token")
    public ResponseEntity<Void> deleteToken(@RequestParam String token) {
        boolean tokenDeleted = userService.deleteToken(token);

        if (tokenDeleted) {
            return ResponseEntity.ok().build(); // Return 200 OK if token deletion was successful
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}