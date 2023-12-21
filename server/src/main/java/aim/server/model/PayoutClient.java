package aim.server.model;

import java.util.Map;

import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.network.NetworkClient;
import com.xendit.network.RequestResource;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PayoutClient {
    private Xendit.Option opt;

    private NetworkClient requestClient;

    public Xendit.Option getOpt() {
        return opt;
    }

    public Payout createPayout(Map<String, String> headers, Map<String, Object> params) throws XenditException {
        return createPayoutRequest(headers, params);
    }

    private Payout createPayoutRequest(Map<String, String> headers, Map<String, Object> params)
            throws XenditException {
        String url = String.format("%s%s", opt.getXenditURL(), "/v2/payouts");
        return this.requestClient.request(
                RequestResource.Method.POST, url, headers, params, opt.getApiKey(), Payout.class);
    }
}

