package aim.server.dto;

import com.google.gson.annotations.SerializedName;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
// @JsonInclude(JsonInclude.Include.ALWAYS)
public class Fee {
    @SerializedName("xendit_fee")
    private String xenditFee;

    @SerializedName("value_added_tax")
    private String valueAddedTax;

    @SerializedName("xendit_withholding_tax")
    private String xenditWithHoldingTax;

    @SerializedName("third_party_withholding_tax")
    private String thirdPartyWithHoldingTax;

    @SerializedName("status")
    private String status;
}
