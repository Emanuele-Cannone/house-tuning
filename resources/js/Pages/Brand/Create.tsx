import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { FormEventHandler, useState } from 'react'
import Drawer from '../Utils/Drawer'
import Toast from '../Utils/Toast'
import { useForm } from '@inertiajs/react'

function Create({auth, vehicles, brands}: any) {
    const [toast, setToast] = useState({
        isToastVisible: false,
        color: '',
        message: '',
    })

    const [isVehicleSelectVisible, setIsVehicleSelectVisible] = useState( false);
    const [oldVehilce, setOldVehicle] = useState('');


    const {data, setData, post} = useForm({
        veicolo: '1',
        brand: '',
        nome: ''
    })

    const addBrand: FormEventHandler = (e) => {
        e.preventDefault()
        // post(route('vehicle.store'))

        // e.preventDefault();
        // post(
        //     route('vehicle.store'), {
        //         onError: (response: any) => defineToastVisibility(response.name, setToast, "error") as any,
        //         onSuccess: (response: any) => {
        //             console.log(response);
                    
        //             defineToastVisibility(response.props.flash.message, setToast, "success") as any
        //         }
        //     });

        console.log(data);
        
    }


    return (
        <AuthenticatedLayout
            user={auth.user}>
            <Drawer auth={auth}/>

            <h2 className='text-4xl text-center font-bold'>Aggiungi Brand</h2>
            <div className='mt-10 w-full'>
                <div className="m-auto card xs:w-54 md:w-6/12 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Compila i campi qui sotto con le informazioni richieste</h2>
                        <form onSubmit={addBrand}>
                            <div className='my-5'>
                                <label>Seleziona veicolo</label>
                                <div className='flex flex-col lg:flex-row'>

                                    <select disabled={isVehicleSelectVisible}  onChange={(e) => setData('veicolo', e.target.value)} className="select select-bordered w-full">
                                        {
                                            vehicles.map((vehicle: any) => {
                                                return <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                                            })
                                        }
                                    </select>
                                    <button type='button' disabled={isVehicleSelectVisible} className="btn btn-secondary" onClick={() => {setIsVehicleSelectVisible(true); setOldVehicle(data.veicolo); setData('veicolo', '')}}>Aggiungi nuovo veicolo</button>

                                </div>
                                { 
                                  isVehicleSelectVisible &&  
                                  <div>

                                    <p className='mt-4 text-info'>Il veicolo sarà aggiunto assieme agli altri dati al click sul tasto "Salva"</p>

                                    <div className='flex items-center mb-5'>
                                        <input name='veicolo' value={data.veicolo} type="text" placeholder="Veicolo"
                                            className="input input-bordered w-full"
                                            onChange={(e) => setData('veicolo', e.target.value)}/>
                                        <button type='button' className="btn btn-error text-white" onClick={() =>{ setIsVehicleSelectVisible(false); setData('veicolo', oldVehilce)}}>
                                            <span className="material-symbols-outlined">
                                                close
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                }

                                <div className='mt-8 flex flex-col lg:flex-row'>
                                    <input name='brand' value={data.brand} type="text" placeholder="Brand"
                                                className="input input-bordered w-full my-2 lg:my-0"
                                                onChange={(e) => setData('brand', e.target.value)}/>

                                    <input name='nome' value={data.nome} type="text" placeholder="Nome"
                                    className="input input-bordered w-full my-2 lg:my-0"
                                    onChange={(e) => setData('nome', e.target.value)}/>

                                </div>
                               
                            </div>



                                 
                       
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
