import { Character, BaseResult } from "../components/CharacterCalculator";

const Cyno: Character = {
    name: "赛诺",
    baseStatus: {
        ATK: 318.11,
        ATKP: 0,
        HP: 12491,
        HPP: 0,
        DEF: 859.24,
        DEFP: 0,
        Crit: 0,
        CritD: 38.4,
        DamageP: 0,
        elementalMastery: 100,
        reactionBoost: 0,
        recharge: 0,
    },

    parseOutput: (baseResult: BaseResult) => {
        const aCombo = 1.4436 + 1.5209 + 1.9304 + 0.9548 * 2 + 2.4135;
        const e = 2.8224;
        const eEx = 0.5;

        let totalDamage = 0;
        const aComboDamage = baseResult.getExpectedDamage(
            baseResult.ATK,
            aCombo,
            1,
            baseResult.elementalMastery,
        );
        const eDamage = baseResult.getExpectedDamage(baseResult.ATK, e, 1, 0);
        const eExDamage = baseResult.getExpectedDamage(
            baseResult.ATK,
            eEx,
            1,
            baseResult.elementalMastery * 2.5,
        );

        totalDamage += aComboDamage * 2;
        totalDamage += eDamage;
        totalDamage += eExDamage * 3;
        totalDamage += baseResult.QuickenThunder * 4;

        return [
            totalDamage,
            `一轮平A伤害：${aComboDamage.toFixed(2)} X 2，e伤害：${eDamage.toFixed(
                2,
            )}，渡荒之雷：${eExDamage.toFixed(
                2,
            )} X 3，原激化伤害：${baseResult.QuickenThunder.toFixed(2)} X 4`,
        ];
    },
};

export default Cyno;
