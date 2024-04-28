import React, { useEffect, useRef, useState } from 'react'

interface IModal {
    modalId: string;
    title: string;
    description: any;
    confirm: () => void;
    cancel: () => void;
}
function Modal({modalId, title, description, confirm, cancel}: Readonly<IModal>) {

  
  return (
   <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id={modalId} open={modalId !== ""}  className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {typeof description === "string" ? <p className="py-4">{description}</p> : description}
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-success text-white mx-3">Conferma</button>
            <button onClick={() => cancel()} className="btn btn-error text-white">Annulla</button>
        </form>
        </div>
    </div>
    </dialog>
   </>
  )
}

export default Modal
