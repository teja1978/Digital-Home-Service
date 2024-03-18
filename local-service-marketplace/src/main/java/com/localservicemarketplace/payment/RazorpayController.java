package com.localservicemarketplace.payment;

import java.math.BigInteger;

import org.json.JSONObject;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payment-gateway")
@PreAuthorize("hasAuthority('app-market-place-user')")
public class RazorpayController {
	// Initialize the Razorpay client and set the secret credentials
	private RazorpayClient client;
	private static final String SECRET_ID1 = "rzp_test_1QccXeTMW68TUq";
	private static final String SECRET_KEY1 = "YjAK3XrkpPQqXPM75qHcjSde";

	// Define a POST endpoint for creating an order
	@RequestMapping(path = "/createOrder", method = RequestMethod.POST)
	public OrderResponse createOrder(@RequestBody OrderRequest orderRequest) {
		// Initialize the response object
		OrderResponse response = new OrderResponse();
		try {
			// Create a Razorpay client with the provided secret credentials
			client = new RazorpayClient(SECRET_ID1, SECRET_KEY1);

			// Create a Razorpay order with the specified amount
			Order order = createRazorPayOrder(orderRequest.getAmount());

			// Extract the order ID from the created order
			String orderId = (String) order.get("id");

			// Set response properties
			response.setRazorpayOrderId(orderId);
			response.setApplicationFee("" + orderRequest.getAmount());
			response.setSecretKey(SECRET_KEY1);
			response.setSecretId(SECRET_ID1);
			response.setPgName("razor1");

			return response;
		} catch (RazorpayException e) {
			// Handle RazorpayException by printing the stack trace
			e.printStackTrace();
		}

		return response;
	}


	// Helper method to create a Razorpay order
	private Order createRazorPayOrder(BigInteger amount) throws RazorpayException {
		// Create a JSON object to configure the order options
		JSONObject options = new JSONObject();
		options.put("amount", amount.multiply(BigInteger.valueOf(100))); // Amount should be in paise (multiply by 100 for rupees)
		options.put("currency", "INR");
		options.put("receipt", "txn_123456"); // Unique receipt ID for the transaction

		// Create a JSON object for payment configuration
		JSONObject payment = new JSONObject();
		payment.put("capture", "automatic"); // Automatically capture the payment

		// Create a JSON object for capture options
		JSONObject captureOptions = new JSONObject();
		captureOptions.put("refund_speed", "optimum"); // Set refund speed to 'optimum'
		payment.put("capture_options", captureOptions); // Assign capture options to the payment

		options.put("payment", payment); // Assign payment configuration to the options

		// Create a Razorpay order with the specified options
		return client.orders.create(options);
	}
}