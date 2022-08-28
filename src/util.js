export const getExpectedDamage = (damage, critRate, critDamage) =>
    damage * (1 - critRate) + damage * critDamage * critRate;
