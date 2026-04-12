import React from 'react'

function MessageBox({ message, sentByCurrentUser, name, time }) {
    return (
        <div className={`w-full h-fit mb-1 flex ${sentByCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className={`h-fit max-w-350px ${sentByCurrentUser
                ? "bg-blue-200 border border-gray-500" : "border border-gray-500"} px-2 py-3 rounded-xl`}>
                <p className="text-[13px] text-gray-400">{name}</p>
                <p className="text-[16px]">{message}</p>
                <p className="text-[11px] text-gray-400">{time}</p>
            </div>
        </div>
    )
}

export default MessageBox
