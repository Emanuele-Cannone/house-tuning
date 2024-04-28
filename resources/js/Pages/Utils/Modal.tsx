import { useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'

interface IModal {
    modalId: string;
    title: string;
    description: any;
    confirm: () => void;
    cancel: () => void;
    handleChangeValueForm: (e: any) => void;
}
function Modal({modalId, title, description, confirm, cancel, handleChangeValueForm}: Readonly<IModal>) {

    const {data, setData, post, errors} = useForm({
        name: ''
    })
{/* <form><input type="text" name="name"  placeholder="Veicolo" className="input input-bordered w-full max-w-xs mt-4" /></form> */}
    handleChangeValueForm = (e) => {
        setData({
           ...data,
            [e.target.name]: e.target.value
        })
    }
  
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
            <button onClick={() => confirm} className="btn btn-success text-white mx-3">Conferma</button>
            <button onClick={() => cancel()} className="btn btn-error text-white">Annulla</button>
        </form>
        </div>
    </div>
    </dialog>
   </>
  )
}

export default Modal
