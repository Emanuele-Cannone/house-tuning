import { BASE_URL, SIDEBAR_VOICES } from '@/settings/settings'
import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'

function Drawer({auth}: PageProps) {

  return (
    <div className="drawer z-10">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <span className="material-symbols-outlined">menu</span>
        </label>
    </div>
    {/* Drawer */}
    <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu  p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="grid h-20 card bg-secondary rounded-box place-items-center">
                <p className='text-lg font-semibold'>{auth.user.name}</p>    
            </div> 
            <div className="divider"></div> 
            {/* MENU VOICES  */}

            {
                SIDEBAR_VOICES.map((voice, index) => {
                    return (
                        <li key={index} className="menu-item text-xl font-medium">
                            <details open={false}>
                                <summary>
                                    <Link className='text-lg cursor-pointer hover:font-semibold'href={BASE_URL + voice.link}>
                                    {voice.label}

                                    </Link>
                                </summary>
                                <ul>
                                    {
                                        voice.action.map((elem, index) =>(
                                            
                                            <li key={index} className="menu-item text-xl font-medium">
                                                <Link className='text-base cursor-pointer hover:font-semibold' href={BASE_URL + voice.link  + elem.link}>
                                                    {elem.label}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </details>
                        </li>
                    )
                })
            }
        </ul>
    </div>       
</div>
  )
}

export default Drawer
