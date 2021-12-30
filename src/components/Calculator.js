import { useState, useEffect } from 'react';
import styled from 'styled-components';

import SaveBox from './SaveBox';
import StatusInputs from './StatusInputs';
import { BASE_TRANSFORMATIVE_DAMAGE } from './Consts';

import YoimiyaBack from '../image/YoimiyaBack.png';
import ChongyunBack from '../image/ChongyunBack.png';
import KazuhaBack from '../image/KazuhaBack.png';
import SakuraBack from '../image/SakuraBack.png';
import SayuBack from '../image/SayuBack.png';
import AyakaBack from '../image/AyakaBack.png';
import DionaBack from '../image/DionaBack.png';
import SucroseBack from '../image/SucroseBack.png';

const Calculator = () => {
	const [results, setResults] = useState({
		damage: 0,
		critDamage: 0,
		expDamage: 0,
		x15damage: 0,
		x15critDamage: 0,
		x15expDamage: 0,
		x2damage: 0,
		x2critDamage: 0,
		x2expDamage: 0,
		overloadedDamage: 0,
		shatteredDamage: 0,
		chargedDamage: 0,
		superconductDamage: 0,
		swirlDamage: 0,
		shieldValue: 0,
	});
	const [cNames, setCNames] = useState([]);
	const [wNames, setWNames] = useState([]);
	const [aNames, setANames] = useState([]);
	const [eNames, setENames] = useState([]);
	const [cValues, setCValues] = useState([0, 0, 5, 50, 0, 0]);
	const [wValues, setWValues] = useState([0, 0, 0, 0, 0, 0]);
	const [aValues, setAValues] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [eValues, setEValues] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [modifierValues, setModifierValues] = useState([100, 100]);
	const [monsterValues, setMonsterValues] = useState([10, 0, 90, 90, 0]);

	const computeDamage = () => {
		const cAtk = parseFloat(cValues[0]);
		const cAtkP = parseFloat(cValues[1]);
		const cCrit = parseFloat(cValues[2]);
		const cCritD = parseFloat(cValues[3]);
		const cDamage = parseFloat(cValues[4]);
		const wAtk = parseFloat(wValues[0]);
		const wAtkP = parseFloat(wValues[1]);
		const wCrit = parseFloat(wValues[2]);
		const wCritD = parseFloat(wValues[3]);
		const wDamage = parseFloat(wValues[4]);
		const aAtk = parseFloat(aValues[0]);
		const aAtkP = parseFloat(aValues[1]);
		const aCrit = parseFloat(aValues[2]);
		const aCritD = parseFloat(aValues[3]);
		const aDamage = parseFloat(aValues[4]);
		const eAtk = parseFloat(eValues[0]);
		const eAtkP = parseFloat(eValues[1]);
		const eCrit = parseFloat(eValues[2]);
		const eCritD = parseFloat(eValues[3]);
		const eDamage = parseFloat(eValues[4]);
		const skillRate = parseFloat(modifierValues[0]) / 100;
		const skillRateModifier = parseFloat(modifierValues[1]) / 100;
		const resist = parseFloat(monsterValues[0]) - parseFloat(monsterValues[1]);
		const cLevel = parseInt(monsterValues[2]);
		const eLevel = parseInt(monsterValues[3]);
		const elementalMastery =
			parseFloat(cValues[5]) + parseFloat(wValues[5]) + parseFloat(aValues[5]) + parseFloat(eValues[5]);
		const elementBoost = parseFloat(aValues[6]);

		const totalAtk = (cAtk + wAtk) * (1 + (cAtkP + wAtkP + aAtkP + eAtkP) / 100) + aAtk + eAtk;
		const totalCrit = Math.min((cCrit + wCrit + aCrit + eCrit) / 100, 1);
		const totalCritD = (cCritD + wCritD + aCritD + eCritD + 100) / 100;
		const totalDamageBonus = (cDamage + wDamage + aDamage + eDamage + 100) / 100;

		const defenceRate = (cLevel + 100) / (cLevel + 100 + (eLevel + 100) * (1 - parseFloat(monsterValues[4]) / 100));
		const resistMultiplier = resist >= 0 ? (100 - resist) / 100 : (100 - resist / 2) / 100;

		const finalDamage =
			totalAtk * skillRate * skillRateModifier * totalDamageBonus * resistMultiplier * defenceRate;
		const finalCritDamage = finalDamage * totalCritD;
		const finalExpDamage = finalDamage * (1 - totalCrit) + finalDamage * totalCritD * totalCrit;

		const transformativeRate = (16 * elementalMastery) / (elementalMastery + 2000) + 1 + elementBoost;
		const amplifyingRate = ((25 / 9) * elementalMastery) / (elementalMastery + 1400) + 1 + elementBoost;
		const transformDamage = (BASE_TRANSFORMATIVE_DAMAGE[cLevel] ?? 0) * transformativeRate * resistMultiplier;
		const shieldRate = ((4.44 * elementalMastery) / (elementalMastery + 1400) + 1 + elementBoost) * 100;

		setResults({
			damage: finalDamage,
			critDamage: finalCritDamage,
			expDamage: finalExpDamage,
			x15damage: finalDamage * 1.5 * amplifyingRate,
			x15critDamage: finalCritDamage * 1.5 * amplifyingRate,
			x15expDamage: finalExpDamage * 1.5 * amplifyingRate,
			x2damage: finalDamage * 2 * amplifyingRate,
			x2critDamage: finalCritDamage * 2 * amplifyingRate,
			x2expDamage: finalExpDamage * 2 * amplifyingRate,
			overloadedDamage: transformDamage * 4,
			shatteredDamage: transformDamage * 3,
			chargedDamage: transformDamage * 2.4,
			superconductDamage: transformDamage,
			swirlDamage: transformDamage * 1.2,
			shieldValue: shieldRate,
		});
	};

	const saveModel = (type, name, values) => {
		if (name === '') {
			return;
		}
		let models = localStorage.getItem('models');
		models = JSON.parse(models);
		models[type][name] = values;
		localStorage.setItem('models', JSON.stringify(models));
		updateNames();
	};

	const loadModel = (type, name) => {
		let models = localStorage.getItem('models');
		models = JSON.parse(models);
		return models[type][name];
	};

	const deleteModel = (type, name) => {
		let models = localStorage.getItem('models');
		models = JSON.parse(models);
		delete models[type][name];
		localStorage.setItem('models', JSON.stringify(models));
		updateNames();
	};

	const saveC = (name) => {
		saveModel('character', name, cValues);
	};

	const loadC = (name) => {
		const model = loadModel('character', name);
		if (!model) {
			return;
		}
		setCValues(model);
	};

	const saveW = (name) => {
		saveModel('weapon', name, wValues);
	};

	const loadW = (name) => {
		const model = loadModel('weapon', name);
		if (!model) {
			return;
		}
		setWValues(model);
	};

	const saveA = (name) => {
		saveModel('artifact', name, aValues);
	};

	const loadA = (name) => {
		const model = loadModel('artifact', name);
		if (!model) {
			return;
		}
		setAValues(model);
	};

	const saveE = (name) => {
		saveModel('extra', name, eValues);
	};

	const loadE = (name) => {
		const model = loadModel('extra', name);
		if (!model) {
			return;
		}
		setEValues(model);
	};

	const updateNames = () => {
		let models = localStorage.getItem('models');
		models = JSON.parse(models);
		setCNames(Object.keys(models['character']));
		setWNames(Object.keys(models['weapon']));
		setANames(Object.keys(models['artifact']));
		setENames(Object.keys(models['extra']));
	};

	useEffect(() => {
		const modelsJson = localStorage.getItem('models');
		const models = modelsJson ? JSON.parse(modelsJson) : {};
		models.character = models.character ?? {};
		models.weapon = models.weapon ?? {};
		models.artifact = models.artifact ?? {};
		models.extra = models.extra ?? {};
		if (!models['version']) {
			models['version'] = '1.2';
			Object.keys(models['character']).map((key) => {
				models['character'][key].push(0);
				return models['character'][key];
			});
			Object.keys(models['weapon']).map((key) => {
				models['weapon'][key].push(0);
				return models['weapon'][key];
			});
			Object.keys(models['artifact']).map((key) => {
				models['artifact'][key].push(0);
				models['artifact'][key].push(0);
				return models['artifact'][key];
			});
			Object.keys(models['extra']).map((key) => {
				models['extra'][key].push(0);
				models['extra'][key].push(0);
				return models['extra'][key];
			});
		}
		localStorage.setItem('models', JSON.stringify(models));
		updateNames();
	}, []);

	return (
		<>
			<StatusContainer
				style={{
					backgroundImage: `url(${DionaBack})`,
				}}>
				<Title>
					角色
					<SaveBox
						save={saveC}
						load={loadC}
						del={(name) => deleteModel('character', name)}
						names={cNames}
						idKey={0}
					/>
				</Title>
				<StatusInputs
					type={'character'}
					values={cValues}
					setValues={setCValues}
					computeDamage={computeDamage}
				/>
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${ChongyunBack})`,
				}}>
				<Title>
					武器
					<SaveBox
						save={saveW}
						load={loadW}
						del={(name) => deleteModel('weapon', name)}
						names={wNames}
						idKey={1}
					/>
				</Title>
				<StatusInputs type={'weapon'} values={wValues} setValues={setWValues} computeDamage={computeDamage} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${AyakaBack})`,
				}}>
				<Title>
					圣遗物
					<SaveBox
						save={saveA}
						load={loadA}
						del={(name) => deleteModel('artifact', name)}
						names={aNames}
						idKey={2}
					/>
				</Title>
				<StatusInputs type={'artifact'} values={aValues} setValues={setAValues} computeDamage={computeDamage} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${KazuhaBack})`,
				}}>
				<Title>
					其他
					<SaveBox
						save={saveE}
						load={loadE}
						del={(name) => deleteModel('extra', name)}
						names={eNames}
						idKey={3}
					/>
				</Title>
				<StatusInputs type={'extra'} values={eValues} setValues={setEValues} computeDamage={computeDamage} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${SakuraBack})`,
				}}>
				<Title>倍率</Title>
				<StatusInputs
					type={'modifier'}
					values={modifierValues}
					setValues={setModifierValues}
					computeDamage={computeDamage}
				/>
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${SayuBack})`,
				}}>
				<Title>怪物</Title>
				<StatusInputs
					type={'monster'}
					values={monsterValues}
					setValues={setMonsterValues}
					computeDamage={computeDamage}
				/>
			</StatusContainer>
			<CalculateButtonRow>
				<CalculateButton onClick={computeDamage}>计算</CalculateButton>
			</CalculateButtonRow>
			<ResultRow>
				<ResultContainer
					style={{
						backgroundImage: `url(${YoimiyaBack})`,
						fontSize: '1.3em',
					}}>
					<div>
						<div>基础伤害：{results.damage.toFixed(2)}</div>
						<div>暴击伤害：{results.critDamage.toFixed(2)}</div>
						<div>期望伤害：{results.expDamage.toFixed(2)}</div>
					</div>
				</ResultContainer>
				<ResultContainer style={{ backgroundImage: `url(${SucroseBack})` }}>
					<div>
						<div>1.5倍反应基础伤害：{results.x15damage.toFixed(2)}</div>
						<div>1.5倍反应暴击伤害：{results.x15critDamage.toFixed(2)}</div>
						<div>1.5倍反应期望伤害：{results.x15expDamage.toFixed(2)}</div>
						<div>2倍反应基础伤害：{results.x2damage.toFixed(2)}</div>
						<div>2倍反应暴击伤害：{results.x2critDamage.toFixed(2)}</div>
						<div>2倍反应期望伤害：{results.x2expDamage.toFixed(2)}</div>
					</div>
					<div style={{ marginLeft: '1em' }}>
						<div>超载伤害：{results.overloadedDamage.toFixed(2)}</div>
						<div>碎冰伤害：{results.shatteredDamage.toFixed(2)}</div>
						<div>感电伤害：{results.chargedDamage.toFixed(2)}</div>
						<div>超导伤害：{results.superconductDamage.toFixed(2)}</div>
						<div>扩散伤害：{results.swirlDamage.toFixed(2)}</div>
						<div>结晶盾强度：{results.shieldValue.toFixed(2)}%</div>
					</div>
				</ResultContainer>
			</ResultRow>
		</>
	);
};

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 20px;
	font-weight: 400px;
`;
const StatusContainer = styled.div`
	height: 75px;
	padding-top: 15px;
	padding-left: 3em;
	font-weight: 800;
	text-shadow: 0 0 8px white;
	width: 1100px;
	margin: 0 auto;
	background-repeat: no-repeat;
`;
const CalculateButtonRow = styled.div`
	text-align: center;
	margin: 1em 0;
`;
const CalculateButton = styled.button`
	padding: 0.5em 1em;
	border-radius: 0.8em;
`;
const ResultRow = styled.div`
	display: flex;
	justify-content: center;
`;
const ResultContainer = styled.div`
	height: 180px;
	width: 400px;
	display: flex;
	align-items: center;
	padding-left: 4em;
	font-weight: bold;
	background-size: cover;
`;

export default Calculator;
