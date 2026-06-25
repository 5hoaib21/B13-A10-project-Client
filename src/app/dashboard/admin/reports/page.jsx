import { getReportsAction } from '@/lib/api/reports';
import React from 'react';
import AdminReportTable from './AdminReportTable';
const ReportedPromptPage = async () => {
    const initialReports = await getReportsAction();


    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-zinc-900">Reported Prompts</h1>
                <p className="text-sm text-zinc-500">Manage and review all prompts reported by users.</p>
            </div>
            
            <AdminReportTable initialReports={initialReports} />
        </div>
    );
};

export default ReportedPromptPage;