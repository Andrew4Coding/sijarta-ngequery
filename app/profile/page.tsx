import { ProfilePageModule } from '@/modules/ProfilePageModule';
import { Suspense } from 'react';

const page = () => {
    return (
        <Suspense fallback={ <div>Loading ...</div>}>
            <ProfilePageModule />
        </Suspense>
    )
}

export default page;