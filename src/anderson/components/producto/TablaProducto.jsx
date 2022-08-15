import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Search } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { SearchIconWrapper, StyledInputBase, StyledTableCell } from '../../../theme';
import { TableCellProducto } from './TableCellProducto';
import { useProductoSotre } from '../../../hooks';
import { ViewTablaNavBarLayout } from '../../layout';
import { ModalAddProducto } from './ModalAddProducto';
import { productoModel } from '../../../models';
import { onLogout, onLogoutProductos } from '../../../store';

export const TablaProducto = () => {

  const { productos, setActiveProducto, modalAdd, productosCargando } = useProductoSotre();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [escuChar, setEscuchar] = useState(false);
  const [buscar, setBuscar] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleViewModal = () => {
    setActiveProducto(productoModel);
    setModalShow(true);
    setEscuchar(true);
  }

  useEffect(() => {
    if (escuChar && !modalAdd) {
      setModalShow(false);
    }
  }, [modalAdd]);

  const onSarchChange = ({ target }) => {
    setBuscar(target.value);
  }

  const filtrarProductos = () => {
    if (buscar.length === 0) return productos;
    const filtered = productos.filter(p => p.nombre.includes(buscar));
    return filtered;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    dispatch(onLogout());
    dispatch(onLogoutProductos());
    localStorage.clear();
  }

  return (
    <>
      <Paper
        sx={{ width: '100%' }}>
        <ViewTablaNavBarLayout title='Explorador de Productos'>
          <IconButton
            onClick={handleViewModal}
            size="large"
            edge="start"
            disabled={!!productosCargando}
            aria-label="open drawer"
            sx={{ mr: 2, color: '#13fa92' }}
          >
            <AddCircleOutlineIcon />
          </IconButton>

          <IconButton
            onClick={handleLogout}
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#d2020a' }}
          >
            <ExitToAppIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name='buscar'
              value={buscar}
              onChange={onSarchChange}
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </ViewTablaNavBarLayout>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Precio</StyledTableCell>
                <StyledTableCell>Stock</StyledTableCell>
                <StyledTableCell>Proveedor</StyledTableCell>
                <StyledTableCell>Estado</StyledTableCell>
                <StyledTableCell>Usuario</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                filtrarProductos()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableCellProducto
                      key={row.id}
                      {...row}
                    />
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={filtrarProductos().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {(modalShow) && (<ModalAddProducto show={modalShow} />)}
    </>
  )
}
