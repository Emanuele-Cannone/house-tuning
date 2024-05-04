import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, {FormEventHandler, useState} from 'react'
import Drawer from '../Utils/Drawer'
import {useForm, usePage} from '@inertiajs/react'
import {PageProps} from '@/types'
import Toast from '../Utils/Toast'
import {defineToastVisibility} from '@/services/toastService'


function Create({auth}: PageProps & PropsErrors) {

    const [toast, setToast] = useState({
        isToastVisible: false,
        color: '',
        message: '',
    })


    const {data, setData, post} = useForm({
        name: ''
    })

    const addVehicle: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('vehicle.store'))

        e.preventDefault();
        post(
            route('vehicle.store'), {
                onError: (response: any) => defineToastVisibility(response.name, setToast, "error") as any,
                onSuccess: (response: any) => {
                    console.log(response);
                    
                    defineToastVisibility(response.props.flash.message, setToast, "success") as any
                }
            });
    }


    return (
        <AuthenticatedLayout
            user={auth.user}>
            <Drawer auth={auth}/>

            <h2 className='text-4xl text-center font-bold'>Aggiungi Veicolo</h2>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
                <div className="m-auto card xs:w-54 sm:w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Inserisci qui il nome del veicolo</h2>
                        <form onSubmit={addVehicle}>
                            <input name='name' value={data.name} type="text" placeholder="Veicolo"
                                   className="my-5 input input-bordered w-full max-w-xs"
                                   onChange={(e) => setData('name', e.target.value)}/>
                            <div className="card-actions justify-end">
                                <button type='submit' className="btn btn-primary">Salva</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <Toast color={toast.color} message={toast.message} isToastVisible={toast.isToastVisible}/>

        </AuthenticatedLayout>
    )
}

export default Create
