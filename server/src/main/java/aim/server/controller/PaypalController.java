package aim.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import aim.server.dto.Order;
import aim.server.service.PaypalService;

@RestController
@RequestMapping("/api/paypal")
public class PaypalController {

    @Autowired
    PaypalService service;
    public static final String BASE_URL = "http://localhost:8080/api/paypal";
    public static final String SUCCESS_URL = "/pay/success";
    public static final String CANCEL_URL = "/pay/cancel";

    @GetMapping("")
    public String index() {
        return "index";
    }

    @PostMapping("")
    public String payment(@RequestBody Order order) {
        try {
            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
                    order.getIntent(), order.getDescription(), BASE_URL + CANCEL_URL,
                    BASE_URL + SUCCESS_URL);

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    System.out.println(link.getHref());
                    return link.getHref();
                }
            }

        } catch (PayPalRESTException e) {
            System.out.println(e);
        }

        return "failed";
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "failed";
    }

    @GetMapping(value = SUCCESS_URL)
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                return "success";
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return "failed";
    }
}