import { createGlobalStyle } from "styled-components";

export const light = {
	body: "#fff",
	fontColor: "#202020",
};

export const dark = {
	body: "#202020",
	fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`

    body{
        background-color: ${(props) => props.theme.body};
    }

`;
