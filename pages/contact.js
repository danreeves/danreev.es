import { Component } from 'react';
import styled from 'styled-components'
import Base from '../components/base';
import { BaffledLink } from '../components/common/link';

const ASCII = styled.pre`
    font-size: 0.5em;
    font-family: monospace;
`

export default class Contact extends Component {
    render() {
        return (
            <Base title="Contact">
                <BaffledLink href="/">← Home</BaffledLink>
                <h1>Contact</h1>
                <p>
                    If you need to get in touch the quickest way might be
                    through Twitter{' '}
                    <BaffledLink href="https://twitter.com/dnrvs">
                        @dnrvs
                    </BaffledLink>. If it's longer than 140 characters then you
                    can email me at{' '}
                    <BaffledLink href="mailto:hey@danreev.es">
                        hey@danreev.es
                    </BaffledLink>.
                </p>
                <p>Don't bother sending a message on LinkedIn.</p>
                <p>Here's a good dog I found:</p>
                <ASCII>{`
           ____,'\`-,
      _,--'   ,/::.;
   ,-'       ,/::,' \`---.___        ___,_
   |       ,:';:/        ;'"\`;"\`--./ ,-^.;--.
   |:     ,:';,'         '         \`.   ;\`   \`-.
    \:.,:::/;/ -:.                   \`  | \`     \`-.
     \:::,'//__.;  ,;  ,  ,  :.\`-.   :. |  ;       :.
      \,',';/O)^. :'  ;  :   '__\` \`  :::\`.       .:' )
      |,'  |\__,: ;      ;  '/O)\`.   :::\`;       ' ,'
           |\`--''            \__,' , ::::(       ,'
           \`    ,            \`--' ,: :::,'\   ,-'
            | ,;         ,    ,::'  ,:::   |,'
            |,:        .(          ,:::|   \`
            ::'_   _   ::         ,::/:|
           ,',' \`-' \   \`.      ,:::/,:|
          | : _  _   |   '     ,::,' :::
          | \ O\`'O  ,',   ,    :,'   ;::
           \ \`-'\`--',:' ,' , ,,'      ::
            \`\`:.:.__   ',-','        ::'
               \`--.__, ,::.         ::'
                   |:  ::::.       ::'
                   |:  ::::::    ,::'
                `}</ASCII>
            </Base>
        );
    }
}
