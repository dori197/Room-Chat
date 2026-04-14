import React from 'react'

function MessageBox({ message, sentByCurrentUser, name, time }) {
    return (
        <div className={`w-full h-fit mb-1 flex ${sentByCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className={`h-fit max-w-350px px-3 py-2 rounded-2xl ${sentByCurrentUser
                    ? "bg-[#83e8ff] text-black" 
                    : "bg-white border border-gray-300 text-black" 
                }`}>
                {!sentByCurrentUser && (
                    <p className="text-[12px] text-gray-500 font-semibold mb-1">{name}</p>
                )}
                <p className="text-[15px]">{message}</p>
                <p className={`text-[11px] text-gray-500 mt-1 ${sentByCurrentUser ? "text-right" : "text-left"}`}>
                    {time}
                </p>
            </div>
        </div>
    )
}

export default MessageBox