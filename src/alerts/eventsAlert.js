import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';

export const eventsAlert = (title = '', value = '', Type = 'success') => {
    swalWithBootstrapButtons.fire(
        `${title}`,
        `${value}`,
        `${Type}`,
    );
}
