import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {PageProps} from "@/types"
import Drawer from "../Utils/Drawer"
import {useEffect, useReducer, useState} from "react"
import { usePage } from "@inertiajs/react"
import ModalUpdate from "../Utils/ModalUpdateDelete"
import Toast from "../Utils/Toast"
import { defineToastVisibility } from "@/services/toastService"
import ModalUpdateDelete from "../Utils/ModalUpdateDelete"

interface VehicleProps {
    vehicles: any[],
    flash: any
}

type IndexProps = PageProps & VehicleProps & PropsErrors


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

function Index({vehicles, auth, flash}: Readonly<IndexProps>) {

  const [page, setPage] = useState(0);
  const [records, setRecords] = useState(vehicles);
  const [valueSearch, setValueSearch] = useState("");
  const [toast, setToast] = useState({
    isToastVisible: false,
    color: '',
    message: '',
})

    const [modal, dispatch] = useReducer(modalReducer, modalInitialState)

    const setValuesTable = () => setRecords(vehicles.filter((el: any, index: number) => index < page * 10 + 10 && index >= page * 10))

    useEffect(() => {
        setValuesTable();
    }, [page, vehicles]);

    useEffect(() => {
      console.log(flash);
      
      defineToastVisibility(flash.message, setToast, "success") as any
  }, [flash.message]);


    const onSearchVehicle = () => {
        if (valueSearch !== "") {
            setRecords(vehicles.filter((el: any) => el.name.toUpperCase() === valueSearch.toUpperCase()));
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

          {vehicles && <p className="text-end mt-10 pr-5 font-semibold">{vehicles.length} veicoli trovati</p>}
        </div>
        <div className="overflow-x-auto bg-white mt-2 max-h-96">
          <table className="table table-zebra table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-xl text-secondary">Nome</th>
                <th className="text-xl text-secondary">Azione</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((vehicle: any) => (
                  <tr key={vehicle.id}>
                    <td className="text-lg">{vehicle.id}</td>
                    <td className="text-lg">{vehicle.name}</td>
                    <td className="relative right-3">
                      <span onClick={() => openUpdateModal(vehicle)} className="material-symbols-outlined cursor-pointer ml-0 hover:bg-secondary rounded-full p-3 mx-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">edit</span>
                      <span onClick={() => openDeleteModal(vehicle)} className="material-symbols-outlined cursor-pointer hover:bg-error rounded-full p-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">delete</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="w-1/2 m-auto join grid grid-cols-2">
          <button className="join-item btn btn-outline btn-info" onClick={() => page > 0 && setPage(page - 1)}>Previous page</button>
          <button className="join-item btn btn-outline btn-success" onClick={() => page < vehicles.length / 10 - 1 && setPage(page + 1)}>Next</button>
        </div>
      </div>

      <ModalUpdateDelete modalId={modal.idModal} description={modal.description} title={modal.title} cancel={() => closeModal()} idVehicle={modal.idVehicle} setValuesTable={() => setValuesTable()}  isUpdate={modal.isUpdate}/>
    
      <Toast color={toast.color} message={toast.message} isToastVisible={toast.isToastVisible}/>

    </AuthenticatedLayout>

    )
}

export default Index
