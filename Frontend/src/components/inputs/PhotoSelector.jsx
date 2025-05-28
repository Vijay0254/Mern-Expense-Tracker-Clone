import { Trash2, Upload, User } from 'lucide-react'
import React from 'react'

const PhotoSelector = ({ profileImg, setprofileImg }) => {

    function removeProfileImg(){
        setTimeout(() =>{
            setprofileImg(null)
        }, 200)
    }

  return (
    <label htmlFor="profileImg">
        <div className='relative'>
            {profileImg ?
                <>
                    <img className='size-20 my-3 mb-4' src={URL.createObjectURL(profileImg)} alt="profileImg" /> 
                    <Trash2 onClick={removeProfileImg} className='cursor-pointer absolute rounded-full p-2 size-8 -right-1 -bottom-1 text-purple-200 bg-red-500' />
                </> :
                <>
                    <User className='rounded-full cursor-pointer bg-purple-200 p-5 size-20 text-primary' />
                    <Upload className='absolute cursor-pointer rounded-full p-2 size-8 -right-1 -bottom-1 text-purple-200 bg-primary' />
                </> 
            }
        </div>
        {!profileImg && <input onChange={(event) =>setprofileImg(event.target.files[0])} name='profileImg' id='profileImg' hidden type="file" />}
    </label>
  )
}

export default PhotoSelector