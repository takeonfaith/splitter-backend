const moneyTransfer = (
	people,
	result
) => {
	const [payers, debtors] = people;
	console.log([payers, debtors]);
	const final = {};
	for (let i = 0; i < payers.length; i++) {
		const payer = payers[i];
		let tempSum = 0;
		for (let j = 0; j < debtors.length; j++) {
			const debtor = debtors[j];
			if (result[payer] === 0) continue;
			const normalized = Number.parseFloat((tempSum + result[debtor]).toFixed(3))
			const payerNormalized = Number.parseFloat(Math.abs(result[payer]).toFixed(3))
			if (normalized <= payerNormalized) {
				tempSum += result[debtor];
				console.log(final[debtor], tempSum);
				if (final[debtor])
					final[debtor].push({
						to: payer,
						sum: result[debtor]
					});
				else
					final[debtor] = [
						{
							to: payer,
							sum: result[debtor]
						}
					];
			} else {
				if (final[debtor])
					final[debtor].push({
						to: payer,
						sum: Math.abs(result[payer])
					});
				else
					final[debtor] = [
						{
							to: payer,
							sum: Math.abs(result[payer])
						}
					];
				result[debtor] -= Math.abs(result[payer]);
				result[payer] = 0;
			}
		}
	}
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
