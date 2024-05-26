import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { defineToastVisibility } from '@/services/toastService';
import React, { useEffect, useReducer, useState } from 'react'
import Drawer from '../Utils/Drawer';
import Toast from '../Utils/Toast';
import ModalUpdateDelete from '../Utils/ModalUpdateDelete';


const modalInitialState = {
    idModal: "",
    description: <input/>,
    title: "",
    confirmButton: () => null
}

function modalReducer(state: any, action: any) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        idModal: "updateModal",
        title: "Modifica veicolo " + action.payload.name,
        idVehicle: action.payload.id,
        isUpdate: true,
      };
      case "delete":
        return {
         ...state,
          idModal: "deleteModal",
          title: "Elimina veicolo " + action.payload.name,
          idVehicle: action.payload.id,
          isUpdate: false,
          description: "Sei sicuro di voler eliminare il veicolo " + action.payload.name,
        };
        case "close":
            return {
                ...state,
                idModal: "",
                description: null,
                title: "",
            };
    }
    return state;
}

function Index({brands, vehicles, auth, flash}: Readonly<any>) {
    console.log(vehicles);
    console.log(brands);
    
    
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState(brands);
    const [valueSearch, setValueSearch] = useState("");
    const [toast, setToast] = useState({
      isToastVisible: false,
      color: '',
      message: '',
  })
  
      const [modal, dispatch] = useReducer(modalReducer, modalInitialState)
  
      const setValuesTable = () => setRecords(brands.filter((el: any, index: number) => index < page * 10 + 10 && index >= page * 10))
  
      useEffect(() => {
          setValuesTable();
      }, [page, brands]);
  
      useEffect(() => {
        console.log(flash);
        
        defineToastVisibility(flash.message, setToast, "success") as any
    }, [flash.message]);
  
  
      const onSearchVehicle = () => {
          if (valueSearch !== "") {
              // setRecords(brands.filter((el: any) => el.name.toUpperCase() === valueSearch.toUpperCase() ||  el.brand.toUpperCase() === valueSearch.toUpperCase() || el.vehicle.name.toUpperCase() === valueSearch.toUpperCase()));
              setRecords(brands.filter((el: any) => el.name.toUpperCase().includes(valueSearch.toUpperCase()) ||  
              el.brand.toUpperCase().includes(valueSearch.toUpperCase()) || 
              el.vehicle.name.toUpperCase().includes(valueSearch.toUpperCase())));


            } else {
              setValuesTable();
          }
      };
  
      const onResetSearch = () => {
          setValueSearch("");
          setValuesTable();
      }
  
      const openUpdateModal = (vehicle: any) => {
          dispatch({type: 'update', payload: vehicle});
      };
  
      const openDeleteModal = (vehicle: any) => {
          dispatch({type: 'delete', payload: vehicle});
      };
  
    const closeModal = () => {
      dispatch({ type: 'close'});
    };
  
  
  
  
      return (
          <AuthenticatedLayout
              user={auth.user}
          >
              <Drawer auth={auth}/>
              <div className="w-11/12 m-auto">
          <div className="flex flex-wrap justify-between content-center">
            <div className="self-end flex">
              <label className="input w-80 input-bordered flex items-center gap-2">
                <input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} onKeyDown={(e) => e.key == 'Enter' && onSearchVehicle()} type="text" className="input focus:border-none grow w-full" placeholder="Search" />
                <span onClick={() => onSearchVehicle()} className="material-symbols-outlined cursor-pointer transition transform  hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
                  search
                </span>
              </label>
              {valueSearch !== "" && <button onClick={() => onResetSearch()} className="btn btn-square btn-error text-white"><span className="material-symbols-outlined">close</span></button>}
            </div>
  
            {brands && <p className="text-end mt-10 pr-5 font-semibold">{brands.length} veicoli trovati</p>}
          </div>
          <div className="overflow-x-auto bg-white mt-2 max-h-96">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className="text-xl text-secondary">Veicolo</th>
                  <th className="text-xl text-secondary">Brand</th>
                  <th className="text-xl text-secondary">Nome</th>
                  <th className="text-xl text-secondary">Azione</th>
                </tr>
              </thead>
              <tbody>
                {
                  records.map((brand: any) => (
                    <tr key={brand.id}>
                      <td className="text-lg">{brand.id}</td>
                      <td className="text-lg">{brand.vehicle.name}</td>
                      <td className="text-lg">{brand.brand}</td>
                      <td className="text-lg">{brand.name}</td>
                      <td className="relative right-3">
                        <span onClick={() => openUpdateModal(brand)} className="material-symbols-outlined cursor-pointer ml-0 hover:bg-secondary rounded-full p-3 mx-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">edit</span>
                        <span onClick={() => openDeleteModal(brand)} className="material-symbols-outlined cursor-pointer hover:bg-error rounded-full p-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">delete</span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="w-1/2 m-auto join grid grid-cols-2">
            <button className="join-item btn btn-outline btn-info" onClick={() => page > 0 && setPage(page - 1)}>Previous page</button>
            <button className="join-item btn btn-outline btn-success" onClick={() => page < brands.length / 10 - 1 && setPage(page + 1)}>Next</button>
          </div>
        </div>
  
        <ModalUpdateDelete modalId={modal.idModal} description={modal.description} title={modal.title} cancel={() => closeModal()} idVehicle={modal.idVehicle} setValuesTable={() => setValuesTable()}  isUpdate={modal.isUpdate}/>
      
        <Toast color={toast.color} message={toast.message} isToastVisible={toast.isToastVisible}/>
  
      </AuthenticatedLayout>
  
      )
  }

export default Index
