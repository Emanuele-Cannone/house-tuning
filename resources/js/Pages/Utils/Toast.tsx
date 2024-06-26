
function Toast({isToastVisible, color, message}: any) {
    
    console.log(color);
    
    

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