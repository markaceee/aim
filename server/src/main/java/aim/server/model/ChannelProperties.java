package aim.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChannelProperties {
    @JsonProperty("account_number")
    private String accountNumber;

    @JsonProperty("account_holder_name")
    private String accountHolderName;

}
