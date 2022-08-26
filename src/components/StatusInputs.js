import styled from 'styled-components';

const characterOrWeaponEntries = ['基础攻击', '攻击百分比', '暴击率', '暴击伤害', '伤害加成', '元素精通'];
const artifactEntries = ['攻击', '攻击百分比', '暴击率', '暴击伤害', '伤害加成', '元素精通', '元素反应提升'];
const simpleModeEntries = ['攻击力', '暴击率', '暴击伤害', '伤害加成', '元素精通', '元素反应提升'];
const modifierEntries = ['基础倍率', '独立乘区倍率', '额外伤害'];
const monsterEntries = ['抗性', '减抗', '角色等级', '怪物等级', '减防'];
const entriesMap = {
	character: characterOrWeaponEntries,
	weapon: characterOrWeaponEntries,
	artifact: artifactEntries,
	extra: artifactEntries,
	modifier: modifierEntries,
	monster: monsterEntries,
	simple: simpleModeEntries,
};

const StatusInputs = ({ type, values, setValues, computeDamage }) => {
	const updateStatus = (i, event) => {
		const newStatus = [...values];
		newStatus[i] = event.target.value;
		setValues(newStatus);
	};

	const entries = entriesMap[type];
	return (
		<>
			{entries.map((entry, i) => (
				<InputContainer key={i}>
					{entry}：
					<StyledInput
						value={values[i]}
						onChange={(event) => {
							updateStatus(i, event);
						}}
					/>
				</InputContainer>
			))}
		</>
	);
};

const InputContainer = styled.div`
	display: inline;
	margin-right: 10px;
`;

const StyledInput = styled.input`
	width: 50px;
`;

export default StatusInputs;
