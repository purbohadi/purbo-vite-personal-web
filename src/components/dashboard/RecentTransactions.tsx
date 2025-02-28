import { TransactionSummary } from "../../types";
import { formatCurrency } from "../../utils/formatters";

import PaypalIcon from "../../assets/icons/paypal.svg";
import WithdrawalIcon from "../../assets/icons/withdrawal.svg";
import CreditIcon from "../../assets/icons/credit.svg";

interface RecentTransactionsProps {
  transactions: TransactionSummary[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const getTransactionIconCategory = (type: string) => {
    switch (type) {
      case "paypal":
        return <img src={PaypalIcon} alt={type} width={55} height={55} />;
      case "withdrawal":
        return <img src={WithdrawalIcon} alt={type} width={55} height={55} />;
      case "credit":
        return <img src={CreditIcon} alt={type} width={55} height={55} />;
      default:
        return <img src={CreditIcon} alt={type} width={55} height={55} />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary-title">
          Recent Transaction
        </h3>
      </div>
      <div className="bg-white h-[235px] w-full rounded-3xl shadow p-5">
        <div className="space-y-4 max-h-48 overflow-y-auto py-1">
          {transactions.map((transaction) => {
            // Use formatter utils to display amount with correct format
            const formattedAmount =
              transaction.type !== "withdrawal"
                ? formatCurrency(transaction.amount)
                : formatCurrency(-transaction.amount);

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between max-h-12"
              >
                <div className="flex items-center">
                  {getTransactionIconCategory(transaction.type)}
                  <div className="ml-4 max-h-11 my-1">
                    <p className="font-medium text-gray-800 text-base">
                      {transaction.description}
                    </p>
                    <p className="text-gray-500 text-[15px]">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-medium text-base ${
                    transaction.type !== "withdrawal"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formattedAmount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
