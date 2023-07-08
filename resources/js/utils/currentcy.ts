export function formatNZD(totalPrice: number): string {
    const formattedPrice = totalPrice.toLocaleString('en-NZ', {
        style: 'currency',
        currency: 'NZD',
        minimumFractionDigits: 2,
    });
    return formattedPrice;
}
