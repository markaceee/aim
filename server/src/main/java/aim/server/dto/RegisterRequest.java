package aim.server.dto;

import java.time.LocalDate;

import aim.server.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String address;
    private String gender;
    private String email;
    private String password;
    private String skypeId;
    private byte[] picture;
    private String paymentMode;
    private String areasForImprovement;
    private Role role;
}
