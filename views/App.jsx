import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/auth';
import Home from './components/Home';

function App() {
	return (
		<>
			<ToastContainer />
			<AuthProvider>
				<Home />
			</AuthProvider>
		</>
	);
}
export default App;