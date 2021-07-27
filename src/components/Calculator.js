import { useState, useEffect } from "react";
import styled from "styled-components";

import SaveBox from "./SaveBox";
import StatusInputs from "./StatusInputs";
import { BASETRANSFORMATIVEDAMAGE } from "./Consts";

import YoimiyaBack from "../image/YoimiyaBack.png";
import ChongyunBack from "../image/ChongyunBack.png";
import KazuhaBack from "../image/KazuhaBack.png";
import SakuraBack from "../image/SakuraBack.png";
import SayuBack from "../image/SayuBack.png";
import AyakaBack from "../image/AyakaBack.png";
import DionaBack from "../image/DionaBack.png";
import SucroseBack from "../image/SucroseBack.png";

const Calculator = () => {
    const [damage, setDamage] = useState(0);
    const [critDamage, setCritDamage] = useState(0);
    const [expDamage, setExpDamage] = useState(0);
    const [x15damage, setX15Damage] = useState(0);
    const [x15critDamage, setX15CritDamage] = useState(0);
    const [x15expDamage, setX15ExpDamage] = useState(0);
    const [x2damage, setX2Damage] = useState(0);
    const [x2critDamage, setX2CritDamage] = useState(0);
    const [x2expDamage, setX2ExpDamage] = useState(0);
    const [overloadedDamage, setOverloadedDamage] = useState(0);
    const [shatteredDamage, setShatteredDamage] = useState(0);
    const [chargedDamage, setChargedDamage] = useState(0);
    const [swirlDamage, setSwirlDamage] = useState(0);
    const [superconductDamage, setSuperconductDamage] = useState(0);
    const [shieldValue, setShieldValue] = useState(0);
    const [cNames, setCNames] = useState([]);
    const [wNames, setWNames] = useState([]);
    const [aNames, setANames] = useState([]);
    const [eNames, setENames] = useState([]);
    const [cValues, setCValues] = useState([1, 0, 5, 50, 0, 0]);
    const [wValues, setWValues] = useState([1, 0, 0, 0, 0, 0]);
    const [aValues, setAValues] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [eValues, setEValues] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [modifierValues, setModifierValues] = useState([100, 100]);
    const [monsterValues, setMonsterValues] = useState([10, 0, 90, 90, 0]);

    const updateDamage = () => {
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
        const rate = parseFloat(modifierValues[0]) / 100;
        const modifier = parseFloat(modifierValues[1]) / 100;
        const resist = parseFloat(monsterValues[0]) - parseFloat(monsterValues[1]);
        const cLevel = parseInt(monsterValues[2]);
        const eLevel = parseInt(monsterValues[3]);
        const def =
            (cLevel + 100) /
            (cLevel + 100 + (eLevel + 100) * (1 - parseFloat(monsterValues[4]) / 100));
        const elementMastery =
            parseFloat(cValues[5]) +
            parseFloat(wValues[5]) +
            parseFloat(aValues[5]) +
            parseFloat(eValues[5]);
        const elementBoost = parseFloat(aValues[6]);

        let totalAtk = (cAtk + wAtk) * (1 + (cAtkP + wAtkP + aAtkP + eAtkP) / 100) + (aAtk + eAtk);
        let totalCrit = Math.min((cCrit + wCrit + aCrit + eCrit) / 100, 1);
        let totalCritD = (cCritD + wCritD + aCritD + eCritD + 100) / 100;
        let totalDamageBonus = (cDamage + wDamage + aDamage + eDamage + 100) / 100;

        let finalDamage = totalAtk * rate * modifier * totalDamageBonus;
        let resistMultiplier = 1;
        if (resist >= 0) {
            resistMultiplier = (100 - resist) / 100;
        } else if (resist >= 0) {
            resistMultiplier = (100 - resist) / 100;
        } else {
            resistMultiplier = (100 - resist / 2) / 100;
        }
        finalDamage *= resistMultiplier;
        finalDamage *= def;
        setDamage(finalDamage);
        let finalCritDamage = finalDamage * totalCritD;
        setCritDamage(finalCritDamage);
        let finalExpDamage = finalDamage * (1 - totalCrit) + finalDamage * totalCritD * totalCrit;
        setExpDamage(finalExpDamage);

        let transformativeRate = (16 * elementMastery) / (elementMastery + 2000) + 1 + elementBoost;
        let amplifyingRate =
            ((25 / 9) * elementMastery) / (elementMastery + 1400) + 1 + elementBoost;
        let shieldRate = (4.44 * elementMastery) / (elementMastery + 1400) + 1 + elementBoost;
        setShieldValue(shieldRate * 100);
        console.log(amplifyingRate);

        setX15Damage(finalDamage * 1.5 * amplifyingRate);
        setX15CritDamage(finalCritDamage * 1.5 * amplifyingRate);
        setX15ExpDamage(finalExpDamage * 1.5 * amplifyingRate);

        setX2Damage(finalDamage * 2 * amplifyingRate);
        setX2CritDamage(finalCritDamage * 2 * amplifyingRate);
        setX2ExpDamage(finalExpDamage * 2 * amplifyingRate);

        let transformDamage = 0;
        if (cLevel in BASETRANSFORMATIVEDAMAGE) {
            transformDamage = BASETRANSFORMATIVEDAMAGE[cLevel];
        }
        transformDamage *= transformativeRate * resistMultiplier;

        setOverloadedDamage(transformDamage * 4.0);
        setShatteredDamage(transformDamage * 3.0);
        setChargedDamage(transformDamage * 2.4);
        setSuperconductDamage(transformDamage * 1.0);
        setSwirlDamage(transformDamage * 1.2);
    };

    const saveModel = (type, name, values) => {
        if (name === "") {
            return;
        }
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        models[type][name] = values;
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    };

    const loadModel = (type, name) => {
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        return models[type][name];
    };

    const deleteModel = (type, name) => {
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        delete models[type][name];
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    };

    const saveC = (name) => {
        saveModel("character", name, cValues);
    };

    const loadC = (name) => {
        const model = loadModel("character", name);
        if (!model) {
            return;
        }
        setCValues(model);
    };

    const saveW = (name) => {
        saveModel("weapon", name, wValues);
    };

    const loadW = (name) => {
        const model = loadModel("weapon", name);
        if (!model) {
            return;
        }
        setWValues(model);
    };

    const saveA = (name) => {
        saveModel("artifact", name, aValues);
    };

    const loadA = (name) => {
        const model = loadModel("artifact", name);
        if (!model) {
            return;
        }
        setAValues(model);
    };

    const saveE = (name) => {
        saveModel("extra", name, eValues);
    };

    const loadE = (name) => {
        const model = loadModel("extra", name);
        if (!model) {
            return;
        }
        setEValues(model);
    };

    const updateNames = () => {
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        setCNames(Object.keys(models["character"]));
        setWNames(Object.keys(models["weapon"]));
        setANames(Object.keys(models["artifact"]));
        setENames(Object.keys(models["extra"]));
    };

    useEffect(() => {
        let models = localStorage.getItem("models");
        if (!models) {
            models = "{}";
        }
        models = JSON.parse(models);
        if (!models["character"]) {
            models["character"] = {};
        }
        if (!models["weapon"]) {
            models["weapon"] = {};
        }
        if (!models["artifact"]) {
            models["artifact"] = {};
        }
        if (!models["extra"]) {
            models["extra"] = {};
        }
        if (!models["version"]) {
            models["version"] = "1.2";
            Object.keys(models["character"]).map((key) => {
                models["character"][key].push(0);
                return models["character"][key];
            });
            Object.keys(models["weapon"]).map((key) => {
                models["weapon"][key].push(0);
                return models["weapon"][key];
            });
            Object.keys(models["artifact"]).map((key) => {
                models["artifact"][key].push(0);
                models["artifact"][key].push(0);
                return models["artifact"][key];
            });
            Object.keys(models["extra"]).map((key) => {
                models["extra"][key].push(0);
                models["extra"][key].push(0);
                return models["extra"][key];
            });
        }
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    }, []);

    return (
        <div style={{ marginLeft: "20px" }}>
            <StatusContainer
                style={{
                    backgroundImage: `url(${DionaBack})`,
                }}
            >
                <Title>
                    角色{" "}
                    <SaveBox
                        save={saveC}
                        load={loadC}
                        del={(name) => deleteModel("character", name)}
                        names={cNames}
                        idkey={0}
                    />
                </Title>
                <StatusInputs type={"character"} values={cValues} setValues={setCValues} />
            </StatusContainer>
            <StatusContainer
                style={{
                    backgroundImage: `url(${ChongyunBack})`,
                }}
            >
                <Title>
                    武器{" "}
                    <SaveBox
                        save={saveW}
                        load={loadW}
                        del={(name) => deleteModel("weapon", name)}
                        names={wNames}
                        idkey={1}
                    />
                </Title>
                <StatusInputs type={"weapon"} values={wValues} setValues={setWValues} />
            </StatusContainer>
            <StatusContainer
                style={{
                    backgroundImage: `url(${AyakaBack})`,
                }}
            >
                <Title>
                    圣遗物{" "}
                    <SaveBox
                        save={saveA}
                        load={loadA}
                        del={(name) => deleteModel("artifact", name)}
                        names={aNames}
                        idkey={2}
                    />
                </Title>
                <StatusInputs type={"artifact"} values={aValues} setValues={setAValues} />
            </StatusContainer>
            <StatusContainer
                style={{
                    backgroundImage: `url(${KazuhaBack})`,
                }}
            >
                <Title>
                    其他{" "}
                    <SaveBox
                        save={saveE}
                        load={loadE}
                        del={(name) => deleteModel("extra", name)}
                        names={eNames}
                        idkey={3}
                    />
                </Title>
                <StatusInputs type={"extra"} values={eValues} setValues={setEValues} />
            </StatusContainer>
            <StatusContainer
                style={{
                    backgroundImage: `url(${SakuraBack})`,
                }}
            >
                <Title>倍率</Title>
                <StatusInputs
                    type={"modifier"}
                    values={modifierValues}
                    setValues={setModifierValues}
                />
            </StatusContainer>
            <StatusContainer
                style={{
                    backgroundImage: `url(${SayuBack})`,
                }}
            >
                <Title>怪物</Title>
                <StatusInputs
                    type={"monster"}
                    values={monsterValues}
                    setValues={setMonsterValues}
                />
            </StatusContainer>
            <ResultContainer
                style={{
                    backgroundImage: `url(${YoimiyaBack})`,
                    position: "relative",
                    left: "110px",
                }}
            >
                <div style={{ marginTop: "40px", marginBottom: "20px" }}>
                    <button onClick={updateDamage}>计算</button>
                </div>
                <div>
                    <div>基础伤害：{damage.toFixed(2)}</div>
                    <div>暴击伤害：{critDamage.toFixed(2)}</div>
                    <div>期望伤害：{expDamage.toFixed(2)}</div>
                </div>
            </ResultContainer>
            <ResultContainer
                style={{
                    backgroundImage: `url(${SucroseBack})`,
                    position: "relative",
                    top: "-180px",
                    left: "850px",
                    paddingLeft: "10px",
                    paddingTop: "40px",
                    fontSize: "13px",
                }}
            >
                <div style={{ float: "left", marginRight: "30px" }}>
                    <div>1.5倍反应基础伤害：{x15damage.toFixed(2)}</div>
                    <div>1.5倍反应暴击伤害：{x15critDamage.toFixed(2)}</div>
                    <div>1.5倍反应期望伤害：{x15expDamage.toFixed(2)}</div>
                    <div>2倍反应基础伤害：{x2damage.toFixed(2)}</div>
                    <div>2倍反应暴击伤害：{x2critDamage.toFixed(2)}</div>
                    <div>2倍反应期望伤害：{x2expDamage.toFixed(2)}</div>
                </div>
                <div>
                    <div>超载伤害：{overloadedDamage.toFixed(2)}</div>
                    <div>碎冰伤害：{shatteredDamage.toFixed(2)}</div>
                    <div>感电伤害：{chargedDamage.toFixed(2)}</div>
                    <div>超导伤害：{superconductDamage.toFixed(2)}</div>
                    <div>扩散伤害：{swirlDamage.toFixed(2)}</div>
                    <div>结晶盾强度：{shieldValue.toFixed(2)}%</div>
                </div>
            </ResultContainer>
        </div>
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
    padding-left: 20px;
    font-weight: 800;
    text-shadow: 0 0 8px white;
    width: 1100px;
    margin-left: 110px;
    background-repeat: no-repeat;
`;

const ResultContainer = styled.div`
    height: 180px;
    padding-top: 5px;
    padding-left: 50px;
    font-weight: 800;
    width: 400px;
    background-repeat: no-repeat;
`;

export default Calculator;
