package com.localservicemarketplace.payment;

import java.math.BigInteger;

public class OrderRequest {

	BigInteger amount;

	public BigInteger getAmount() {
		return amount;
	}

	public void setAmount(BigInteger amount) {
		this.amount = amount;
	}

}