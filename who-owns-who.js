const moneyTransfer = (
	people,
	moneyBalance
) => {
	const [payers, debtors] = people;
	const final = {};
	for (let i = 0; i < payers.length; i++) {
		const payer = payers[i];
		for (let j = 0; j < debtors.length; j++) {
			const debtor = debtors[j];
			const normalizedDebtorPayment = Number.parseFloat(moneyBalance[debtor].toFixed(2))
			const normalizedPayerPayment = Math.abs(Number.parseFloat(moneyBalance[payer].toFixed(2)))
			if (normalizedDebtorPayment === 0 || normalizedPayerPayment === 0) continue;
			if (normalizedDebtorPayment <= normalizedPayerPayment) {
				if (final[debtor]) final[debtor].push({ to: payer, sum: normalizedDebtorPayment })
				else final[debtor] = [{ to: payer, sum: normalizedDebtorPayment }]

				moneyBalance[debtor] = 0
				moneyBalance[payer] += normalizedDebtorPayment
			}
			else {
				if (final[debtor]) final[debtor].push({ to: payer, sum: normalizedPayerPayment })
				else final[debtor] = [{ to: payer, sum: normalizedPayerPayment }]
				moneyBalance[debtor] -= normalizedPayerPayment
				moneyBalance[payer] = 0
			}
		}
	}
	console.log({ moneyBalance });
	return final;
};

const whoOwnsWho = (payers, list) => {
	const result = {};
	const normalizedPayers = [[], []];
	for (let i = 0; i < Object.keys(list).length; i++) {
		const name = Object.keys(list)[i];
		if (!list[name].length) result[name] = 0;
		for (let j = 0; j < list[name].length; j++) {
			const { product, proportion } = list[name][j];
			const sum = product.quantity * proportion * product.price;
			if (result[name]) result[name] += sum;
			else result[name] = sum;
		}

		if (payers[name]) result[name] -= payers[name];

		if (result[name] < 0) normalizedPayers[0].push(name);
		else normalizedPayers[1].push(name);
	}

	console.log(result);

	return moneyTransfer(normalizedPayers, result);
};

module.exports = whoOwnsWho
