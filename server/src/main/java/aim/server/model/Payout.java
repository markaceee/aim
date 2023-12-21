package aim.server.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.model.AbstractResponseHeaders;

import aim.server.dto.PayoutData;

public class Payout extends AbstractResponseHeaders {

    private static PayoutClient payoutClient;

    public static Payout createPayout(
            PayoutData payoutData) throws XenditException {
        Map<String, Object> params = new HashMap<>();

        params.put("reference_id", payoutData.getReferenceId());
        params.put("channel_code", payoutData.getChannelCode());
        params.put("channel_properties", payoutData.getChannelProperties());
        params.put("amount", payoutData.getAmount());
        params.put("description", payoutData.getDescription());
        params.put("currency", payoutData.getCurrency());
        params.put("receipt_notification", payoutData.getReceiptNotification());

        return createPayout(params);
    }

    public static Payout createPayout(Map<String, Object> params) throws XenditException {
        Map<String, String> headers = new HashMap<>();
        headers.put("Idempotency-key", new Date(System.currentTimeMillis()).toString());

        return createPayout(headers, params);
    }

    public static Payout createPayout(Map<String, String> headers, Map<String, Object> params) throws XenditException {
        return createPayoutRequest(headers, params);
    }

    public static Payout createPayoutRequest(Map<String, String> headers, Map<String, Object> params)
            throws XenditException {
        PayoutClient client = getClient();
        return client.createPayout(headers, params);
    }

    private static PayoutClient getClient() {
        if (isApiKeyExist()) {
            if (payoutClient == null
                    || !payoutClient.getOpt().getApiKey().trim().equals(Xendit.apiKey.trim())) {
                return payoutClient = new PayoutClient(Xendit.Opt.setApiKey(Xendit.apiKey),
                        Xendit.getRequestClient());
            }
        } else {
            if (payoutClient == null
                    || !payoutClient.getOpt().getApiKey().trim().equals(Xendit.Opt.getApiKey().trim())) {
                return payoutClient = new PayoutClient(Xendit.Opt, Xendit.getRequestClient());
            }
        }
        return payoutClient;
    }

    private static boolean isApiKeyExist() {
        return Xendit.apiKey != null;
    }
}
