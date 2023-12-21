package aim.server.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import aim.server.dto.LoginRequest;
import aim.server.dto.SampleData;
import aim.server.model.User;
import aim.server.model.UserAuthentication;
import aim.server.model.UserRequest;

@Mapper
public interface UserMapper {

        // Register Start
        @Insert({
                        "INSERT INTO users (skype_id, email, picture, payment_mode, areas_for_improvement, role)",
                        "VALUES(#{skypeId}, #{email}, #{picture}, #{paymentMode}, #{areasForImprovement}, 'STUDENT')"
        })

        @Options(useGeneratedKeys = true, keyProperty = "id")
        void insertUser(User user);

        @Insert({
                        "INSERT INTO user_details (user_id, first_name, middle_name, last_name, date_of_birth, address, gender)",
                        "VALUES(#{id}, #{firstName}, #{middleName}, #{lastName}, #{dateOfBirth}, #{address}, #{gender})"
        })
        void insertUserDetails(User user);

        @Insert("INSERT INTO user_authentication (user_id, password) VALUES(#{id}, #{password})")
        void insertUserAuthentication(UserAuthentication userAuthentication);
        // Register End

        @Select({
                        "SELECT u.*, ud.*, ua.*",
                        "FROM users u",
                        "LEFT JOIN user_details ud ON u.id = ud.user_id",
                        "LEFT JOIN user_authentication ua ON u.id = ua.user_id",
                        "WHERE u.email = #{email}"
        })
        User findByEmail(String email);

        @Select({
                        "SELECT u.*, ud.*, ua.*",
                        "FROM users u",
                        "LEFT JOIN user_details ud ON u.id = ud.user_id",
                        "LEFT JOIN user_authentication ua ON u.id = ua.user_id",
                        "WHERE u.id = #{id}"
        })
        User findById(Integer id);

        @Select({
                        "SELECT u.*, ud.*",
                        "FROM users u",
                        "LEFT JOIN user_details ud ON u.id = ud.user_id",
                        "WHERE (u.email = #{email} OR #{email} IS NULL) AND",
                        "(u.skype_id = #{skypeId} OR #{skypeId} IS NULL) AND",
                        "(u.picture = #{picture} OR #{picture} IS NULL) AND",
                        "(u.payment_mode = #{paymentMode} OR #{paymentMode} IS NULL) AND",
                        "(u.areas_for_improvement = #{areasForImprovement} OR #{areasForImprovement} IS NULL) AND",
                        "(ud.first_name = #{firstName} OR #{firstName} IS NULL) AND",
                        "(ud.middle_name = #{middleName} OR #{middleName} IS NULL) AND",
                        "(ud.last_name = #{lastName} OR #{lastName} IS NULL) AND",
                        "(ud.date_of_birth = #{dateOfBirth} OR #{dateOfBirth} IS NULL) AND",
                        "(ud.address = #{address} OR #{address} IS NULL) AND",
                        "(ud.gender = #{gender} OR #{gender} IS NULL)"
        })
        @Results({
                        @Result(property = "email", column = "email"),
                        @Result(property = "skypeId", column = "skype_id"),
                        @Result(property = "picture", column = "picture"),
                        @Result(property = "paymentMode", column = "payment_mode"),
                        @Result(property = "areasForImprovement", column = "areas_for_improvement"),
                        @Result(property = "firstName", column = "first_name"),
                        @Result(property = "middleName", column = "middle_name"),
                        @Result(property = "lastName", column = "last_name"),
                        @Result(property = "dateOfBirth", column = "date_of_birth"),
                        @Result(property = "address", column = "address"),
                        @Result(property = "gender", column = "gender")
        })
        List<UserRequest> findStudents(UserRequest user);

        @Select("SELECT * FROM sample_data_tbl ORDER BY id DESC LIMIT 1")
        SampleData getData();

        @Select({
                        "SELECT u.*, ud.*, ua.*",
                        "FROM users u",
                        "LEFT JOIN user_details ud ON u.id = ud.user_id",
                        "LEFT JOIN user_authentication ua ON u.id = ua.user_id"
        })
        @Results({
                        @Result(property = "email", column = "email"),
                        @Result(property = "skypeId", column = "skype_id"),
                        @Result(property = "picture", column = "picture"),
                        @Result(property = "paymentMode", column = "payment_mode"),
                        @Result(property = "areasForImprovement", column = "areas_for_improvement"),
                        @Result(property = "firstName", column = "first_name"),
                        @Result(property = "middleName", column = "middle_name"),
                        @Result(property = "lastName", column = "last_name"),
                        @Result(property = "dateOfBirth", column = "date_of_birth"),
                        @Result(property = "address", column = "address"),
                        @Result(property = "gender", column = "gender")
        })
        List<UserRequest> fetchAllUsers();

        @Insert({
                        "INSERT INTO user_registration (email, password, token, expiration)",
                        "VALUES(#{email}, #{password}, #{token}, #{expiration})"
        })
        void saveNonVerifiedUser(String email, String password, String token, Date expiration);

        @Select({
                        "SELECT *",
                        "FROM user_registration",
                        "WHERE token = #{token} AND expiration > NOW()"
        })
        LoginRequest checkToken(String token);

        @Delete({
                        "DELETE FROM user_registration",
                        "WHERE token = #{token}"
        })
        boolean deleteToken(String token);
}
