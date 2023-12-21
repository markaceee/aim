package aim.server.model;

import java.util.Map;

import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.network.NetworkClient;
import com.xendit.network.RequestResource;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class TransactionClient {

    private Xendit.Option opt;

    private NetworkClient requestClient;

    public Xendit.Option getOpt() {
        return opt;
    }

    public Transaction getTransactions(Map<String, String> headers, Map<String, Object> params) throws XenditException {

        StringBuilder parameters = new StringBuilder();
        String[] paramList = new String[] {
                "currency",
                "created[gte]",
                "created[lte]"
        };
        for (String key : paramList) {
            if (params.containsKey(key))
                parameters.append(String.format("%s%s%s%s", "&", key, "=", params.get(key)));
        }

        String url = String.format("%s%s%s", Xendit.Opt.getXenditURL(), "/transactions?", parameters.toString());

        return this.requestClient.request(
                RequestResource.Method.GET, url, headers, null, opt.getApiKey(), Transaction.class);
    }

}