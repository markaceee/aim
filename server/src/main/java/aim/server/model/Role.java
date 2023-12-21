package aim.server.model;

import static aim.server.model.Permission.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
        ADMIN(
                        Set.of(
                                        ADMIN_READ,
                                        ADMIN_UPDATE,
                                        ADMIN_DELETE,
                                        ADMIN_CREATE)),
        STUDENT(
                        Set.of(
                                        STUDENT_READ,
                                        STUDENT_UPDATE)),
        INSTRUCTOR(
                        Set.of(
                                        INSTRUCTOR_READ,
                                        INSTRUCTOR_CREATE))

        ;

        @Getter
        private final Set<Permission> permissions;

        public List<SimpleGrantedAuthority> getAuthorities() {
                var authorities = getPermissions()
                                .stream()
                                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                                .collect(Collectors.toList());
                authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
                return authorities;
        }

        //
        public void setPicture(byte[] fileBytes) {
        }
}