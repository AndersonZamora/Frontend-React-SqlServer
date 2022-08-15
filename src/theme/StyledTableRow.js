import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#dedede'
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: '#16A085'
    }
}));
