package aim.server.service;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aim.server.dto.RegisterRequest;
import aim.server.mapper.UserMapper;

@Service
public class CsvExportService {

    @Autowired
    UserMapper userMapper;

    public byte[] exportToCsv(List<RegisterRequest> request) {
        try (
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                CSVPrinter csvPrinter = new CSVPrinter(new OutputStreamWriter(outputStream), CSVFormat.DEFAULT)) {

            csvPrinter.printRecord("Full name", "Date of Birth", "Address", "Gender",
                    "Email", "Skype ID", "Picture",
                    "Payment mode", "Areas for improvement", "Role");

            for (RegisterRequest user : request) {
                String fullName = user.getFirstName() + " " + user.getMiddleName() + " " +
                        user.getLastName();
                csvPrinter.printRecord(fullName, user.getDateOfBirth(), user.getAddress(),
                        user.getGender(),
                        user.getEmail(), user.getSkypeId(), user.getPicture(), user.getPaymentMode(),
                        user.getAreasForImprovement(), user.getRole());
            }

            csvPrinter.flush();
            return outputStream.toByteArray();

        } catch (IOException e) {
            System.out.println(e);
            return new byte[0]; // Return empty byte array on error
        }
    }

}