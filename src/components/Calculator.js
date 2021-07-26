import { useState, useEffect } from "react";
import styled from "styled-components";

import SaveBox from "./SaveBox";
import StatusInputs from "./StatusInputs";

import YoimiyaBack from "../image/YoimiyaBack.png";
import ChongyunBack from "../image/ChongyunBack.png";
import KazuhaBack from "../image/KazuhaBack.png";
import SakuraBack from "../image/SakuraBack.png";
import SayuBack from "../image/SayuBack.png";
import AyakaBack from "../image/AyakaBack.png";
import DionaBack from "../image/DionaBack.png";

const Calculator = () => {
    const [damage, setDamage] = useState(0);
    const [critDamage, setCritDamage] = useState(0);
    const [expDamage, setExpDamage] = useState(0);
    const [cNames, setCNames] = useState([]);
    const [wNames, setWNames] = useState([]);
    const [aNames, setANames] = useState([]);
    const [eNames, setENames] = useState([]);
    const [cValues, setCValues] = useState([1, 0, 5, 50, 0]);
    const [wValues, setWValues] = useState([1, 0, 0, 0, 0]);
    const [aValues, setAValues] = useState([0, 0, 0, 0, 0]);
    const [eValues, setEValues] = useState([0, 0, 0, 0, 0]);
    const [modifierValues, setModifierValues] = useState([100, 100]);
    const [monsterValues, setMonsterValues] = useState([10, 0, 90, 90, 0]);

    const updateDamage = () => {
        const cAtk = cValues[0];
        const cAtkP = cValues[1];
        const cCrit = cValues[2];
        const cCritD = cValues[3];
        const cDamage = cValues[4];
        const wAtk = wValues[0];
        const wAtkP = wValues[1];
        const wCrit = wValues[2];
        const wCritD = wValues[3];
        const wDamage = wValues[4];
        const aAtk = aValues[0];
        const aAtkP = aValues[1];
        const aCrit = aValues[2];
        const aCritD = aValues[3];
        const aDamage = aValues[4];
        const eAtk = eValues[0];
        const eAtkP = eValues[1];
        const eCrit = eValues[2];
        const eCritD = eValues[3];
        const eDamage = eValues[4];
        const rate = modifierValues[0] / 100;
        const modifier = modifierValues[1] / 100;
        const resist = monsterValues[0] - monsterValues[1];
        const def = (monsterValues[2] + 100) / (monsterValues[2] + 100 + (monsterValues[3] + 100) * (1 - monsterValues[4] / 100));

        let totalAtk = (cAtk + wAtk) * (1 + (cAtkP + wAtkP + aAtkP + eAtkP) / 100) + (aAtk + eAtk);
        let totalCrit = Math.min((cCrit + wCrit + aCrit + eCrit) / 100, 1);
        let totalCritD = (cCritD + wCritD + aCritD + eCritD + 100) / 100;
        let totalDamageBonus = (cDamage + wDamage + aDamage + eDamage + 100) / 100;

        let finalDamage = totalAtk * rate * modifier * totalDamageBonus;
        if (resist >= 0) {
            finalDamage = finalDamage * (100 - resist) / 100;
        } else {
            finalDamage = finalDamage * (100 - resist / 2) / 100;
        }
        finalDamage *= def;
        setDamage(finalDamage);
        setCritDamage(finalDamage * totalCritD);
        setExpDamage(finalDamage * (1 - totalCrit) + finalDamage * totalCritD * totalCrit);
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
    }

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
    }

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
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (<div style={{ marginLeft: "20px" }}>
        <StatusContainer style={{ backgroundImage: `url(${DionaBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>角色 <SaveBox save={saveC} load={loadC} del={(name) => deleteModel("character", name)} names={cNames} idkey={0} /></Title>
            <StatusInputs type={"character"} values={cValues} setValues={setCValues} />
        </StatusContainer>
        <StatusContainer style={{ backgroundImage: `url(${ChongyunBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>武器 <SaveBox save={saveW} load={loadW} del={(name) => deleteModel("weapon", name)} names={wNames} idkey={1} /></Title>
            <StatusInputs type={"weapon"} values={wValues} setValues={setWValues} />
        </StatusContainer>
        <StatusContainer style={{ backgroundImage: `url(${AyakaBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>圣遗物 <SaveBox save={saveA} load={loadA} del={(name) => deleteModel("artifact", name)} names={aNames} idkey={2} /></Title>
            <StatusInputs type={"artifact"} values={aValues} setValues={setAValues} />
        </StatusContainer >
        <StatusContainer style={{ backgroundImage: `url(${KazuhaBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>其他 <SaveBox save={saveE} load={loadE} del={(name) => deleteModel("extra", name)} names={eNames} idkey={3} /></Title>
            <StatusInputs type={"extra"} values={eValues} setValues={setEValues} />
        </StatusContainer >
        <StatusContainer style={{ backgroundImage: `url(${SakuraBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>倍率</Title>
            <StatusInputs type={"modifier"} values={modifierValues} setValues={setModifierValues} />
        </StatusContainer >
        <StatusContainer style={{ backgroundImage: `url(${SayuBack})`, backgroundRepeat: "no-repeat" }}>
            <Title>怪物</Title>
            <StatusInputs type={"monster"} values={monsterValues} setValues={setMonsterValues} />
        </StatusContainer >
        <ResoultContainer style={{ backgroundImage: `url(${YoimiyaBack})`, backgroundRepeat: "no-repeat" }} >
            <div style={{ marginTop: "40px", marginBottom: "20px" }}>
                <button onClick={updateDamage}>计算</button>
            </div>
            <div>
                <div>
                    基础伤害：{damage}
                </div>
                <div>
                    暴击伤害：{critDamage}
                </div>
                <div>
                    期望伤害：{expDamage}
                </div>
            </div>
        </ResoultContainer>
    </div >);
}

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
`;

const ResoultContainer = styled.div`
    height: 180px;
    padding-top: 5px;
    padding-left: 50px;
    font-weight: 800;
`;

export default Calculator;