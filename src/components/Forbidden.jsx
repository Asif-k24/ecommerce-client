import React from 'react'
import ForbiddenImage from "../assets/images/403.svg"

export default function Forbidden() {
    return (    
        <div className="container flex justify-center items-center h-screen">
            <img src={ForbiddenImage} className="object-cover h-96 mb-8" alt="" />
        </div>
    )
}