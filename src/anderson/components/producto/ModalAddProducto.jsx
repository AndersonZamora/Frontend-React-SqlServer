import { FormControl, Grid, TextField, Toolbar } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import { NumberFormatCustom } from '../../../helpers';
import { useFormProducto, useProductoSotre } from '../../../hooks';
import { validateProductoForm } from '../../../validator';

import './producto.css';
const fullscreen = true;

export const ModalAddProducto = ({ show }) => {

    const { setDesactiveProducto, startSavingProducto } = useProductoSotre();
    const [formValues, handleInputChange,] = useFormProducto();
    const { nombre, precio, stock, proveedor } = formValues;

    const handleCloseModal = () => {
        setDesactiveProducto();
    }

    const saveForm = () => {
        if (validateProductoForm(formValues)) {
            startSavingProducto(formValues);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleCloseModal}
            scrollable={fullscreen}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registrar Nuevo Producto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                        <Grid container >
                            <Grid item md={12} sx={{ p: 1 }} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        autoComplete="off"
                                        label="Nombre"
                                        name='nombre'
                                        value={nombre}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid container >
                            <Grid item md={12} sx={{ p: 1 }} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        autoComplete="off"
                                        label="Precio"
                                        name='precio'
                                        value={precio}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                        <Grid container >
                            <Grid item md={12} sx={{ p: 1 }} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        autoComplete="off"
                                        label="Proveedor"
                                        name='proveedor'
                                        value={proveedor}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item md={12} sx={{ p: 1 }} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        autoComplete="off"
                                        label="Stock"
                                        name='stock'
                                        value={stock}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveForm} variant="success" >Guardar</Button>
            </Modal.Footer>
        </Modal >
    )
}
