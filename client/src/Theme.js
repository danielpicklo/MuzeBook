import { createGlobalStyle } from "styled-components";

export const light = {
	body: "#fff",
	fontColor: "#202020",
	postBody: "#efefef",
	postHead: "#d4d4d4",
	navBarBody: "#fff",
	profileSidebar: "#fff",
	footer: "#202020",
};

export const dark = {
	body: "#202020",
	fontColor: "#fff",
	postBody: "#4a4a4a",
	postHead: "#000",
	navBarBody: "#000",
	profileSidebar: "#202020",
	footer: "#000",
};

export const GlobalStyles = createGlobalStyle`

    body{
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.fontColor};
    }

    .footer{
        background-color: ${(props) => props.theme.footer};
    }

    .navbar{
        background-color: ${(props) => props.theme.navBarBody};
    }

    .navbar a {
        color: ${(props) => props.theme.fontColor};
        transition: 0.5s;
    }

    .post .user-header{
        background-color: ${(props) => props.theme.postHead};
    }

    .post{
        background-color: ${(props) => props.theme.postBody};
    }

    .post h4{
        color: ${(props) => props.theme.fontColor};
    }

.form form textarea, .form form input{
    background-color: ${(props) => props.theme.body};
}

`;
