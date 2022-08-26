import { BASE_TRANSFORMATIVE_DAMAGE } from "../components/Consts";

export interface Status {
    ATK: number;
    ATKP: number;
    HP: number;
    HPP: number;
    DEF: number;
    DEFP: number;
    Crit: number;
    CritD: number;
    DamageP: number;
    elementalMastery: number;
    reactionBoost: number;
    recharge: number;
}

export interface PanalStatus {
    ATK: number;
    HP: number;
    DEF: number;
    Crit: number;
    CritD: number;
    DamageP: number;
    elementalMastery: number;
    recharge: number;
}

export interface BaseResult {
    ATK: number;
    DEF: number;
    HP: number;
    elementalMastery: number;
    recharge: number;
    getExpectedDamage: (totalAtk, skillRatio, skillRatioModifier, extraDamage) => number;
    x15Damage: number;
    x2Damage: number;
    // 超载、绽放
    overloadedDamage: number;
    shatteredDamage: number;
    chargedDamage: number;
    superconductDamage: number;
    swirlDamage: number;
    shieldValue: number;
    Hyperbloom: number;
    QuickenThunder: number;
    QuickenGrass: number;
}

export interface Character {
    name: string;
    baseStatus: Status;
    statusJustify?: (status: PanalStatus) => any;
    // number is used for sorting, string is detail display
    parseOutput: (baseResult: BaseResult) => [number, string];
}

export interface Weapon {
    name: string;
    baseStatus: Status;
    statusJustify?: (status: PanalStatus) => any;
}

const STATUS_BOOST_DISPLAY = {
    ATKP: "攻击%",
    HPP: "生命%",
    DEFP: "防御%",
    DamageP: "伤害%",
    elementalMastery: "精通",
    Crit: "暴击",
    CritD: "爆伤",
    recharge: "充能",
};

const defaultStatus = {
    ATK: 0,
    ATKP: 0,
    HP: 0,
    HPP: 0,
    DEF: 0,
    DEFP: 0,
    Crit: 5,
    CritD: 50,
    DamageP: 0,
    elementalMastery: 0,
    reactionBoost: 0,
    recharge: 0,
};

// 生之花，死之羽
const baseArtifact = { ATK: 311, HP: 4780 };
// 时之沙
const artifactStatus1 = [
    { ATKP: 46.6 },
    { HPP: 46.6 },
    { DEFP: 58.3 },
    { elementalMastery: 187 },
    { recharge: 51.8 },
];
// 空之杯
const artifactStatus2 = [
    { ATKP: 46.6 },
    { HPP: 46.6 },
    { DEFP: 58.3 },
    { DamageP: 46.6 },
    { elementalMastery: 187 },
];
// 理之冠
const artifactStatus3 = [
    { ATKP: 46.6 },
    { HPP: 46.6 },
    { DEFP: 58.3 },
    { elementalMastery: 187 },
    { CritD: 62.2 },
    { Crit: 31.1 },
];

// const artifactStatus1 = [{ HPP: 46.6 }];
// const artifactStatus2 = [{ HPP: 46.6 }];
// const artifactStatus3 = [{ HPP: 46.6 }];

// 平均分配2档数值圣遗物词条
const artifactSubStatus = {
    ATK: 64,
    ATKP: 18.8,
    HP: 956,
    HPP: 18.8,
    DEF: 76,
    DEFP: 23.2,
    elementalMastery: 76,
    recharge: 20.8,
    Crit: 12.4,
    CritD: 24.8,
};

const artifactSet = [
    { name: "如雷", DamageP: 15, reactionBoost: 20 },
    { name: "饰金", ATKP: 14, elementalMastery: 180 },
    { name: "雷伤精通", DamageP: 15, elementalMastery: 80 },
    { name: "生命精通", HPP: 20, elementalMastery: 180 },
];

const applyStatusBoost = (status: Status, statusBoost: any) => {
    Object.keys(statusBoost).forEach((key) => {
        if (key in status) {
            status[key] += statusBoost[key];
        }
    });
    return status;
};

const artifactMainToString = (statusBoost1, statusBoost2, statusBoost3) => {
    let string = `${STATUS_BOOST_DISPLAY[Object.keys(statusBoost1)[0]]}，`;
    string += `${STATUS_BOOST_DISPLAY[Object.keys(statusBoost2)[0]]}，`;
    string += `${STATUS_BOOST_DISPLAY[Object.keys(statusBoost3)[0]]}，`;
    return string;
};

const calculateDamage = (originStatus: Status, character: Character, weapon: Weapon) => {
    const Cbase = character.baseStatus;
    const Wbase = weapon.baseStatus;
    const originATK =
        (Cbase.ATK + Wbase.ATK) * ((Cbase.ATKP + Wbase.ATKP + originStatus.ATKP) / 100 + 1) +
        originStatus.ATK;
    const originHP =
        (Cbase.HP + Wbase.HP) * ((Cbase.HPP + Wbase.HPP + originStatus.HPP) / 100 + 1) +
        originStatus.HP;
    const originDEF =
        (Cbase.DEF + Wbase.DEF) * ((Cbase.DEFP + Wbase.DEFP + originStatus.DEFP) / 100 + 1) +
        originStatus.DEF;
    const originCrit = Math.min((Cbase.Crit + Wbase.Crit + originStatus.Crit) / 100, 1);
    const originCritDamage = (Cbase.CritD + Wbase.CritD + originStatus.CritD) / 100 + 1;
    const originDamagePercent = (Cbase.CritD + Wbase.CritD + originStatus.CritD) / 100 + 1;
    const originelementalMastery =
        Cbase.elementalMastery + Wbase.elementalMastery + originStatus.elementalMastery;
    const originRecharge = Cbase.recharge + Wbase.recharge + originStatus.recharge;
    const panalStatus = {
        ATK: originATK,
        HP: originHP,
        DEF: originDEF,
        Crit: originCrit,
        CritD: originCritDamage,
        DamageP: originDamagePercent,
        elementalMastery: originelementalMastery,
        recharge: originRecharge,
    };

    let status = { ...originStatus };
    if (character.statusJustify) {
        const statusJustifyBoost1 = character.statusJustify(panalStatus);
        status = applyStatusBoost(status, statusJustifyBoost1);
    }
    if (weapon.statusJustify) {
        const statusJustifyBoost2 = weapon.statusJustify(panalStatus);
        status = applyStatusBoost(status, statusJustifyBoost2);
    }

    const totalATK =
        (Cbase.ATK + Wbase.ATK) * ((Cbase.ATKP + Wbase.ATKP + status.ATKP) / 100 + 1) + status.ATK;
    const totalHP =
        (Cbase.HP + Wbase.HP) * ((Cbase.HPP + Wbase.HPP + status.HPP) / 100 + 1) + status.HP;
    const totalDEF =
        (Cbase.DEF + Wbase.DEF) * ((Cbase.DEFP + Wbase.DEFP + status.DEFP) / 100 + 1) + status.DEF;
    const totalCrit = Math.min((Cbase.Crit + Wbase.Crit + status.Crit) / 100, 1);
    const totalCritDamage = (Cbase.CritD + Wbase.CritD + status.CritD) / 100 + 1;
    const totalDamagePercent = (Cbase.CritD + Wbase.CritD + status.CritD) / 100 + 1;
    const elementalMastery =
        Cbase.elementalMastery + Wbase.elementalMastery + status.elementalMastery;
    const reactionBoost = (Cbase.reactionBoost + Wbase.reactionBoost + status.reactionBoost) / 100;
    const totalRecharge = Cbase.recharge + Wbase.recharge + status.recharge;

    const transformativeRate =
        (16 * elementalMastery) / (elementalMastery + 2000) + 1 + reactionBoost;
    const amplifyingRate =
        ((25 / 9) * elementalMastery) / (elementalMastery + 1400) + 1 + reactionBoost;
    const transformDamage = BASE_TRANSFORMATIVE_DAMAGE[90] * transformativeRate;
    const shieldRate =
        ((4.44 * elementalMastery) / (elementalMastery + 1400) + 1 + reactionBoost) * 100;

    const quickenbase =
        1447 * (1 + (5 * elementalMastery) / (elementalMastery + 1200) + reactionBoost);
    const quickenCrit = quickenbase * totalCritDamage;
    const quickenExp = quickenbase * (1 - totalCrit) + quickenCrit * totalCrit;

    let baseResult = {
        ATK: totalATK,
        DEF: totalDEF,
        HP: totalHP,
        elementalMastery: elementalMastery,
        recharge: totalRecharge,
        getExpectedDamage: (totalAtk, skillRatio, skillRatioModifier, extraDamage) => {
            const damage =
                (totalAtk * skillRatio * skillRatioModifier + extraDamage) * totalDamagePercent;
            const critDamage = damage * totalCritDamage;
            return damage * (1 - totalCrit) + critDamage * totalCrit;
        },
        x15Damage: 1.5 * amplifyingRate,
        x2Damage: 2 * amplifyingRate,
        overloadedDamage: transformDamage * 4,
        shatteredDamage: transformDamage * 3,
        chargedDamage: transformDamage * 2.4,
        superconductDamage: transformDamage,
        swirlDamage: transformDamage * 1.2,
        shieldValue: shieldRate,
        Hyperbloom: transformDamage * 6,
        QuickenThunder: quickenExp * 1.15,
        QuickenGrass: quickenExp * 1.25,
    };
    return character.parseOutput(baseResult);
};

export const testDamage = (character: Character, weapon: Weapon) => {
    let results: any = [];
    artifactStatus1.forEach((statusBoost1) => {
        artifactStatus2.forEach((statusBoost2) => {
            artifactStatus3.forEach((statusBoost3) => {
                artifactSet.forEach((setBoost) => {
                    let currentStatus = { ...defaultStatus };
                    currentStatus = applyStatusBoost(currentStatus, baseArtifact);
                    currentStatus = applyStatusBoost(currentStatus, statusBoost1);
                    currentStatus = applyStatusBoost(currentStatus, statusBoost2);
                    currentStatus = applyStatusBoost(currentStatus, statusBoost3);
                    currentStatus = applyStatusBoost(currentStatus, artifactSubStatus);
                    currentStatus = applyStatusBoost(currentStatus, setBoost);
                    let result = calculateDamage(currentStatus, character, weapon);
                    result.push(
                        `${setBoost.name} - ${artifactMainToString(
                            statusBoost1,
                            statusBoost2,
                            statusBoost3,
                        )}`,
                    );
                    results.push(result);
                });
            });
        });
    });
    results.sort((a, b) => -(a[0] - b[0]));
    return results.slice(0, 20);
};
