import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))
  // if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {/* <img
          src={user?.image}
          alt={`profile-${user?.username}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        /> */}
        <div className="aspect-square w-[30px] rounded-full object-cover border"></div>
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] overflow-hidden section_bg rounded-md shadow-lg dark:bg-slate-800 dark:text-slate-400 text-pure-greys-600"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm hover:text-sky-500">
              <VscDashboard className="text-lg text-sky-500" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm hover:text-sky-500"
          >
            <VscSignOut className="text-lg text-sky-500" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}