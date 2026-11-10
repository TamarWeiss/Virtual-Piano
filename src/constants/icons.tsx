import Point from './Point';

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

const toRadians = (angle: number) => angle * (Math.PI / 180);
const modulo = (num: number, divisor: number) => ((num % divisor) + divisor) % divisor;
const Mix = (start: number, end: number, ratio: number) => (1 - ratio) * start + ratio * end;
const Control = (start: Point, peak: Point, end: Point) => peak.mult(2).subtract(start.add(end).divide(2));
const SCurve = (p1: Point, p2: Point, strength = 0.75) =>
  `C ${Mix(p1.x, p2.x, strength)} ${p1.y}, ${Mix(p1.x, p2.x, 1 - strength)} ${p2.y}, ${p2.x} ${p2.y}`;

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
  const control = Control(new Point(l, 0.5), new Point(peak, bottom), new Point(0.5, 0.5));

  return (
    <SVG {...props}>
      <path d={` M 0 0.5 H ${l} Q ${control.x} ${control.y}, 0.5 0.5 T ${1 - l} 0.5 H 1 `} />
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
            ${SCurve(new Point(l, 0.5), new Point(peak, bottom))}
            ${SCurve(new Point(peak, bottom), new Point(1 - peak, top))}
            ${SCurve(new Point(1 - peak, top), new Point(1 - l, 0.5))}
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
            ${SCurve(new Point(l, 0.5), new Point(0.2, top2))}
            ${SCurve(new Point(0.2, top2), new Point(0.4, bottom))}
            ${SCurve(new Point(0.4, bottom), new Point(0.6, top))}
            ${SCurve(new Point(0.6, top), new Point(0.8, bottom2))}
            ${SCurve(new Point(0.8, bottom2), new Point(1 - l, 0.5))}
            H 1`}
      />
    </SVG>
  );
};

export const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const strokeWidth = Number(props.strokeWidth ?? 8);
  const padding = strokeWidth / 200;
  const radius = 0.15;
  return (
    <SVG {...props} fill='currentColor' strokeWidth={strokeWidth}>
      <rect width={1 - 2 * padding} height={1 - 2 * padding} x={padding} y={padding} rx={radius} ry={radius} />
    </SVG>
  );
};

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const strokeWidth = Number(props.strokeWidth ?? 24);
  const padding = strokeWidth / 200;
  const radius = 1 - 2 * padding;
  const height = radius * Math.sin(toRadians(60));
  const x1 = (1 + height) / 2;
  const x2 = x1 + radius * -Math.sin(toRadians(60));

  return (
    <SVG {...props} fill='currentColor' strokeWidth={strokeWidth}>
      <path d={`M ${x1} 0.5 L ${x2} ${padding} V ${1 - padding} Z`} />
    </SVG>
  );
};

export const PedalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path d={`M ${1 / 6} 0.75 h ${2 / 3} l ${-1 / 12} ${-1 / 3} H 0.25 l ${-1 / 12} ${1 / 3} z`} />
    <path d={`M ${5 / 12} ${5 / 12} v ${-1 / 6} h ${1 / 6} v ${1 / 6}`} />
  </SVG>
);

interface ResetProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  start?: number;
  end?: number;
  arrowAngle?: number;
  clockwise?: boolean;
  arrowLength?: number;
}

export const ResetIcon: React.FC<ResetProps> = ({
  strokeWidth = 12,
  start = 90,
  end = 180,
  clockwise = true,
  arrowAngle = 75,
  arrowLength = (3 * strokeWidth) / 100,
  ...props
}) => {
  arrowAngle = toRadians(arrowAngle);
  start = toRadians(start);
  end = toRadians(end);
  const radius = 0.5 - arrowLength / 2;
  const large = Number(modulo(clockwise ? start - end : end - start, 2 * Math.PI) > Math.PI);
  const mid = new Point(0.5, 0.5);

  const p1 = new Point(Math.sin(start), Math.cos(start)).mult(radius).add(mid);
  const p2 = new Point(Math.sin(end), Math.cos(end)).mult(radius).add(mid);
  const p3 = new Point(Math.sin(end), Math.cos(end)).mult(radius + arrowLength / 2).add(mid);
  const p4 = new Point(Math.sin(end), Math.cos(end)).mult(radius - arrowLength / 2).add(mid);
  const p5 = new Point(Math.cos(end), -Math.sin(end))
    .mult((arrowLength / 2 / Math.tan(arrowAngle / 2)) * (clockwise ? -1 : 1))
    .add(p2);

  return (
    <SVG {...props} strokeWidth={strokeWidth} strokeLinecap='square'>
      <path d={`M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${large} ${Number(clockwise)} ${p2.x} ${p2.y}`} />
      <path fill='currentColor' d={`M ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} z`} strokeWidth={0} />
    </SVG>
  );
};

export const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG viewBox='0 0 16 16' fill='currentColor' {...props}>
    <path d='M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z' />
    <path d='M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
  </SVG>
);

export const DiceIcon2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const strokeWidth = Number(props.strokeWidth ?? 8);
  const padding = strokeWidth / 200;
  const radius = 0.2;
  return (
    <SVG {...props}>
      <rect width={1 - 2 * padding} height={1 - 2 * padding} x={padding} y={padding} rx={radius} ry={radius} />
    </SVG>
  );
};

export const RandomizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const strokeWidth = Number(props.strokeWidth ?? 12);

  return (
    <SVG viewBox='0 0 16 16' fill='currentColor' {...props} strokeWidth={strokeWidth}>
      <path
        fillRule='evenodd'
        d='M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5'
      />
      <path d='M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192' />
    </SVG>
  );
};
