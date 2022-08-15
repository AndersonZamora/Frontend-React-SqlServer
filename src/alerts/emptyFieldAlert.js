import Swal from 'sweetalert2';

export const emptyFieldAlert = (value, foo = '') => {
    Swal.fire({
        icon: 'error',
        text: `${value}`,
        footer: `${foo}`
    });
}
