const SQUIGS = Array.from({ length: 4 }).map((_, i) => i);

const style = `
@keyframes squiggly-anim {
  ${SQUIGS.map((i) => {
    const p = (i / (SQUIGS.length - 1)) * 100;

    return `${p}% {
      filter: url(\"#squiggly-${i}\");  
    }
    `;
  }).join("")}
}
`;

export function Footer() {
  return (
    <>
      <footer>
        <small>this website was made by dan reeves :)</small>
      </footer>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          {SQUIGS.map((i) => {
            return (
              <filter id={`squiggly-${i}`} key={i}>
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed={i}
                />
                <feDisplacementMap
                  id="displacement"
                  in="SourceGraphic"
                  in2="noise"
                  scale="1"
                />
              </filter>
            );
          })}
        </defs>
      </svg>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </>
  );
}
