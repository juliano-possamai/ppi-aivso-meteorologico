import { Link } from "react-router-dom";

const NoMatch = () => {
	return (
		<>
		<h2 className="text-4xl text-red-500 font-bold mb-4">404</h2>
		<p>Desculpe, a página que você está procurando não foi encontrada.</p>
		<Link to="/" className="hover:underline mt-4 inline-block">Voltar para a página inicial</Link>
		</>
	);
};

export default NoMatch;
