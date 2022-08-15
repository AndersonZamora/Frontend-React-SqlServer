import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { eventsAlert, progressBar, savedAlert } from '../alerts';
import { andersonApi } from '../api';
import { onAddNewProducto, onDeleteProducto, onLoadProductos, onSetActiveProducto, onSetActiveProductoEdit, onSetActiveProductoLoad, onSetDesactiveProducto, onSetDesactiveProductoEdit, onUpdateProducto } from '../store';

export const useProductoSotre = () => {

    const dispatch = useDispatch();

    const { productos, productoActivo, modalAdd, modalEdit, productosCargando } = useSelector(state => state.producto);

    const setActiveProducto = (producto) => {
        dispatch(onSetActiveProducto(producto));
    }

    const setDesactiveProducto = () => {
        dispatch(onSetDesactiveProducto());
    }

    const setActiveProductoEdit = (producto) => {
        dispatch(onSetActiveProductoEdit(producto));
    }

    const setDesactiveProductoEdit = () => {
        dispatch(onSetDesactiveProductoEdit());
    }

    const startSavingProducto = async (producto) => {
        try {
            progressBar('Guardando...');
            //TODO: llegar al backend
            const { data } = await andersonApi.post('/producto', producto);
            Swal.close();
            dispatch(onAddNewProducto({ ...data.productoGuardado }));
            savedAlert(`El proveedor ${producto.nombre}, ha sido guardado.`);
        } catch (error) {
            Swal.close();
            eventsAlert('', 'Ocurrió un error al momento de guardar', 'error');
        }
    }

    const startUpdateProducto = async (producto) => {
        try {
            progressBar('Actualizando...');
            const { data } = await andersonApi.put('/producto', producto);
            dispatch(onUpdateProducto({ ...data.productoActualizado }));
            dispatch(onSetDesactiveProductoEdit());
            eventsAlert('', 'Producto actualizado', 'success');
        } catch (error) {
            Swal.close();
            eventsAlert('', 'Ocurrió un error al momento de actualizar', 'error');
        }
    }

    const startDeletingProducto = async () => {
        try {
            progressBar('Eliminando...');
            await andersonApi.delete(`/producto?Id=${productoActivo.id}`);
            dispatch(onDeleteProducto());
            dispatch(onSetDesactiveProductoEdit());
            eventsAlert('', 'Producto eliminado', 'success');

        } catch (error) {
            Swal.close();
            eventsAlert('', 'Ocurrió un error al momento de actualizar', 'error');
        }
    }

    const startLoadingProductos = async () => {
        try {
            const { data } = await andersonApi.get('/producto/usuario');
            dispatch(onLoadProductos(data.productos));
        } catch (error) {
            if (error.response.data !== undefined) {
                if(error.response.data.msg === 'sin productos'){
                    dispatch(onSetActiveProductoLoad());
                }
            }
        }
    }

    return {
        //* Propiedades
        modalAdd,
        modalEdit,
        productoActivo,
        productos,
        productosCargando,

        //* Metodos
        setActiveProducto,
        setActiveProductoEdit,
        setDesactiveProducto,
        setDesactiveProductoEdit,
        startDeletingProducto,
        startLoadingProductos,
        startSavingProducto,
        startUpdateProducto,
    }
}
