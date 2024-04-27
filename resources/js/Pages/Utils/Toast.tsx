import { useEffect, useState } from "react"



function Toast({color, message, isToastVisible}: ToastProps) {

    const [toastVisible, setToastVisible] = useState(false);


return (
    isToastVisible &&  (
        <div className="toast toast-center">
            <div className={`alert alert-${color}`}>
                <span>{message}</span>
            </div>
        </div>
      )
)
 
}

export default Toast