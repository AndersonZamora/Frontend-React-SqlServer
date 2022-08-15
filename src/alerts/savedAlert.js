import Swal from 'sweetalert2';
export const savedAlert = (value = '') => {
    Swal.fire({
        icon: 'success',
        title: `${value}`,
        showConfirmButton: false,
        timer: 1700
    })
}
