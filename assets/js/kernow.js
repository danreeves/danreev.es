/* global window, document, requestAnimationFrame */
import {
    scaleLinear,
    select,
    json,
    forceSimulation,
    extent,
    forceX,
    forceY,
    forceCollide,
    drag,
    event,
} from 'd3';
import haversine from 'haversine';
import flatten from 'lodash.flatten';
import concaveman from 'concaveman';

function smallest (num, arr) {
    const a = [...arr];
    const list = [];
    for (let i = 0; i < num; i++) {
        const index = a.indexOf(Math.min(...a));
        list.push(index);
        a[index] = 999999999999;
    }
    return list;
}

function fitToScreen (width, height) {
    let w = window.innerWidth;
    let h = (window.innerWidth / (width / height));
    const diff = h - window.innerHeight;
    if (diff > 0) {
        w -= diff;
        h -= diff;
    }
    return {
        width: w,
        height: h,
    };
}

function maxText (d) {
    const name = document.querySelector('.name');
    let size = 1;
    name.removeAttribute('style');
    name.innerHTML = d.popup.match(/<h3>(.+)<\/h3>/)[1];
    while (name.clientHeight < window.innerHeight) {
        name.setAttribute('style', `font-size: ${size}px`);
        size++;
    }
    name.setAttribute('style', `font-size: ${size - 1}px`);
}

const { width, height } = fitToScreen(900, 600);

const radius = 10;
const concavity = 2;
const xkey = 'lon';
const ykey = 'lat';

const x = scaleLinear()
    .range([0, width])
    .domain([0, width]);
const y = scaleLinear()
    .range([height, 0])
    .domain([height, 0]);

const svg = select('body').append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

document.querySelector('svg')
.addEventListener('click', e => {
    if (e.target && e.target.tagName !== 'circle') {
        document.querySelector('.name').innerHTML = '';
    }
});

json('kernow.json', (error, data) => {
    x.domain(extent(data, (d) => d[xkey])).nice();
    y.domain(extent(data, (d) => d[ykey])).nice();

    data.forEach((location) => {
        const l = location;
        l.x = x(l[xkey]);
        l.y = y(l[ykey]);
        l.radius = radius;
    });

    let points = data.map(l => [l.x, l.y]);
    let concave = concaveman(points, concavity);

    concave = concave.map((point, index, array) => [
        point,
        array[index + 1],
    ]).slice(0, concave.length - 2);

    concave = concave.map(point => {
        let source = null;
        let target = null;
        data.filter((d, i) => {
            if (d.x === point[0][0] && d.y === point[0][1]) {
                source = i;
            }
        });
        data.filter((d, i) => {
            if (d.x === point[1][0] && d.y === point[1][1]) {
                target = i;
            }
        });
        return {
            source,
            target,
        };
    });

    const outline = svg.selectAll('.outline')
        .data(concave)
        .enter().append('line')
        .attr('class', 'outline')
        .attr('x1', d => data[d.source].x)
        .attr('y1', d => data[d.source].y)
        .attr('x2', d => data[d.target].x)
        .attr('y2', d => data[d.target].y);

    let links = data.map((location1, index1) => {
        const distances = data.map((location2, index2) => {
            if (index1 === index2) return 99999999;
            return haversine({
                latitude: location1.lat,
                longitude: location1.lon,
            }, {
                latitude: location2.lat,
                longitude: location2.lon,
            });

        });
        return smallest(5, distances).map((index2) => ({
            source: Math.min(index1, index2),
            target: Math.max(index1, index2),
        }));
    });

    links = Array.from(new Set(flatten(links)));

    const link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', d => data[d.source].x)
        .attr('y1', d => data[d.source].y)
        .attr('x2', d => data[d.target].x)
        .attr('y2', d => data[d.target].y);

    const node = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', radius)
        .attr('cx', (d) => x(d[xkey]))
        .attr('cy', (d) => y(d[ykey]))
        .style('fill', (d) => d.color)
        .call(drag()
            .on('start', maxText)
            .on('drag', (d) => {
                d.x = event.x; // eslint-disable-line no-param-reassign
                d.y = event.y; // eslint-disable-line no-param-reassign
            }))
        .on('click', maxText);

    const force = forceSimulation(data)
        .alphaDecay(0)
        .force('x', forceX(d => d.x))
        .force('y', forceY(d => d.y))
        // .force('link', forceLink(links))
        .force('collide', forceCollide((radius / 3) * 2))
        .on('tick', () => {

            node.attr('cx', d => d.x)
                .attr('cy', d => d.y);

            points = data.map(l => [l.x, l.y]);
            concave = concaveman(points, concavity);
            concave = concave.reduce((list, point) => {
                const len = list.length - 1;
                const lastLen = list[len].length;
                if (lastLen < 2) {
                    list[len].push(point);
                } else {
                    list.push([point]);
                }
                return list;
            }, [[]]);

            outline.attr('x1', d => data[d.source].x)
                .attr('y1', d => data[d.source].y)
                .attr('x2', d => data[d.target].x)
                .attr('y2', d => data[d.target].y);

            link.attr('x1', d => data[d.source].x)
                .attr('y1', d => data[d.source].y)
                .attr('x2', d => data[d.target].x)
                .attr('y2', d => data[d.target].y);
        });

    function run () {
        force.tick();
        requestAnimationFrame(run);
    }
    run();
});
