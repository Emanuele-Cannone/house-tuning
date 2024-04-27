export const defineToastVisibility = (errors: any, setToast: any) => {
    if(errors.name !== null) {
        setToast({
            isToastVisible: true,
            color: 'error',
            message: errors.name
        })
        setTimeout(() => {
            setToast({
                isToastVisible: false,
                color: '',
                message: ''
            })
        }, 3000)
    }
}