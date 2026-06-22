import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <div className="flex-1">
                {children}
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default DashboardLayout;