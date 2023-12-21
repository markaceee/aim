package aim.server.dto;

import com.google.gson.annotations.SerializedName;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
// @JsonInclude(JsonInclude.Include.ALWAYS)
public class TransactionData {

    @SerializedName("id")
    private String id;

    @SerializedName("product_id")
    private String productId;

    @SerializedName("type")
    private String type;

    @SerializedName("status")
    private String status;

    @SerializedName("channel_category")
    private String channelType;

    @SerializedName("channel_code")
    private String channelCode;

    @SerializedName("reference_id")
    private String referenceId;

    @SerializedName("account_identifier")
    private String accountIdentifier;

    @SerializedName("currency")
    private String currency;

    @SerializedName("amount")
    private Double amount;

    @SerializedName("net_amount")
    private Double netAmount;

    @SerializedName("cashflow")
    private String cashFlow;

    @SerializedName("business_id")
    private String businessId;

    @SerializedName("created")
    private String created;

    @SerializedName("updated")
    private String updated;

    @SerializedName("estimated_settlement_time")
    private String estimatedSettlementTime;

    @SerializedName("settlement_status")
    private String settlementStatus;

    @SerializedName("fee")
    private Fee fee;

}
