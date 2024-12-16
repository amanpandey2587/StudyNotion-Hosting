import React from 'react'

// It is kind of a generic button to do a variety of stuff 
const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button
    className={`flex items-center 
    ${outline ? "border text-cyan-200 border-cyan-100 bg-transparent ":"bg-cyan-100" } 
    cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}!
    `}
    disabled={disabled}
    onClick={onClick}
    type={type}
    >
        {
            children ? (
                <>
                <span>
                    {text}
                </span>
                {children}
                </>
            ):(<div>
                {text}
            </div>)
        }
    </button>
  )
}

export default IconBtn