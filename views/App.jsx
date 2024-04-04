import WarningList from './components/WarningsList';
import WarningForm from './components/WarningForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoMatch from './components/NoMatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

function App() {
	return (
		<>
			<ToastContainer />
			<div className="flex flex-col justify-center items-center">
				<nav className="bg-indigo-800 p-4 w-full shadow-lg">
					<div className="container mx-auto flex justify-between items-center">
						<span className="text-white text-2xl font-bold">Avisos meteorológicos</span>
						<FontAwesomeIcon className="Header-icon text-white" icon={faCloudShowersHeavy} />
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