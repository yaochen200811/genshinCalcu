import styled from "styled-components";
import { useState } from "react";

const SaveBox = ({ save, load, del, names, idkey }) => {
    const [name, setName] = useState("");

    return (<>
        <StyledInput value={name} onChange={(event) => { setName(event.target.value) }} type="text" list={`models${idkey}`} />
        <datalist id={`models${idkey}`}>
            {names.map((name, i) => {
                return (
                    <option value={name} key={i} />
                );
            })}
        </datalist>
        <StyledButton onClick={() => save(name)} style={{ background: "#3ba4ed" }}>保存</StyledButton>
        <StyledButton onClick={() => load(name)} style={{ background: "#3ced57" }}>读取</StyledButton>
        <StyledButton onClick={() => del(name)} style={{ background: "#ec1a1b" }}>删除</StyledButton>
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