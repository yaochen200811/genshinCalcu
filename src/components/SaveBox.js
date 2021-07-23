import styled from "styled-components";
import { useState } from "react";

const SaveBox = ({save, load, names, idkey})=>{
    const [name, setName] = useState("");

    return (<>
        <StyledInput value={name} onChange={(event) => {setName(event.target.value)}} type="text" list={`models${idkey}`} />
        <datalist id={`models${idkey}`}>
            {names.map((name, i) => {
                return (
                    <option value={name} key={i} />
                );
            })}
        </datalist>
        <StyledButton onClick={() => save(name)}>保存</StyledButton>
        <StyledButton onClick={() => load(name)}>读取</StyledButton>
    </>);
};

const StyledInput = styled.input`
    width: 100px;
    margin-left: 20px;
`;

const StyledButton = styled.button`
    margin-left: 10px;
`;

export default SaveBox;