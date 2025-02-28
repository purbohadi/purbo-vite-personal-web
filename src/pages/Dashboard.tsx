// src/pages/Dashboard.tsx
import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import CardSection from "../components/dashboard/CardSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivityChart from "../components/dashboard/WeeklyActivityChart";
import ExpenseStatistics from "../components/dashboard/ExpenseStatistics";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import BalanceHistory from "../components/dashboard/BalanceHistory";
import { useDashboardData } from "../hooks/useDashboardData";
import Button from "../components/common/Button";
import Skeleton from "../components/common/Skeleton";
import { useNotificationContext } from "../components/providers/NotificationProvider";

const Dashboard: React.FC = () => {
  const {
    cards,
    transactions,
    expenseCategories,
    contacts,
    balanceHistory,
    weeklyActivity,
    isLoading,
    error,
    refetch,
  } = useDashboardData();

  const { addNotification } = useNotificationContext();

  // Show error notification if there's an error
  useEffect(() => {
    if (error) {
      addNotification("error", error);
    }
  }, [error, addNotification]);

  // Handle transfer completion
  const handleTransferComplete = (
    contactId: string,
    amount: number
  ): Promise<boolean> => {
    // Find the contact by ID
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return Promise.resolve(false);

    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        addNotification(
          "success",
          `Successfully transferred $${amount.toFixed(2)} to ${contact.name}`
        );
        resolve(true);
      }, 1000);
    });
  };

  if (isLoading && cards.length === 0) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton height="300px" className="rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton height="250px" className="rounded-xl" />
            <Skeleton height="250px" className="rounded-xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton height="250px" className="rounded-xl" />
            <Skeleton height="250px" className="rounded-xl" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {error && (
        <div className="mb-6">
          <Button onClick={refetch}>Refresh Data</Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <CardSection cards={cards} />

        <RecentTransactions transactions={transactions.slice(0, 5)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WeeklyActivityChart data={weeklyActivity} />
        <ExpenseStatistics categories={expenseCategories} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickTransfer
          contacts={contacts}
          onTransfer={handleTransferComplete}
        />
        <BalanceHistory data={balanceHistory} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
