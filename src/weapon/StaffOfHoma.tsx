import { Weapon, PanalStatus } from "../components/CharacterCalculator";

const StaffOfHoma: Weapon = {
    name: "护摩之杖",
    baseStatus: {
        ATK: 608.07,
        ATKP: 0,
        HP: 0,
        HPP: 20,
        DEF: 0,
        DEFP: 0,
        Crit: 0,
        CritD: 66.15,
        DamageP: 0,
        elementalMastery: 0,
        reactionBoost: 0,
        recharge: 0,
    },
    statusJustify: (status: PanalStatus) => {
        return { ATK: status.HP * 0.008 };
    },
};

export default StaffOfHoma;
