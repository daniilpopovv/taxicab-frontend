import { Routes, Route, Link } from "react-router-dom";

import OrderIndex from "./components/orders/OrderIndex";
import OrderNew from "./components/orders/OrderNew";

function App() {
    return (
        <div className="bg-slate-200">
            <div className='max-w-7xl mx-auto min-h-screen'>
                <nav>
                    <ul className='flex'>
                        <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
                            <Link to='/orders'>Заказы</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/orders' element={<OrderIndex />} />
                    <Route path='/orders/new' element={<OrderNew />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
