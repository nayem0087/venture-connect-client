
import { requireRole } from "@/lib/core/session";
import CreateOpportunitiesPage from "./CreateOpportunities";


const CreateOpportunitiesServerPage = async () => {
    const founder = await requireRole('founder');
    return <CreateOpportunitiesPage founder={founder} />;
};

export default CreateOpportunitiesServerPage;

