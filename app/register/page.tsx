import { RegisterPage } from '@/modules/AuthPageModule/RegisterPage';
import { Suspense } from 'react';

const page = () => {
    return (
        <Suspense
            fallback={<div>Loading...</div>}
        >
            <RegisterPage />
        </Suspense>
    )
}

export default page;