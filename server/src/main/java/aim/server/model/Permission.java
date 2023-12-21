package aim.server.model;

public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),

    STUDENT_READ("student:read"),
    STUDENT_UPDATE("student:update"),

    INSTRUCTOR_READ("instructor:read"),
    INSTRUCTOR_CREATE("instructor:create");

    private final String permission;

    private Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
