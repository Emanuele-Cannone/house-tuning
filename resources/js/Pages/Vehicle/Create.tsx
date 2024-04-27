import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { FormEventHandler } from 'react'
import Drawer from '../Utils/Drawer'
import { PageProps } from '@/types'
import { useForm } from '@inertiajs/react'

function Create({ auth }: PageProps) {

    const {data, setData, post, hasErrors} = useForm({
        name: ''
    })

    const addVehicle: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data);
        
        post(route('vehicle.store'))

        console.log(hasErrors);
        
    }

    return (
        <AuthenticatedLayout
            user={auth.user}>
            <Drawer auth={auth} />

            <h2 className='text-4xl text-center font-bold'>Aggiungi Veicolo</h2>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className="m-auto card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Inserisci qui il nome del veicolo</h2>
                        <form onSubmit={addVehicle}>
                            <input name='name' value={data.name} type="text" placeholder="Veicolo" className="my-5 input input-bordered w-full max-w-xs"  
                                onChange={(e) => setData('name', e.target.value)}/>
                            <div className="card-actions justify-end">
                                <button type='submit' className="btn btn-primary">Salva</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Create
