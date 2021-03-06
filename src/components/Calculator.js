import { useState, useEffect, useCallback } from 'react';
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
	const [advancedMode, setAdvancedMode] = useState(false);

	// for advanced mode
	const [cValues, setCValues] = useState([0, 0, 5, 50, 0, 0]);
	const [wValues, setWValues] = useState([0, 0, 0, 0, 0, 0]);
	const [aValues, setAValues] = useState([0, 0, 0, 0, 0, 0, 0]);

	// for simple mode
	const [stats, setStats] = useState([2000, 50, 100, 50, 100]);

	const [eValues, setEValues] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [modifierValues, setModifierValues] = useState([100, 100]);
	const [monsterValues, setMonsterValues] = useState([10, 0, 90, 90, 0]);

	const computeDamage = useCallback(() => {
		let totalAtk, totalCrit, totalCritDamage, totalDamagePercent, elementalMastery, elementBoost;
		if (advancedMode) {
			const cAtk = parseFloat(cValues[0]);
			const cAtkP = parseFloat(cValues[1]);
			const cCrit = parseFloat(cValues[2]);
			const cCritD = parseFloat(cValues[3]);
			const cDamageP = parseFloat(cValues[4]);
			const wAtk = parseFloat(wValues[0]);
			const wAtkP = parseFloat(wValues[1]);
			const wCrit = parseFloat(wValues[2]);
			const wCritD = parseFloat(wValues[3]);
			const wDamageP = parseFloat(wValues[4]);
			const aAtk = parseFloat(aValues[0]);
			const aAtkP = parseFloat(aValues[1]);
			const aCrit = parseFloat(aValues[2]);
			const aCritD = parseFloat(aValues[3]);
			const aDamageP = parseFloat(aValues[4]);
			const eAtk = parseFloat(eValues[0]);
			const eAtkP = parseFloat(eValues[1]);
			const eCrit = parseFloat(eValues[2]);
			const eCritD = parseFloat(eValues[3]);
			const eDamageP = parseFloat(eValues[4]);
			totalAtk = (cAtk + wAtk) * (1 + (cAtkP + wAtkP + aAtkP + eAtkP) / 100) + aAtk + eAtk;
			totalCrit = Math.min((cCrit + wCrit + aCrit + eCrit) / 100, 1);
			totalCritDamage = (cCritD + wCritD + aCritD + eCritD + 100) / 100;
			totalDamagePercent = (cDamageP + wDamageP + aDamageP + eDamageP + 100) / 100;
			elementalMastery =
				parseFloat(cValues[5]) + parseFloat(wValues[5]) + parseFloat(aValues[5]) + parseFloat(eValues[5]);
			elementBoost = parseFloat(aValues[6]);
		} else {
			totalAtk = parseFloat(stats[0]);
			totalCrit = Math.min(parseFloat(stats[1]) / 100, 1);
			totalCritDamage = parseFloat(stats[2]) / 100 + 1;
			totalDamagePercent = parseFloat(stats[3]) / 100 + 1;
			elementalMastery = parseFloat(stats[4]);
			elementBoost = 0;
		}
		console.log(totalAtk, totalCrit, totalCritDamage, totalDamagePercent, elementalMastery);

		const skillRatio = parseFloat(modifierValues[0]) / 100;
		const skillRatioModifier = parseFloat(modifierValues[1]) / 100;
		const resist = parseFloat(monsterValues[0]) - parseFloat(monsterValues[1]);
		const cLevel = parseInt(monsterValues[2]);
		const eLevel = parseInt(monsterValues[3]);
		const defenceRate = (cLevel + 100) / (cLevel + 100 + (eLevel + 100) * (1 - parseFloat(monsterValues[4]) / 100));
		const resistMultiplier = resist >= 0 ? (100 - resist) / 100 : (100 - resist / 2) / 100;

		const finalDamage =
			totalAtk * skillRatio * skillRatioModifier * totalDamagePercent * resistMultiplier * defenceRate;
		const finalCritDamage = finalDamage * totalCritDamage;
		const finalExpDamage = finalDamage * (1 - totalCrit) + finalCritDamage * totalCrit;

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
	}, [cValues, wValues, aValues, eValues, modifierValues, monsterValues, stats, advancedMode]);

	useEffect(() => {
		computeDamage();
	}, [cValues, wValues, aValues, eValues, modifierValues, monsterValues, stats, computeDamage]);

	useEffect(() => {
		const modelsJSON = localStorage.getItem('models');
		const models = modelsJSON ? JSON.parse(modelsJSON) : {};
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
	}, []);

	const statsPanel = advancedMode ? (
		<>
			<StatusContainer
				style={{
					backgroundImage: `url(${DionaBack})`,
				}}>
				<Title>
					??????
					<SaveBox type="character" values={cValues} setValues={setCValues} />
				</Title>
				<StatusInputs type="character" values={cValues} setValues={setCValues} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${ChongyunBack})`,
				}}>
				<Title>
					??????
					<SaveBox type="weapon" values={wValues} setValues={setWValues} />
				</Title>
				<StatusInputs type="weapon" values={wValues} setValues={setWValues} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${AyakaBack})`,
				}}>
				<Title>
					?????????
					<SaveBox type="artifact" values={aValues} setValues={setAValues} />
				</Title>
				<StatusInputs type="artifact" values={aValues} setValues={setAValues} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${KazuhaBack})`,
				}}>
				<Title>
					??????
					<SaveBox type="extra" values={eValues} setValues={setEValues} />
				</Title>
				<StatusInputs type="extra" values={eValues} setValues={setEValues} />
			</StatusContainer>
		</>
	) : (
		<>
			<StatusContainer
				style={{
					backgroundImage: `url(${AyakaBack})`,
				}}>
				<Title>????????????</Title>
				<StatusInputs type={'simple'} values={stats} setValues={setStats} />
			</StatusContainer>
		</>
	);
	return (
		<>
			<ButtonSwitch>
				<div className={advancedMode ? '' : 'selected'} onClick={() => setAdvancedMode(false)}>
					??????
				</div>
				<div className={advancedMode ? 'selected' : ''} onClick={() => setAdvancedMode(true)}>
					??????
				</div>
			</ButtonSwitch>
			{statsPanel}
			<StatusContainer
				style={{
					backgroundImage: `url(${SakuraBack})`,
				}}>
				<Title>????????????</Title>
				<StatusInputs type={'modifier'} values={modifierValues} setValues={setModifierValues} />
			</StatusContainer>
			<StatusContainer
				style={{
					backgroundImage: `url(${SayuBack})`,
				}}>
				<Title>??????</Title>
				<StatusInputs type={'monster'} values={monsterValues} setValues={setMonsterValues} />
			</StatusContainer>
			<CalculateButtonRow>
				<CalculateButton onClick={computeDamage}>??????</CalculateButton>
			</CalculateButtonRow>
			<ResultRow>
				<ResultContainer
					style={{
						backgroundImage: `url(${YoimiyaBack})`,
						fontSize: '1.3em',
					}}>
					<div>
						<div>???????????????{results.damage.toFixed(2)}</div>
						<div>???????????????{results.critDamage.toFixed(2)}</div>
						<div>???????????????{results.expDamage.toFixed(2)}</div>
					</div>
				</ResultContainer>
				<ResultContainer style={{ backgroundImage: `url(${SucroseBack})` }}>
					<div>
						<div>1.5????????????????????????{results.x15damage.toFixed(2)}</div>
						<div>1.5????????????????????????{results.x15critDamage.toFixed(2)}</div>
						<div>1.5????????????????????????{results.x15expDamage.toFixed(2)}</div>
						<div>2????????????????????????{results.x2damage.toFixed(2)}</div>
						<div>2????????????????????????{results.x2critDamage.toFixed(2)}</div>
						<div>2????????????????????????{results.x2expDamage.toFixed(2)}</div>
					</div>
					<div style={{ marginLeft: '1em' }}>
						<div>???????????????{results.overloadedDamage.toFixed(2)}</div>
						<div>???????????????{results.shatteredDamage.toFixed(2)}</div>
						<div>???????????????{results.chargedDamage.toFixed(2)}</div>
						<div>???????????????{results.superconductDamage.toFixed(2)}</div>
						<div>???????????????{results.swirlDamage.toFixed(2)}</div>
						<div>??????????????????{results.shieldValue.toFixed(2)}%</div>
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
	min-height: 180px;
	width: 400px;
	display: flex;
	align-items: center;
	padding: 1em 2em;
	font-weight: bold;
	background-size: cover;
`;
const ButtonSwitch = styled.div`
	margin: 0 auto;
	width: 8em;
	display: flex;
	border: 1px solid #333333;
	justify-content: center;
	margin-bottom: 0.5em;

	div {
		flex: 1;
		background: #cccccc;
		cursor: pointer;
		text-align: center;
	}
	div.selected {
		background-color: #eeeeee;
	}
`;

export default Calculator;
