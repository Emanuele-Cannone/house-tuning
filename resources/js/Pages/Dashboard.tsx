import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import Drawer from './Utils/Drawer';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        <Drawer auth={auth}/>

        </AuthenticatedLayout>
    );
}
