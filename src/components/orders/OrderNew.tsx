import React, {useState} from 'react';
import axios from 'axios';

const OrderNew = () => {
    const [formValues, setFormValues] = useState({
        phoneNumber: '',
        from_address: '',
        from_address_description: '',
        to_address: '',
        to_address_description: '',
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            phone_number: formValues.phoneNumber,
            from_address: {
                formatted_address: formValues.from_address,
                description: formValues.from_address_description
            },
            to_address: {
                formatted_address: formValues.to_address,
                description: formValues.to_address_description
            }
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/order', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mt-12'>
            <form action="" onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-md'>
                <div className='space-y-6'>
                    <div className='mb-4'>
                        <label htmlFor="phoneNumber" className='block mb-2 text-sm font-medium'>Номер телефона</label>
                        <input name='phoneNumber' defaultValue={formValues.phoneNumber} onChange={onChange}
                               className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'
                               type="tel"/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="from_address" className='block mb-2 text-sm font-medium'>Откуда</label>
                        <input name='from_address' defaultValue={formValues.from_address} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'
                               type="text"/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="from_address_description" className='block mb-2 text-sm font-medium'>Дополнительные комментарии к адресу</label>
                        <input name='from_address_description' defaultValue={formValues.from_address_description} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'
                               type="text"/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="to_address" className='block mb-2 text-sm font-medium'>Куда</label>
                        <input name='to_address' defaultValue={formValues.to_address} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'
                               type="text"/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="to_address_description" className='block mb-2 text-sm font-medium'>Дополнительные комментарии к адресу</label>
                        <input name='to_address_description' defaultValue={formValues.to_address_description} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'
                               type="text"/>
                    </div>
                </div>
                <div className='my-4'>
                    <button className='px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>Store</button>
                </div>
            </form>
        </div>
    );
};

export default OrderNew;