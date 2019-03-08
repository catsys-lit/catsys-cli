import { css } from 'lit-element';

export const fadeInTransitionPage = css`
    @keyframes fadeInTransitionPage {
        0% {
        transform: translate(0, 60%);
        animation-timing-function:ease-in-out
        }
        10% {
        transform: translate(0, 54%);
        animation-timing-function:ease-in-out
        }
        20% {
        transform: translate(0, 48%);
        animation-timing-function:ease-in-out
        }
        30% {
        transform: translate(0, 42%);
        animation-timing-function:ease-in-out
        }
        40% {
        transform: translate(0, 36%);
        animation-timing-function:ease-in-out
        }
        50% {
        transform: translate(0, 30%);
        animation-timing-function:ease-in-out
        }
        60% {
        transform: translate(0, 24%);
        animation-timing-function:ease-in-out
        }
        70% {
        transform: translate(0, 18%);
        animation-timing-function:ease-in-out
        }
        80% {
        transform: translate(0, 12%);
        animation-timing-function:ease-in-out
        }
        90% {
        transform: translate(0, 6%);
        animation-timing-function:ease-in-out
        }
        100% {
        transform: translate(0, 0);
        animation-timing-function:ease-in-out
        }
    }
`;
