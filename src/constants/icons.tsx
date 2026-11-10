type point = [x: number, y: number];

const padding = 0.1;
const height = 0.6;
const top = (1 - height) / 2;
const bottom = 1 - top;
const left = 0.3;
const right = 1 - left;

const height2 = 0.3;
const top2 = (1 - height2) / 2;
const bottom2 = 1 - top2;
const left2 = 0.1;
const right2 = 1 - left2;

const Mix = (start: number, end: number, ratio: number) => (1 - ratio) * start + ratio * end;

const Control = ([sx, sy]: point, [px, py]: point, [ex, ey]: point): point => [
  2 * px - (sx + ex) / 2,
  2 * py - (sy + ey) / 2,
];

const SCurve = ([x1, y1]: point, [x2, y2]: point, strength = 0.75) => {
  return `C ${Mix(x1, x2, strength)} ${y1}, ${Mix(x1, x2, 1 - strength)} ${y2}, ${x2} ${y2}`;
};

export const SVG: React.FC<React.SVGProps<SVGSVGElement>> = ({ color = 'currentColor', strokeWidth = 8, ...props }) => (
  <svg
    viewBox='0 0 1 1'
    fill='none'
    color={color}
    stroke={color}
    strokeWidth={Number(strokeWidth) / 100}
    strokeLinecap='round'
    strokeLinejoin='round'
    vectorEffect='non-scaling-stroke'
    {...props}
  />
);

// M: move to, L: line to, V: vertical line to, H : Horizontal line to */
export const SawtoothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    {/* (0,0.5) -> (l, 0.5) -> (0.5,b) -> (0.5, t) -> (r,0.5) -> (1,0.5) */}
    <path d={`M 0 0.5 H ${left} L 0.5 ${bottom} V ${top} L ${right} 0.5 H 1`} />
  </SVG>
);

export const TriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const l2 = 5 / 12;

  return (
    <SVG {...props}>
      {/* (0,0.5) -> (l, 0.5) -> (l2,b) -> (r2, t) -> (r,0.5) -> (1,0.5) */}
      <path d={`M 0 0.5 H ${left} L ${l2} ${bottom} L ${1 - l2} ${top} L ${right} 0.5 H 1`} />
    </SVG>
  );
};

export const SquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    {/* (0,0.5) -> (l, 0.5) -> (l,t) -> (0.5, t) -> (0.5, b) -> (r, b) -> (r,0.5) -> (1,0.5) */}
    <path d={`M 0 0.5 H ${left} V ${top} H 0.5 V ${bottom} H ${right} V 0.5 H 1`} />
  </SVG>
);

export const SineQaudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const l = 0.2;
  const peak = 0.375;
  const [controlX, controlY] = Control([l, 0.5], [peak, bottom], [0.5, 0.5]);

  return (
    <SVG {...props}>
      <path d={` M 0 0.5 H ${l} Q ${controlX} ${controlY}, 0.5 0.5 T ${1 - l} 0.5 H 1 `} />
    </SVG>
  );
};

export const SineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const l = 0.15;
  const peak = 0.375;

  return (
    <SVG {...props}>
      <path
        d={`M 0 0.5 H ${l}
            ${SCurve([l, 0.5], [peak, bottom])}
            ${SCurve([peak, bottom], [1 - peak, top])}
            ${SCurve([1 - peak, top], [1 - l, 0.5])}
            H 1`}
      />
    </SVG>
  );
};

export const SquareAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path
      d={`M 0 0.5 H ${left2} V ${top2} H ${left} V ${bottom} H 0.5 V ${top} H ${right} V ${bottom2} H ${right2} V 0.5 H 1`}
    />
  </SVG>
);

export const SawtoothAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path d={`M 0 0.5 H ${left2} V ${top2} L 0.5 ${bottom} V ${top} L ${right2} ${bottom2} V 0.5 H 1`} />
  </SVG>
);

export const TriangleAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path d={`M 0 0.5 H ${left2} L 0.2 ${top2} L 0.4 ${bottom} L 0.6 ${top} L 0.8 ${bottom2} L ${right2} 0.5 H 1`} />
  </SVG>
);

export const SineAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const l = 0.025;
  return (
    <SVG {...props}>
      <path
        d={`M 0 0.5 H ${l}
            ${SCurve([l, 0.5], [0.2, top2])}
            ${SCurve([0.2, top2], [0.4, bottom])}
            ${SCurve([0.4, bottom], [0.6, top])}
            ${SCurve([0.6, top], [0.8, bottom2])}
            ${SCurve([0.8, bottom2], [1 - l, 0.5])}
            H 1`}
      />
    </SVG>
  );
};

export const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props} fill='currentColor'>
    <path d={`M ${padding} ${padding} H ${1 - padding} V ${1 - padding} H ${padding} Z`} />
  </SVG>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props} fill='currentColor'>
    <path d={`M ${1 - padding} 0.5 L ${padding + (1 - 2 * padding) * Math.cos(30)} ${padding} V ${1 - padding} Z`} />
  </SVG>
);

export const PedalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path d={`M ${1 / 6} 0.75 h ${2 / 3} l ${-1 / 12} ${-1 / 3} H 0.25 l ${-1 / 12} ${1 / 3} z`} />
    <path d={`M ${5 / 12} ${5 / 12} v ${-1 / 6} h ${1 / 6} v ${1 / 6}`} />
  </SVG>
);

export const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG viewBox='0 0 16 16' height={16} fill='currentColor' strokeWidth={100} {...props}>
    <path fillRule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z' />
    <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466' />
  </SVG>
);

export const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG viewBox='0 0 16 16' fill='currentColor' {...props}>
    <path d='M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z' />
    <path d='M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
  </SVG>
);
