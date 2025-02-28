// src/components/common/Tabs.tsx
import * as React from "react";
import { ReactNode, useState } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsProps {
  children: ReactNode;
  defaultTab?: number;
  onChange?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultTab = 0,
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabsArray = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={className}>
      <div className="border-b">
        <div className="flex">
          {tabsArray.map((tab, index) => (
            <button
              key={index}
              className={`py-4 px-6 text-center border-b-2 ${
                activeTab === index
                  ? "border-black text-black"
                  : "border-transparent text-[#718EBF] hover:text-gray-700"
              } ${
                tab.props.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => !tab.props.disabled && handleTabChange(index)}
              aria-disabled={tab.props.disabled}
            >
              {tab.props.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">{tabsArray[activeTab]}</div>
    </div>
  );
};

export default Tabs;
