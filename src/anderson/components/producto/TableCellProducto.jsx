import { useEffect, useState } from 'react';
import { ccyFormat } from '../../../helpers';
import { useProductoSotre } from '../../../hooks';
import { StyledTableCell, StyledTableRow } from '../../../theme';
import { ModalEditProducto } from './ModalEditProducto';

export const TableCellProducto = (product) => {

    const { setActiveProductoEdit, modalEdit } = useProductoSotre();
    const [modalShowEdit, setModalShowEdit] = useState(false);
    const [escuChar, setEscuchar] = useState(false);

    const activarProducto = () => {
        setActiveProductoEdit(product);
        setModalShowEdit(true);
        setEscuchar(true);
    }

    useEffect(() => {
        if (escuChar && !modalEdit) {
            setModalShowEdit(false);
        }
    }, [modalEdit]);

    return (
        <>
            <StyledTableRow onClick={activarProducto}>
                <StyledTableCell component="th" scope="row">{product.nombre}</StyledTableCell>
                <StyledTableCell>{`S/${ccyFormat(product.precio)}`}</StyledTableCell>
                <StyledTableCell>{product.stock}</StyledTableCell>
                <StyledTableCell>{product.proveedor}</StyledTableCell>
                <StyledTableCell>{product.estado}</StyledTableCell>
                <StyledTableCell>{product.usuario}</StyledTableCell>
            </StyledTableRow>
            {
                (modalShowEdit)
                && (<ModalEditProducto
                    show={modalShowEdit}
                    onHide={() => setModalShowEdit(false)} />)
            }
        </>
    )
}
