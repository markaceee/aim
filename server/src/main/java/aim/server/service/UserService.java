package aim.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import aim.server.mapper.UserMapper;
import aim.server.model.UserRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public List<UserRequest> fetchAllUsers() {
        return userMapper.fetchAllUsers();
    }

    public boolean deleteToken(String token) {
        return userMapper.deleteToken(token);
    }
}
