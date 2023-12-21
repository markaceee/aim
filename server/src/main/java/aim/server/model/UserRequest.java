package aim.server.model;

import java.time.LocalDate;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private Integer id;
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
    