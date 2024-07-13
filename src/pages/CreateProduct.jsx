import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function CreateProduct() {

    const [error, setError] = useState({})

    let initialState = {
        name: "",
        price: "",
        description: "",
        category: [""],
        images: []
    }

    const [data, setData] = useState(initialState);

    const handleSubmit = ((e) => {
        setError({})
        e.preventDefault()

        let formData = new FormData()
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        data.category.forEach(cat => {
            formData.append("category", cat)
        })
        let temp = [...data.images]
        temp.forEach(img => {
            formData.append("image", img)

        })

        axios.post("https://ecommerce-sagartmg2.vercel.app/api/products", formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                toast.success("product created..")
                setData(initialState)
            }).catch(err => {
                console.log(err);
                if (err.response.status === 400) {
                    let errors = err.response.data.errors
                    let temp = {}

                    errors.forEach(validationError => {
                        temp[validationError.param] = validationError.msg
                    })
                    setError(temp)
                    toast.error("Bad Request. Check all form data ")
                } else {
                    toast.error("something went wrong")
                    }
            })
    })

    const addCategory = () => {
        let temp = [...data.category]
        temp.push("")
        setData({ ...data, category: temp })
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, })
        setError({...error, [e.target.name]: ""})
    }

    return (
        <div className='container mt-8'>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        onChange={handleChange}
                        name="name"
                        value={data.name}
                        className="form-control"
                        type="text"
                        placeholder="" />
                    <small className='text-red-500'>{error.name}</small>
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="price">
                        Price
                    </label>
                    <input
                        onChange={handleChange}
                        name="price"
                        value={data.price}
                        className="form-control"
                        type="number"
                        placeholder="" />
                    <small className='text-red-500'>{error.price}</small>
                </div>
                <div className="mb-4">
                    <label className="form-label capitalize" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        onChange={handleChange}
                        rows={6}
                        name="description"
                        value={data.description}
                        className="form-control"
                        placeholder="" />
                </div>
                <div className="mb-4">
                    <label className="form-label capitalize" htmlFor="category">
                        Category <button type='button' className='btn' onClick={addCategory}>Add category</button>
                    </label>
                    {
                        data.category.map((cat, index) => {
                            return <div className='flex mb-2'>
                                <input
                                    onChange={(e) => {
                                        let temp = [...data.category]
                                        temp[index] = e.target.value
                                        setData({ ...data, category: temp })
                                    }}
                                    value={cat}
                                    name="category"
                                    className="form-control"
                                    type="text"
                                    placeholder=""
                                />
                                <button onClick={() => {
                                    let temp = [...data.category]
                                    temp.splice(index, 1)
                                    setData({ ...data, category: temp })
                                }}
                                    type='button' className='btn ml-2 bg-red-400'>delete</button>
                            </div>
                        })
                    }
                </div>
                <div className="mb-4">
                    <label className="form-label capitalize" htmlFor="images">
                        Images
                    </label>
                    <input
                        onChange={(e) => {
                            setData({ ...data, images: e.target.files })
                        }}
                        name="images"
                        className="form-control"
                        type='file'
                        multiple
                        placeholder="" />
                </div>

                <div className="flex justify-center">
                    <button className="btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
