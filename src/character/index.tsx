import { useEffect, useState } from "react";
import styled from "styled-components";

import Cyno from "./Cyno";
import Nilou from "./Nilou";
import Nilou2 from "./Nilou2";

const CharacterSelector = ({ setCharacter }) => {
    const [name, setName] = useState("");
    const options = [Cyno, Nilou, Nilou2];

    useEffect(() => {
        setCharacter(options[0]);
        setName(options[0].name);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        options.forEach((option) => {
            if (option.name === name) {
                console.log(option.name);
                setCharacter(option);
            }
        });
    }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container displayName={name}>
            角色：
            <StyledInput
                value={""}
                onChange={(event) => {
                    setName(event.target.value);
                }}
                type="text"
                list={`characterList`}
                readonly
            />
            <datalist id={`characterList`}>
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

export default CharacterSelector;
