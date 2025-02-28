// src/components/layout/ContentLayout.tsx
import { ReactNode, useState } from 'react';
import Header from './Header';

interface ContentLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  children, 
  title,
  actions
}) => {
  // Just a stub function since this layout doesn't have a sidebar
  const noOpFunction = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={noOpFunction} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || actions) && (
          <div className="flex justify-between items-center mb-6">
            {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
            {actions && <div>{actions}</div>}
          </div>
        )}
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ContentLayout;