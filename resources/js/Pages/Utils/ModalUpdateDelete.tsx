import { defineToastVisibility } from '@/services/toastService';
import { useForm, usePage } from '@inertiajs/react';
import React, { ChangeEvent, useState } from 'react'
import Toast from './Toast';


function ModalUpdateDelete({modalId, title, idVehicle, isUpdate, description, cancel, setValuesTable}: Readonly<IModalUpdateDelete>) {

    const [toast, setToast] = useState({
        isToastVisible: false,
        color: '',
        message: '',
    })

    const {put, data, setData, delete: destroy} = useForm({
        name: "",
        id: idVehicle
    });


    const updateVehichle = () => {        
         put(route('vehicle.update', {id: idVehicle, name: data.name}), {
            onError: (response: any) => {                          
                defineToastVisibility(response.name, setToast, "error") as any;
                cancel();
            },
            onSuccess: (response: any) => {
                defineToastVisibility(response.props.flash.message, setToast, "success") as any;
                setValuesTable();
                setData("name", "");
                cancel();
            }
        });

    }

    const deleteVehicle = () => {
        destroy(route('vehicle.destroy', {id: idVehicle}), {
            onError: (response: any) => {
                defineToastVisibility(response, setToast, "error") as any;
                cancel();
            },
            onSuccess: () => {
                setValuesTable();
                cancel();
            }
        });
    }

  
  return (
   <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id={modalId} open={modalId !== ""}  className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        { isUpdate ?
             <form>
             <input type="text" value={data.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setData("name", e.target.value)} name="name" placeholder="Veicolo" className="input input-bordered w-full max-w-xs mt-4" />
         </form>
         :
         <p className="py-4">{description}</p>

        }
       
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={() => isUpdate ? updateVehichle() : deleteVehicle()} type='submit' className="btn btn-success text-white mx-3">Conferma</button>
            <button onClick={() => cancel()} className="btn btn-error text-white">Annulla</button>
        </form>
        </div>
    </div>
    </dialog>

    <Toast color={toast.color} message={toast.message} isToastVisible={toast.isToastVisible}/>

   </>
  )
}

export default ModalUpdateDelete
