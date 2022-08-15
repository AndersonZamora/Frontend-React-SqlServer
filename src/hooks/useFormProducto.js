import { useEffect, useState } from 'react';
import { useProductoSotre } from './useProductoSotre';
import { productoModel } from './../models'

export const useFormProducto = () => {

    const { productoActivo } = useProductoSotre();
    const [formValues, setFormValues] = useState(productoModel);

    useEffect(() => {
        if (productoActivo !== null) {
            setFormValues({ ...productoActivo });
        }
    }, [productoActivo]);


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    return [formValues, handleInputChange,];
}