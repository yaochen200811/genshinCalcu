import styled from 'styled-components';

const StatusInputs = ({ type, values, setValues, computeDamage }) => {
	const updateStatus = (id, event) => {
		let status = values.slice();
		status[id] = event.target.value;
		setValues(status);
		computeDamage();
	};

	if (type === 'character' || type === 'weapon') {
		return (
			<>
				<InputContainer>
					基础攻击：
					<StyledInput
						value={values[0]}
						onChange={(event) => {
							updateStatus(0, event);
						}}
					/>
				</InputContainer>
				<InputContainer>
					攻击百分比：
					<StyledInput
						value={values[1]}
						onChange={(event) => {
							updateStatus(1, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					暴击率：
					<StyledInput
						value={values[2]}
						onChange={(event) => {
							updateStatus(2, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					暴击伤害：
					<StyledInput
						value={values[3]}
						onChange={(event) => {
							updateStatus(3, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					伤害加成：
					<StyledInput
						value={values[4]}
						onChange={(event) => {
							updateStatus(4, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					元素精通：
					<StyledInput
						value={values[5]}
						onChange={(event) => {
							updateStatus(5, event);
						}}
					/>
				</InputContainer>
			</>
		);
	} else if (type === 'artifact' || type === 'extra') {
		return (
			<>
				<InputContainer>
					攻击：
					<StyledInput
						value={values[0]}
						onChange={(event) => {
							updateStatus(0, event);
						}}
					/>
				</InputContainer>
				<InputContainer>
					攻击百分比：
					<StyledInput
						value={values[1]}
						onChange={(event) => {
							updateStatus(1, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					暴击率：
					<StyledInput
						value={values[2]}
						onChange={(event) => {
							updateStatus(2, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					暴击伤害：
					<StyledInput
						value={values[3]}
						onChange={(event) => {
							updateStatus(3, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					伤害加成：
					<StyledInput
						value={values[4]}
						onChange={(event) => {
							updateStatus(4, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					元素精通：
					<StyledInput
						value={values[5]}
						onChange={(event) => {
							updateStatus(5, event);
						}}
					/>
				</InputContainer>
				<InputContainer>
					元素反应加成：
					<StyledInput
						value={values[6]}
						onChange={(event) => {
							updateStatus(6, event);
						}}
					/>
				</InputContainer>
			</>
		);
	} else if (type === 'modifier') {
		return (
			<>
				<InputContainer>
					基础倍率：
					<StyledInput
						value={values[0]}
						onChange={(event) => {
							updateStatus(0, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					倍率加成：
					<StyledInput
						value={values[1]}
						onChange={(event) => {
							updateStatus(1, event);
						}}
					/>
					%
				</InputContainer>
			</>
		);
	} else if (type === 'monster') {
		return (
			<>
				<InputContainer>
					抗性：
					<StyledInput
						value={values[0]}
						onChange={(event) => {
							updateStatus(0, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					减抗：
					<StyledInput
						value={values[1]}
						onChange={(event) => {
							updateStatus(1, event);
						}}
					/>
					%
				</InputContainer>
				<InputContainer>
					角色等级：
					<StyledInput
						value={values[2]}
						onChange={(event) => {
							updateStatus(2, event);
						}}
					/>
				</InputContainer>
				<InputContainer>
					怪物等级：
					<StyledInput
						value={values[3]}
						onChange={(event) => {
							updateStatus(3, event);
						}}
					/>
				</InputContainer>
				<InputContainer>
					减防：
					<StyledInput
						value={values[4]}
						onChange={(event) => {
							updateStatus(4, event);
						}}
					/>
					%
				</InputContainer>
			</>
		);
	}
};

const InputContainer = styled.div`
	display: inline;
	margin-right: 10px;
`;

const StyledInput = styled.input`
	width: 50px;
`;

export default StatusInputs;
