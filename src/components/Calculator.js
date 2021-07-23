import { useState, useEffect } from "react";
import styled from "styled-components";

import SaveBox from "./SaveBox";

const Calculator = () => {
    const [damage, setDamage] = useState(0);
    const [critDamage, setCritDamage] = useState(0);
    const [expDamage, setExpDamage] = useState(0);
    const [cNames, setCNames] = useState([]);
    const [wNames, setWNames] = useState([]);
    const [aNames, setANames] = useState([]);
    const [eNames, setENames] = useState([]);

    const updateDamage = () => {
        const cAtk = parseFloat(document.getElementById("cAtk").value);
        const cAtkP = parseFloat(document.getElementById("cAtkP").value);
        const cCrit = parseFloat(document.getElementById("cCrit").value);
        const cCritD = parseFloat(document.getElementById("cCritD").value);
        const cDamage = parseFloat(document.getElementById("cDamage").value);
        const wAtk = parseFloat(document.getElementById("wAtk").value);
        const wAtkP = parseFloat(document.getElementById("wAtkP").value);
        const wCrit = parseFloat(document.getElementById("wCrit").value);
        const wCritD = parseFloat(document.getElementById("wCritD").value);
        const wDamage = parseFloat(document.getElementById("wDamage").value);
        const aAtk = parseFloat(document.getElementById("aAtk").value);
        const aAtkP = parseFloat(document.getElementById("aAtkP").value);
        const aCrit = parseFloat(document.getElementById("aCrit").value);
        const aCritD = parseFloat(document.getElementById("aCritD").value);
        const aDamage = parseFloat(document.getElementById("aDamage").value);
        const eAtk = parseFloat(document.getElementById("eAtk").value);
        const eAtkP = parseFloat(document.getElementById("eAtkP").value);
        const eCrit = parseFloat(document.getElementById("eCrit").value);
        const eCritD = parseFloat(document.getElementById("eCritD").value);
        const eDamage = parseFloat(document.getElementById("eDamage").value);
        const rate = parseFloat(document.getElementById("rate").value) / 100;
        const modifier = parseFloat(document.getElementById("modifier").value) / 100;
        const def = parseFloat(document.getElementById("def").value) - parseFloat(document.getElementById("defModifier").value);

        let totalAtk = (cAtk + wAtk) * (1 + (cAtkP + wAtkP + aAtkP + eAtkP) / 100) + (aAtk + eAtk);
        let totalCrit = Math.min((cCrit + wCrit + aCrit + eCrit) / 100, 1);
        let totalCritD = (cCritD + wCritD + aCritD + eCritD + 100) / 100; 
        let totalDamageBonus = (cDamage + wDamage + aDamage + eDamage + 100) / 100;

        let finalDamage = totalAtk * rate * modifier * totalDamageBonus;
        if (def >= 0){
            finalDamage = finalDamage * (100 - def) / 100;
        } else {
            finalDamage = finalDamage * (100 - def / 2) / 100;
        }
        console.log((cAtk + wAtk));
        setDamage(finalDamage);
        setCritDamage(finalDamage * totalCritD);
        setExpDamage(finalDamage * (1 - totalCrit) + finalDamage * totalCritD * totalCrit);
    };

    const saveModel = (type, name, v1 ,v2, v3, v4, v5) => {
        if (name === ""){
            return;
        }
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        models[type][name] = [v1 ,v2, v3, v4, v5];
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    };

    const loadModel = (type, name) =>{
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        return models[type][name];
    };

    const saveC = (name) => {
        const Atk = parseFloat(document.getElementById("cAtk").value);
        const AtkP = parseFloat(document.getElementById("cAtkP").value);
        const Crit = parseFloat(document.getElementById("cCrit").value);
        const CritD = parseFloat(document.getElementById("cCritD").value);
        const Damage = parseFloat(document.getElementById("cDamage").value);
        saveModel("character", name, Atk, AtkP, Crit, CritD, Damage);
    };

    const loadC = (name) => {
        const model = loadModel("character", name);
        if (!model){
            return;
        }
        document.getElementById("cAtk").value = model[0];
        document.getElementById("cAtkP").value = model[1];
        document.getElementById("cCrit").value = model[2];
        document.getElementById("cCritD").value = model[3];
        document.getElementById("cDamage").value = model[4];
    };

    const saveW = (name) => {
        const Atk = parseFloat(document.getElementById("wAtk").value);
        const AtkP = parseFloat(document.getElementById("wAtkP").value);
        const Crit = parseFloat(document.getElementById("wCrit").value);
        const CritD = parseFloat(document.getElementById("wCritD").value);
        const Damage = parseFloat(document.getElementById("wDamage").value);
        saveModel("weapon", name, Atk, AtkP, Crit, CritD, Damage);
    };

    const loadW = (name) => {
        const model = loadModel("weapon", name);
        if (!model){
            return;
        }
        document.getElementById("wAtk").value = model[0];
        document.getElementById("wAtkP").value = model[1];
        document.getElementById("wCrit").value = model[2];
        document.getElementById("wCritD").value = model[3];
        document.getElementById("wDamage").value = model[4];
    };

    const saveA = (name) => {
        const Atk = parseFloat(document.getElementById("aAtk").value);
        const AtkP = parseFloat(document.getElementById("aAtkP").value);
        const Crit = parseFloat(document.getElementById("aCrit").value);
        const CritD = parseFloat(document.getElementById("aCritD").value);
        const Damage = parseFloat(document.getElementById("aDamage").value);
        saveModel("artifact", name, Atk, AtkP, Crit, CritD, Damage);
    };

    const loadA = (name) => {
        const model = loadModel("artifact", name);
        if (!model){
            return;
        }
        document.getElementById("aAtk").value = model[0];
        document.getElementById("aAtkP").value = model[1];
        document.getElementById("aCrit").value = model[2];
        document.getElementById("aCritD").value = model[3];
        document.getElementById("aDamage").value = model[4];
    };

    const saveE = (name) => {
        const Atk = parseFloat(document.getElementById("eAtk").value);
        const AtkP = parseFloat(document.getElementById("eAtkP").value);
        const Crit = parseFloat(document.getElementById("eCrit").value);
        const CritD = parseFloat(document.getElementById("eCritD").value);
        const Damage = parseFloat(document.getElementById("eDamage").value);
        saveModel("extra", name, Atk, AtkP, Crit, CritD, Damage);
    };

    const loadE = (name) => {
        const model = loadModel("extra", name);
        if (!model){
            return;
        }
        document.getElementById("eAtk").value = model[0];
        document.getElementById("eAtkP").value = model[1];
        document.getElementById("eCrit").value = model[2];
        document.getElementById("eCritD").value = model[3];
        document.getElementById("eDamage").value = model[4];
    };

    const updateNames = () => {
        let models = localStorage.getItem("models");
        models = JSON.parse(models);
        setCNames(Object.keys(models["character"]));
        setWNames(Object.keys(models["weapon"]));
        setANames(Object.keys(models["artifact"]));
        setENames(Object.keys(models["extra"]));
        console.log(eNames);
    }

    useEffect(() => {
        let models = localStorage.getItem("models");
        if (!models){
            models = "{}";
        }
        models = JSON.parse(models);
        if (!models["character"]){
            models["character"] = {};
        }
        if (!models["weapon"]){
            models["weapon"] = {};
        }
        if (!models["artifact"]){
            models["artifact"] = {};
        }
        if (!models["extra"]){
            models["extra"] = {};
        }
        localStorage.setItem("models", JSON.stringify(models));
        updateNames();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (<div style={{marginLeft: "20px"}}>
        <Title>角色 <SaveBox save={saveC} load={loadC} names={cNames} idkey={0} /></Title> 
        <InputContainer>基础攻击：<StyledInput id="cAtk" defaultValue={1} /></InputContainer>
        <InputContainer>攻击百分比：<StyledInput id="cAtkP" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击率：<StyledInput id="cCrit" defaultValue={5} />%</InputContainer>
        <InputContainer>暴击伤害：<StyledInput id="cCritD" defaultValue={50} />%</InputContainer>
        <InputContainer>伤害加成：<StyledInput id="cDamage" defaultValue={0} />%</InputContainer>
        <Title>武器 <SaveBox save={saveW} load={loadW} names={wNames} idkey={1} /></Title> 
        <InputContainer>基础攻击：<StyledInput id="wAtk" defaultValue={1} /></InputContainer>
        <InputContainer>攻击百分比：<StyledInput id="wAtkP" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击率：<StyledInput id="wCrit" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击伤害：<StyledInput id="wCritD" defaultValue={0} />%</InputContainer>
        <InputContainer>伤害加成：<StyledInput id="wDamage" defaultValue={0} />%</InputContainer>
        <Title>圣遗物 <SaveBox save={saveA} load={loadA} names={aNames} idkey={2} /></Title>
        <InputContainer>攻击：<StyledInput id="aAtk" defaultValue={0} /></InputContainer>
        <InputContainer>攻击百分比：<StyledInput id="aAtkP" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击率：<StyledInput id="aCrit" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击伤害：<StyledInput id="aCritD" defaultValue={0} />%</InputContainer>
        <InputContainer>伤害加成：<StyledInput id="aDamage" defaultValue={0} />%</InputContainer>
        <Title>其他 <SaveBox save={saveE} load={loadE} names={eNames} idkey={3} /></Title>
        <InputContainer>攻击：<StyledInput id="eAtk" defaultValue={0} /></InputContainer>
        <InputContainer>攻击百分比：<StyledInput id="eAtkP" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击率：<StyledInput id="eCrit" defaultValue={0} />%</InputContainer>
        <InputContainer>暴击伤害：<StyledInput id="eCritD" defaultValue={0} />%</InputContainer>
        <InputContainer>伤害加成：<StyledInput id="eDamage" defaultValue={0} />%</InputContainer>
        <Title>倍率</Title>
        <InputContainer>基础倍率：<StyledInput id="rate" defaultValue={100} />%</InputContainer>
        <InputContainer>倍率加成：<StyledInput id="modifier" defaultValue={100} />%</InputContainer>
        <Title>怪物</Title>
        <InputContainer>防御：<StyledInput id="def" defaultValue={10} />%</InputContainer>
        <InputContainer>减防：<StyledInput id="defModifier" defaultValue={0} />%</InputContainer>
        <div style={{marginTop: "40px", marginBottom: "20px"}}>
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
    </div>);
}

const Title = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400px;
`;

const InputContainer = styled.div`
    display: inline;
    margin-right: 10px;
`;

const StyledInput = styled.input`
    width: 50px;
`;

export default Calculator;