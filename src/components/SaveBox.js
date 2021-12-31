import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

const SaveBox = ({ type, values, setValues }) => {
	const [name, setName] = useState('');
	const [names, setNames] = useState([]);

	const getModels = useCallback(() => {
		const modelJSON = localStorage.getItem('models');
		const models = modelJSON ? JSON.parse(modelJSON) : {};
		models[type] = models[type] ?? {};
		return models;
	}, [type]);

	useEffect(() => {
		const models = getModels();
		setNames(Object.keys(models[type]));
	}, [getModels, type]);

	const saveModel = () => {
		if (name === '') {
			return;
		}
		const models = getModels();
		models[type][name] = values;
		localStorage.setItem('models', JSON.stringify(models));
		setNames(Object.keys(models[type]));
	};

	const loadModel = () => {
		const models = getModels();
		if (models[type][name]) {
			setValues(models[type][name]);
		}
	};

	const deleteModel = () => {
		const models = getModels();
		delete models[type][name];
		localStorage.setItem('models', JSON.stringify(models));
		setNames(Object.keys(models[type]));
		setName('');
	};

	return (
		<>
			<StyledInput
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
				type="text"
				list={`models${type}`}
			/>
			<datalist id={`models${type}`}>
				{names.map((name, i) => {
					return <option value={name} key={i} />;
				})}
			</datalist>
			<StyledButton onClick={saveModel} style={{ background: '#3ba4ed' }}>
				保存
			</StyledButton>
			<StyledButton onClick={loadModel} style={{ background: '#3ced57' }}>
				读取
			</StyledButton>
			<StyledButton onClick={deleteModel} style={{ background: '#ec1a1b' }}>
				删除
			</StyledButton>
		</>
	);
};

const StyledInput = styled.input`
	width: 100px;
	margin-left: 20px;
`;

const StyledButton = styled.button`
	margin-left: 10px;
`;

export default SaveBox;
