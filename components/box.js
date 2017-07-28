import styled from 'styled-components';

function getgrid({ tall, wide }) {
    let out = '';
    if (tall) {
        out += `
            grid-row: span ${tall};
        `;
    }
    if (wide) {
        out += `
            grid-column: span ${wide};
        `;
    }
    return out;
}

export default styled.div`
    ${props => getgrid(props)};
    border: 2px solid white;
    padding: 1rem;
    flex: 1 1 200px;

    max-width: 100%;

    @media (max-width: 630px) {
       margin: 0.25rem;
    }
`;
