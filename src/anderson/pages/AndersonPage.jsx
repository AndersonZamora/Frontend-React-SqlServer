import { useEffect } from 'react';
import { useProductoSotre } from '../../hooks/useProductoSotre';
import { AndersonLayout } from '../layout';
import { ProductoView } from '../view/ProductoView';

export const AndersonPage = () => {

    const { startLoadingProductos } = useProductoSotre();

    useEffect(() => {
        startLoadingProductos();
    }, []);

    return (
        <AndersonLayout>
            <ProductoView />
        </AndersonLayout>
    )
}
