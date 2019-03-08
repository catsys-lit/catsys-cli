import {css} from 'lit-element';

export const styles = css`
:host {
    display: grid;
    min-height: 100vh;
    grid-template-areas:
    "header header header"
    "main   main   main"
    "footer footer footer";
    grid-template-rows: auto 1fr auto;
}
.header-app {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    grid-area: header;
    min-height: 60px;
    line-height: 30px;
    background-color: #7986CB;
    color: #e5e5e5;
}
.main-app {
    grid-area: main;
}
.footer-app {
    grid-area: footer;
    height: 60px;
    display: flex;
    justify-content: flex-start;
}

.container-app {
    padding: 15px;
    box-sizing: border-box;
}
.container-footer {
    padding: 0 15px;
    box-sizing: border-box;
}
a {
    color: inherit;
    text-decoration: none;
}
.title {
    color: white;
    font-weight: lighter;
    font-size: 1.5rem;
    flex: 1 auto;
}
.navbar-principal {
    display: flex;
    flex-flow: row nowrap;
    line-height: 60px;
}
.navbar-principal a{
    padding: 0 15px;
    position: relative;
}
.navbar-principal a.home {
    background-color: #5C6BC0;
}
.navbar-principal a.default {
    background-color: #3F51B5;
}
.social-github {
    display: flex;
    flex: 0 auto;
    align-items: center;
}
.social-github img{
    height: 60%;
}
@media (max-width: 600px) {
    .header-app {
    flex-flow: column nowrap
    }
    .navbar-principal {
    flex: 1 auto;
    justify-content: center;
    }
    .navbar-principal a{
    flex: 1 auto;
    }
}
`;
