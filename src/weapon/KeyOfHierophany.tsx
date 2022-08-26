import { Weapon, PanalStatus } from "../components/CharacterCalculator";

const KeyOfHierophany: Weapon = {
    name: "圣显之钥",
    baseStatus: {
        ATK: 541.83,
        ATKP: 0,
        HP: 0,
        HPP: 86.15,
        DEF: 0,
        DEFP: 0,
        Crit: 0,
        CritD: 0,
        DamageP: 0,
        elementalMastery: 0,
        reactionBoost: 0,
        recharge: 0,
    },
    statusJustify: (status: PanalStatus) => {
        return { elementalMastery: status.HP * 0.0056 };
    },
};

export default KeyOfHierophany;
