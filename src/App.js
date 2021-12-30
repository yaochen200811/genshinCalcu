import Calculator from './components/Calculator';

const App = () => {
	return (
		<>
			<div
				style={{
					textAlign: 'center',
					fontSize: '2em',
					margin: '1em',
				}}>
				原神伤害计算器
			</div>
			<Calculator />
		</>
	);
};

export default App;
