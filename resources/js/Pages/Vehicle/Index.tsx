import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import Drawer from "../Utils/Drawer"
import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"


interface VehicleProps {vehicles: any}
type IndexProps = PageProps & VehicleProps & PropsErrors

function Index({vehicles, auth}: Readonly<IndexProps>) {

  return (
    <AuthenticatedLayout
    user={auth.user}
>
    <Drawer auth={auth}/>
    <div className="w-full flex basis-1/4 flex-col flex-wrap justify-around content-center  md:grid md:grid-cols-3 lg:grid-cols-4  md:gap-4">
      {
        vehicles.map((vehicle: any) => (
          <div key={vehicle.id} className="m-auto md:mx-3 my-5 py-8 px-16 bg-secondary-content shadow-lg rounded-lg cursor-pointer">
            <p className="text-2xl text-center font-semibold">{vehicle.name}</p>
          </div>
        ))
      }
    </div>

    </AuthenticatedLayout>

    
   
  )
}

export default Index
