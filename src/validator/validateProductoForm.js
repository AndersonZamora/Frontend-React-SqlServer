import validator from 'validator';
import { emptyFieldAlert } from '../alerts';

export const validateProductoForm = (values) => {

    const { nombre, precio, stock, proveedor } = values;

    if (validator.isEmpty(nombre)) {
        emptyFieldAlert('El nombre del producto es obligatorio');
        return false;
    }

    if (!validator.isAlpha(nombre, 'es-ES', { ignore: ' .-+0123456789' })) {
        emptyFieldAlert('El nombre  del producto es obligatorio');
        return false;
    }

    if (isNaN(precio)) {
        emptyFieldAlert('Solo ingrese números');
        return false;
    } else if (precio <= 0 || precio === '') {
        emptyFieldAlert('El precio debe ser mayor que cero');
        return false;
    }

    if (isNaN(stock)) {
        emptyFieldAlert('Solo ingrese números');
        return false;
    } else if (stock <= 0 || stock === '') {
        emptyFieldAlert('El stock debe ser mayor que cero');
        return false;
    }

    if (validator.isEmpty(proveedor)) {
        emptyFieldAlert('El proveedores obligatorio');
        return false;
    }

    if (!validator.isAlpha(proveedor, 'es-ES', { ignore: ' 0123456789' })) {
        emptyFieldAlert('El proveedor es obligatorio');
        return false;
    }

    return true;
}