import { requireRole } from "@/lib/core/session";
import ApplicationsPage from "./ApplicationsPage";

const ApplicationsServerPage = async () => {
    const founder = await requireRole('founder');
    return <ApplicationsPage founder={founder} />;
};
export default ApplicationsServerPage;



