import { useSelector } from "react-redux"

export default function Cart() {

    const cartItems = useSelector((reduxStore) => { return reduxStore.cart.cartItems })


    return (
        <div className='container'>
            <h2 className='text-3xl'>Cart</h2>
            <h2 className='text-2xl mt-2'>Items</h2>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="bg-white border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Product Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Quantity
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Price
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map(item => {

                                            return <tr class="bg-gray-100 border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.name}
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <span className="p-2 bg-secondary text-white">-</span> {item.quantity} <span className="p-2 bg-secondary text-white">+</span>

                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.price}

                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.price * item.quantity}

                                                </td>
                                            </tr>
                                        })
                                    }


                                </tbody>
                            </table>
                            <button className="btn mt-5">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
