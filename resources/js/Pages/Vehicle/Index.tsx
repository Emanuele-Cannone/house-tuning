import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import Drawer from "../Utils/Drawer"


interface VehicleProps {vehicles: any}
type IndexProps = PageProps & VehicleProps

function Index({vehicles, auth}: Readonly<IndexProps>) {
  return (
    <AuthenticatedLayout
    user={auth.user}
>
    <Drawer auth={auth}/>
    <div className="w-full flex flex-col justify-center content-center">
      {
        vehicles.map((vehicle: any) => (
          <div key={vehicle.id} className="w-1/4 m-auto my-5 py-8 px-16 bg-secondary-content shadow-lg rounded-lg cursor-pointer">
            <p className="text-2xl text-center font-semibold">{vehicle.name}</p>
          </div>
        ))
      }
    </div>
    
    </AuthenticatedLayout>
   
  )
}

export default Index
