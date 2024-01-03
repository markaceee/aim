package aim.server.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.model.Balance;

import aim.server.dto.PayoutData;
import aim.server.dto.TransactionData;
import aim.server.model.Payout;
import aim.server.model.Transaction;
import jakarta.annotation.PostConstruct;

@Service
public class XenditService {

    @Value("${xendit.secret}")
    private String key;


    @PostConstruct
    public void init() {
        Xendit.Opt.setApiKey(key);
    }

    public Number getBalance() throws XenditException {
        Balance balance = Balance.get(Balance.AccountType.CASH);
        return balance.getBalance();
    }

    public String payout(PayoutData payoutData) throws XenditException {
        Payout.createPayout(payoutData);
        return "";
    }

    public TransactionData[] getTransactions(String lte, String gte) throws XenditException {
        Map<String, Object> params = new HashMap<>();
        params.put("currency", "PHP");
        params.put("created[gte]", gte);
        params.put("created[lte]", lte);

        return Transaction.getTransactions(params);

    }
}

// FOR TRANSACTION HISTORY
// https://api.xendit.co/transactions?currency=PHP