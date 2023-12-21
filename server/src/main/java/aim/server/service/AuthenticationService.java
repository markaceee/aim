package aim.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import aim.server.config.JwtService;
import aim.server.dto.LoginRequest;
import aim.server.dto.RegisterRequest;
import aim.server.dto.Token;
import aim.server.mapper.UserMapper;
import aim.server.model.User;
import aim.server.model.UserAuthentication;
import aim.server.model.UserRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    UserMapper userMapper;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public Token authenticate(LoginRequest request) {
        try {
            System.out.println(request);
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));

            var user = userMapper.findByEmail(request.getEmail());
            var jwtToken = jwtService.generateToken(user);
            return Token
                    .builder()
                    .token(jwtToken)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String register(RegisterRequest request) {
        boolean registered = false;

        if (userMapper.findByEmail(request.getEmail()) == null) {
            var user = User
                    .builder()
                    .skypeId(request.getSkypeId())
                    .email(request.getEmail())
                    .picture(request.getPicture())
                    .paymentMode(request.getPaymentMode())
                    .areasForImprovement(request.getAreasForImprovement())
                    .role(request.getRole())
                    .build();
            userMapper.insertUser(user);

            var userDetails = User
                    .builder()
                    .id(user.getId())
                    .firstName(request.getFirstName())
                    .middleName(request.getMiddleName())
                    .lastName(request.getLastName())
                    .dateOfBirth(request.getDateOfBirth())
                    .address(request.getAddress())
                    .gender(request.getGender())
                    .build();
            userMapper.insertUserDetails(userDetails);

            var userAuth = UserAuthentication
                    .builder()
                    .id(user.getId())
                    .password(request.getPassword().length() >= 40 ? request.getPassword()
                            : passwordEncoder.encode(request.getPassword()))
                    .build();
            userMapper.insertUserAuthentication(userAuth);

            registered = true;
        }

        return registered ? "registered" : "false";
    }

    public List<UserRequest> search(UserRequest user) {
        return userMapper.findStudents(user);
    }

    public User searchUser(Integer user) {
        User userTest = userMapper.findById(user);
        System.out.println(userTest);
        return userTest;
    }

    public LoginRequest checkToken(String token) {
        return userMapper.checkToken(token);
    }

}