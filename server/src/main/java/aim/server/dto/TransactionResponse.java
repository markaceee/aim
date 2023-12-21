package aim.server.dto;

import com.google.gson.annotations.SerializedName;
import com.xendit.model.AbstractResponseHeaders;

public class TransactionResponse extends AbstractResponseHeaders {
    @SerializedName("has_more")
    private boolean hasMore;

    @SerializedName("data")
    private TransactionData[] data;

    @SerializedName("links")
    private Links[] links;
}
