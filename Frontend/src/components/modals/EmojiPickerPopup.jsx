import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { Image, X } from 'lucide-react'

const EmojiPickerPopup = ({ icon, onSelect }) => {

    const [isOpen, setisOpen] = useState(false)

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div className='flex items-center gap-4 cursor-pointer' onClick={() =>setisOpen(true)}>
            <div className='size-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                {icon ? 
                    <img src={icon} alt="Icon" className='size-12' /> :
                    <Image />
                }
            </div>
            <p>{icon ? "Change Icon" : "Pick Icon"}</p>
        </div>
        {isOpen && 
            <div>
                <button className='size-7 flex items-center justify-center bg-white border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={() =>setisOpen(false)}><X /></button>
                <EmojiPicker open={isOpen} onEmojiClick={(emoji) =>onSelect(emoji?.imageUrl || "")} />
            </div>
        }
    </div>
  )
}

export default EmojiPickerPopup