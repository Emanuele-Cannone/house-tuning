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
    <div className="flex justify-around content-center">
      {
        vehicles.map((vehicle: any) => (
          <div key={vehicle.id} className="py-8 px-16 bg-secondary-content shadow-lg rounded-lg cursor-pointer">
            <p className="text-2xl font-semibold">{vehicle.name}</p>
          </div>
        ))
      }
    </div>
    </AuthenticatedLayout>
   
  )
}

export default Index
