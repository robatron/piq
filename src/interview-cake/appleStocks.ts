export const getMaxProfit = (stockPrices: number[]): number => {
    let maxProfit;

    stockPrices.forEach((curStockPrice, t) => {
        let maxPotentialProfit;

        for (let i = t + 1; i < stockPrices.length; i++) {
            const potentialProfit = stockPrices[i] - curStockPrice;

            if (
                maxPotentialProfit === undefined ||
                potentialProfit > maxPotentialProfit
            ) {
                maxPotentialProfit = potentialProfit;
            }
        }

        if (maxProfit === undefined || maxPotentialProfit > maxProfit) {
            maxProfit = maxPotentialProfit;
        }
    });

    return maxProfit;
};
