import { Character, BaseResult, PanalStatus } from "../components/CharacterCalculator";

const Nilou2: Character = {
    name: "妮露(乘算被动)",
    baseStatus: {
        ATK: 229.61,
        ATKP: 0,
        HP: 15185,
        HPP: 53.8,
        DEF: 728.59,
        DEFP: 0,
        Crit: 0,
        CritD: 0,
        DamageP: 0,
        elementalMastery: 120,
        reactionBoost: 0,
        recharge: 0,
    },

    statusJustify: (status: PanalStatus) => {
        let times = 0;
        // if (status.HP > 30000) {
        //     times = Number(((status.HP - 30000) / 1000).toFixed());
        // }
        return { reactionBoost: Math.min(times * 7, 300) };
    },

    parseOutput: (baseResult: BaseResult) => {
        const e = 0.061 + 0.0819 + 0.0926 + 0.129;
        const q = 0.4424 + 0.5407;

        const eDamage = baseResult.getExpectedDamage(baseResult.HP, e, 1, 0);
        const qDamage = baseResult.getExpectedDamage(baseResult.HP, q, 1, 0);

        let times = 0;
        if (baseResult.HP > 30000) {
            times = Number(((baseResult.HP - 30000) / 1000).toFixed());
        }

        const bloomDamage = (Math.min(times * 0.07, 3) + 1) * baseResult.overloadedDamage;

        return [
            bloomDamage,
            `绽放：${bloomDamage.toFixed(2)}，e伤害：${eDamage.toFixed(
                2,
            )}，q伤害：${qDamage.toFixed(2)}`,
        ];
    },
};

export default Nilou2;
