import { requireRole } from '@/lib/core/session';


const CollaboratorLayout = async ({children}) => {
    await requireRole('collaborator');
        return children;
    };


export default CollaboratorLayout;