import { BsBellFill, BsHouse } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SideBarLogo from "./SideBarLogo"
import SideBarItem from "./SideBarItem"
import { BiLogOut } from "react-icons/bi"
import SideBarTweetButton from "./SideBarTweetButton"
import { useAppSelector } from "@/Redux/Store"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react"
import { setUser } from "@/Redux/Features/GetUser"
import toast from "react-hot-toast"

function SideBar() {
    const API = axios.create({ baseURL: "http://127.0.0.1:3005" })
    const dispatch = useDispatch()

    const { user } = useAppSelector((state) =>
        state.user
    )
    const getUser = async () => {
        try {
            const res = await API.post('/user/auth/getOneUser', {
                token: localStorage.getItem('token')
            })
            if (res.data.success) {
                dispatch(setUser(res.data.data))
            }
        } catch (error) {
            console.log();
        }
    }
    useEffect(() => {
        getUser()
    })

    const SideBar = [
        {
            lable: "Home",
            href: '/',
            icon: BsHouse
        },
        {
            lable: "Notification",
            href: '/notification',
            icon: BsBellFill,
            auth: true
        },
        {
            lable: "Profile",
            href: '/user/123',
            icon: FaUser,
            auth: true 
        }
    ]
    const LogOut = () => {
        localStorage.clear()
        location.reload()
        toast.success("Logout success")
    }
    return (
        <div className="lg:col-span-3 md:col-span-2 col-span-2 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-center">
                <div className="space-y-2 lg:w-[230px] ">
                    <SideBarLogo />
                    {
                        SideBar.map((item, ind) => (
                            <SideBarItem
                                key={ind}
                                href={item.href}
                                label={item.lable}
                                icon={item.icon}
                                auth={item.auth}
                            />
                        ))
                    }
                    {
                        user === null ? null : (
                            <SideBarItem onClick={() => LogOut()} href="" icon={BiLogOut} label="LogOut" />
                        )
                    }
                    <SideBarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default SideBar