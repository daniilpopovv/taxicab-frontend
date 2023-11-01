import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Order, OrderStatusType} from "../../types/Order";
import {formatDateTime} from "../../utils/formateDateTime";

enum statusFilterEnum {
  ALL = "Все",
  NEW = "Новый",
  CANCELLED = "Отменен"
}

const OrderIndex = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [statusFilter, setStatusFilter] = useState<statusFilterEnum>(statusFilterEnum.ALL);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const cancelOrder = async (uuid: string) => {
    await axios.put(`http://127.0.0.1:8000/api/orders/${uuid}/cancel`, {uuid: uuid});
    const updatedOrders = orders.map(order => (order.uuid === uuid ? {
      ...order,
      status: OrderStatusType.CANCELLED
    } : order));
    setOrders(updatedOrders);
  }

  useEffect(() => {
    const getOrders = async () => {
      const apiOrders = await axios.get('http://127.0.0.1:8000/api/orders')
      setOrders(apiOrders.data)
    };

    getOrders();
  }, [])

  return (
    <div className='mt-12'>
      <div className='flex justify-end m-2 p-2'>
        <Link to='/orders/new'
              className='px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>Новый заказ</Link>
      </div>
      <div className='flex justify-end m-2 p-2'>
        <button onClick={() => setStatusFilter(statusFilterEnum.ALL)}
                className={`px-4 py-2 mr-2 rounded-md ${statusFilter === statusFilterEnum.ALL ? "bg-indigo-500 text-white" : "text-gray-500"}`}>
          Все
        </button>
        <button onClick={() => setStatusFilter(statusFilterEnum.NEW)}
                className={`px-4 py-2 mr-2 rounded-md ${statusFilter === statusFilterEnum.NEW ? "bg-indigo-500 text-white" : "text-gray-500"}`}>
          Новый
        </button>
        <button onClick={() => setStatusFilter(statusFilterEnum.CANCELLED)}
                className={`px-4 py-2 mr-2 rounded-md ${statusFilter === statusFilterEnum.CANCELLED ? "bg-indigo-500 text-white" : "text-gray-500"}`}>
          Отменен
        </button>
      </div>
      <div className="flex justify-end m-2 p-2">
        <label htmlFor="start_date" className="mr-2">Начальное время:</label>
        <input id="start_date_time" type="datetime-local"
               onChange={e => setStartDate(e.target.value)}
               value={startDate ?? ""} className="rounded border-gray-300 mr-2"/>
        <label htmlFor="end_date" className="mr-2">Конечное время:</label>
        <input id="end_date_time" type="datetime-local"
               onChange={e => setEndDate(e.target.value)}
               value={endDate ?? ""} className="rounded border-gray-300"/>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Телефон
            </th>
            <th scope="col" className="px-6 py-3">
              Откуда
            </th>
            <th scope="col" className="px-6 py-3">
              Куда
            </th>
            <th scope="col" className="px-6 py-3">
              Статус
            </th>
            <th scope="col" className="px-6 py-3">
              Время заказа
            </th>
            <th scope="col" className="px-6 py-3">
              Действия
            </th>
          </tr>
          </thead>
          <tbody>
          {orders.filter(order => {
            if (statusFilter === statusFilterEnum.ALL && !startDate && !endDate) return true;
            if (statusFilter !== statusFilterEnum.ALL && order.status.toString() !== statusFilter.toString()) return false;
            const createdAt = new Date(order.created_at);
            if (startDate && createdAt < new Date(startDate)) return false;
            return !(endDate && createdAt > new Date(endDate));
          }).map((order) => (
            <tr key={order.uuid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.phone_number}
              </th>
              <td className="px-6 py-4">
                {order.from_address.formatted_address}
              </td>
              <td className="px-6 py-4">
                {order.to_address.formatted_address}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-green-500 mr-2 
                                        ${order.status === OrderStatusType.NEW ? "bg-green-500" :
                      order.status === OrderStatusType.CANCELLED ? "bg-red-500" : ""}`}></div>
                  {order.status}
                </div>
              </td>
              <td className="px-6 py-4">
                {formatDateTime(order.created_at)}
              </td>
              <td className="px-6 py-4">
                {order.status === OrderStatusType.NEW && (
                  <button onClick={() => cancelOrder(order.uuid)} className='text-white bg-red-700
                                        hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium
                                        rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600
                                        dark:hover:bg-red-700 dark:focus:ring-red-900'>Отменить</button>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderIndex;