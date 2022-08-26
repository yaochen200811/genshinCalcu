import styled from "styled-components";
import { useEffect, useState } from "react";

import SkywardSpine from "./SkywardSpine";
import StaffOfHoma from "./StaffOfHoma";
import IronSting from "./IronSting";
import KeyOfHierophany from "./KeyOfHierophany";

const WeaponSelector = ({ setWeapon }) => {
    const [name, setName] = useState("");
    const options = [SkywardSpine, StaffOfHoma, IronSting, KeyOfHierophany];

    useEffect(() => {
        setWeapon(options[0]);
        setName(options[0].name);
    }, [setWeapon]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        options.forEach((option) => {
            if (option.name === name) {
                setWeapon(option);
            }
        });
    }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container displayName={name}>
            武器：
            <StyledInput
                value={""}
                onChange={(event) => {
                    setName(event.target.value);
                }}
                type="text"
                list={`weaponList`}
                readonly
            />
            <datalist id={`weaponList`}>
                {options.map((option, i) => {
                    return <option value={option.name} key={i} />;
                })}
            </datalist>
        </Container>
    );
};

const Container = styled.div`
    &&::after {
        position: relative;
        left: -100px;
        top: 2px;
        content: "${(props) => props.displayName}";
    }
`;

const StyledInput = styled.input`
    width: 100px;
`;

export default WeaponSelector;
