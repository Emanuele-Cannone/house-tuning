import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import Drawer from "../Utils/Drawer"
import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"


interface VehicleProps { vehicles: any[] }
type IndexProps = PageProps & VehicleProps & PropsErrors

function Index({ vehicles, auth }: Readonly<IndexProps>) {

  const [page, setPage] = useState(0);
  const [records, setRecords] = useState(vehicles);

  useEffect(() => {
    setRecords(vehicles.filter((el: any, index: number) => index < page * 10 + 10 && index >= page * 10))
  }, [page]);
  

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Drawer auth={auth} />
      {vehicles && <p className="text-end mt-16 pr-20 font-semibold">{vehicles.length} Trovati veicoli</p>}
      <div className="overflow-x-auto bg-white mt-2 max-h-96 w-11/12 m-auto">
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
                <td>
                  <span className="material-symbols-outlined cursor-pointer hover:bg-secondary rounded-full p-3 mx-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">edit</span>
                  <span className="material-symbols-outlined cursor-pointer hover:bg-error rounded-full p-3 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">delete</span>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
      <div className="w-1/2 m-auto join grid grid-cols-2">
        <button className="join-item btn btn-outline btn-info" onClick={() => page > 0 && setPage(page - 1)}>Previous page</button>
        <button className="join-item btn btn-outline btn-success" onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </AuthenticatedLayout>



  )
}

export default Index
