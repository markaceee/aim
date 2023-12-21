package aim.server.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayoutData {
    private String referenceId;
    private String channelCode;
    private Map<String, Object> channelProperties;
    private Number amount;
    private String description;
    private String currency;
    private Map<String, Object> receiptNotification;
}
