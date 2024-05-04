export const defineToastVisibility = (response: any, setToast: any, color: string) => {
    console.log(color);
    
    if(response !== null ) {
        setToast({
            isToastVisible: true,
            color: color,
            message: response
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