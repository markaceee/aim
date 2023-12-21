package aim.server.model;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.annotations.SerializedName;
import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.model.AbstractResponseHeaders;

import aim.server.dto.TransactionData;

public class Transaction extends AbstractResponseHeaders {

    @SerializedName("data")
    private TransactionData[] data;

    private static TransactionClient transactionClient;

    public static TransactionData[] getTransactions(Map<String, Object> params) throws XenditException {
        return getTransactions(new HashMap<>(), params);
    }

    public static TransactionData[] getTransactions(Map<String, String> headers, Map<String, Object> params)
            throws XenditException {
        TransactionClient client = getClient();
        return client.getTransactions(headers, params).data;
    }

    private static TransactionClient getClient() {
        if (isApiKeyExist()) {
            if (transactionClient == null
                    || !transactionClient.getOpt().getApiKey().trim().equals(Xendit.apiKey.trim())) {
                return transactionClient = new TransactionClient(Xendit.Opt.setApiKey(Xendit.apiKey),
                        Xendit.getRequestClient());
            }
        } else {
            if (transactionClient == null
                    || !transactionClient.getOpt().getApiKey().trim().equals(Xendit.Opt.getApiKey().trim())) {
                return transactionClient = new TransactionClient(Xendit.Opt, Xendit.getRequestClient());
            }
        }
        return transactionClient;
    }

    private static boolean isApiKeyExist() {
        return Xendit.apiKey != null;
    }

}
