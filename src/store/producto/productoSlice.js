import { createSlice } from '@reduxjs/toolkit';

export const productoSlice = createSlice({
    name: 'producto',
    initialState: {
        productosCargando: true,
        productos: [],
        productoActivo: null,
        productoAccion: false,
        modalAdd: false,
        modalEdit: false,
    },
    reducers: {
        onSetActiveProducto: (state, { payload }) => {
            state.productoActivo = payload;
            state.modalAdd = true;
        },
        onSetActiveProductoLoad: (state, { payload }) => {
            state.productosCargando = false;
        },
        onSetDesactiveProducto: (state) => {
            state.productoActivo = null;
            state.modalAdd = false
        },
        onSetActiveProductoEdit: (state, { payload }) => {
            state.productoActivo = payload;
            state.modalEdit = true;
        },
        onSetDesactiveProductoEdit: (state) => {
            state.productoActivo = null;
            state.modalEdit = false
        },
        onAddNewProducto: (state, { payload }) => {
            state.productos.push(payload);
            state.modalAdd = false;
            state.productoActivo = null;
        },
        onUpdateProducto: (state, { payload }) => {
            state.productos = state.productos.map(producto => {
                if (producto.id === payload.id) {
                    return payload;
                }

                return producto;
            });

        },
        onDeleteProducto: (state) => {
            if (state.productoActivo) {
                state.productos = state.productos.filter(producto => producto.id !== state.productoActivo.id);
                state.productoActivo = null;
            }
        },
        onLoadProductos: (state, { payload = [] }) => {
            payload.forEach(producto => {
                const exists = state.productos.some(dbProducto => dbProducto.id === producto.id);
                if (!exists) {
                    state.productos.push(producto);
                }
            });
            state.productosCargando = false;
        },
        onLogoutProductos: (state) => {
            state.productosCargando = true;
            state.productos = [];
            state.productoActivo = null;
            state.productoAccion = false;
            state.modalAdd = false;
            state.modalEdit = false;
        },
    },
});

export const {
    onAddNewProducto,
    onDeleteProducto,
    onLoadProductos,
    onLogoutProductos,
    onSetActiveProducto,
    onSetActiveProductoEdit,
    onSetDesactiveProducto,
    onSetDesactiveProductoEdit,
    onUpdateProducto,
    onSetActiveProductoLoad,
} = productoSlice.actions;
