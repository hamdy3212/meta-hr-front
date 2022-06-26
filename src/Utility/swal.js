import Swal from 'sweetalert2';

export let swalShow = (title, content, icon) => {
    Swal.fire({
        title: title,
        text: content,
        icon: icon,
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