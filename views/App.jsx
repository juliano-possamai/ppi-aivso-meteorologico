import WarningList from './components/WarningsList';
import WarningForm from './components/WarningForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoMatch from './components/NoMatch';

function App() {
	return (
		<>
			<ToastContainer />
			<div className="flex flex-col justify-center items-center">
				<nav className="bg-blue-500 py-3 w-full">
					<div className="container mx-auto">
						<span className="text-white text-2xl font-bold">Cadastro de avisos meteorológicos</span>
					</div>
				</nav>
				<div className="max-w-screen-2xl w-2/5 mt-20">
					<BrowserRouter>
						<Routes>
							<Route index element={<Navigate to="/warnings" replace />} />
							<Route path="/warnings" element={<WarningList />} />
							<Route path="/warnings/create" element={<WarningForm />} />
							<Route path="/warnings/update/:id" element={<WarningForm />} />
							<Route path="/warnings/read/:id" element={<WarningForm readOnly />} />
							<Route path="*" element={<NoMatch />} />
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		</>
	);
}
export default App;