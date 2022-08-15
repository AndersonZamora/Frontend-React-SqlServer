import Swal from 'sweetalert2';
export const progressBar = (value = '') => {
    Swal.fire({
        title: `${value}`,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
}
