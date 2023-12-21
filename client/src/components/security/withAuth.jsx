import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            // Asegurarse de que el código se ejecute solo en el lado del cliente
            if (typeof window !== 'undefined' && !Cookies.get('AccessKey')) {
                router.push("/login");
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
