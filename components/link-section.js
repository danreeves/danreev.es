import Link from 'next/link';
import styled from 'styled-components';
import { BaffledLink } from './common/link';
import List from './common/list';

const Desc = styled.p`
    margin: 0.5em 1em;
    font-size: 0.8em;
    max-width: 55%;
`;

export default ({ title, list, fullPage }) => {
    return (
        <div>
            <h2>
                {title}
            </h2>
            <List>
                {list.map(item =>
                    <li key={item.label}>
                        <BaffledLink href={item.href}>
                            {item.label}
                        </BaffledLink>
                        {item.desc
                            ? <Desc>
                                  {item.desc}
                              </Desc>
                            : null}
                    </li>
                )}
            </List>
            {fullPage
                ? <Link>
                      <BaffledLink href={fullPage}>See more →</BaffledLink>
                  </Link>
                : null}
        </div>
    );
};
