import { requireRole } from "@/lib/core/session";


const FounderLayout = async ({children}) => {
    await requireRole('founder');
    return children;
};

export default FounderLayout;