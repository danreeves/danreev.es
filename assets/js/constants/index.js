export const SKULL = `
     Hi. I'm░░
   Dan Reeves,░
  lead developer
 at fffunction, a
user-centred desig
n agency. I love w
riting JavaScript░
and░   Pyth   on.░
My░     oth    er░
pas     sio    n░░
 is░    ░ ░    ░░
 playing, making,░
 ░░and░   talking
     vid   eo
   ░  ░games.░ ░░
   I also  ░ ░ ░
    ░         ░
    ░ ░     ░ ░
    co-organise
     Cornwall
      Geeks.
`;

export const CHARS = ['█', '▓', '▒', '░'];

export const BLACKLIST = CHARS.concat(['\n']);

export const REPLACEMENTS = [
    { match: /\s+/g, with: ' ' },
    { match: 'desig n', with: 'design' },
    { match: 'w riting', with: 'writing' },
    { match: 'Pyth o', with: 'Pytho' },
    { match: 'oth e', with: 'othe' },
    { match: 'pas s', with: 'pass' },
    { match: 'passio n', with: 'passion' },
    { match: 'vid e', with: 'vide' },
];

export const LINKS = [
    { link: 'fffunction', to: 'http://fffunction.co' },
    { link: 'JavaScript', to: 'https://www.npmjs.com/~danreeves' },
    { link: 'playing', to: 'https://keeptrackofmygames.com/users/danreeves/lists/playing?display=Grid' },
    { link: 'Cornwall Geeks', to: 'http://join.cornwallgeeks.net/' },
];
