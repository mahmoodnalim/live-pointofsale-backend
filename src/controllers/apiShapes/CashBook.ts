export function CashbookShape(cashBook: any) {
  return {
    id: cashBook && cashBook.id,
    refNo: cashBook && cashBook.refNo,
    description: cashBook && cashBook.description,
    type: cashBook && cashBook.type,
    amount: cashBook && cashBook.amount,
    date: cashBook && cashBook.createdAt,
  };
}
