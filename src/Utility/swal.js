import Swal from 'sweetalert2';

export let swalShow = (title, content, icon) => {
    Swal.fire({
        title: title,
        text: content,
        icon: icon
    });
}

let swalShowHtml = (title, html, icon) => {
    Swal.fire({
        title: title,
        html: html,
        icon: icon
    });
}

export let swalShowErrors = (title, errors) => {
    const formattedErrors = errors.join("<br/>");
    Swal.fire({
        title: title,
        html: formattedErrors,
        icon: "error"
    });
}

export let swalToast = (title, icon, timer = 5000) => {
    Swal.fire({
        title: title,
        icon: icon,
        toast: true,
        position: 'bottom-end',
        showCloseButton: true,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

export let swalConfirm = (title, text, icon) => {
    return new Promise(resolve => {
        Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
        }).then((result) => {
            resolve(result.isConfirmed);
        })
    });
}