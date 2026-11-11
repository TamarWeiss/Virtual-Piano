import { useId } from 'react';
import Point from './Point';
import { DEFAULT_DICE_VALUE } from './pianoConfig';

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

interface StopProps extends React.SVGProps<SVGSVGElement> {
  borderRadius?: number;
  strokeWidth?: number;
}

export const StopIcon: React.FC<StopProps> = ({ borderRadius = 20, strokeWidth = 0, ...props }) => {
  const p = strokeWidth / 200;
  const stroke = props.stroke ?? (props.fill && props.fill !== 'none' ? props.fill : 'currentColor');
  const fill = props.fill ?? (props.stroke && props.stroke !== 'none' ? props.stroke : 'currentColor');
  return (
    <SVG {...props} fill={fill} strokeWidth={strokeWidth} stroke={stroke}>
      <rect width={1 - 2 * p} height={1 - 2 * p} x={p} y={p} rx={borderRadius / 100} ry={borderRadius / 100} />
    </SVG>
  );
};

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ strokeWidth = 24, ...props }) => {
  const stroke = props.stroke ?? (props.fill && props.fill !== 'none' ? props.fill : 'currentColor');
  const fill = props.fill ?? (props.stroke && props.stroke !== 'none' ? props.stroke : 'currentColor');
  const padding = Number(strokeWidth) / 200;
  const radius = 1 - 2 * padding;
  const height = radius * Math.sin(toRadians(60));
  const x1 = (1 + height) / 2;
  const x2 = x1 + radius * -Math.sin(toRadians(60));

  return (
    <SVG {...props} fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      <path d={`M ${x1} 0.5 L ${x2} ${padding} V ${1 - padding} Z`} />
    </SVG>
  );
};

interface ResetProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  start?: number;
  end?: number;
  arrowAngle?: number;
  clockwise?: boolean;
  arrowLength?: number;
}

export const ResetIcon: React.FC<ResetProps> = ({
  stroke = 'currentColor',
  strokeWidth = 12,
  start = 90,
  end = 180,
  clockwise = true,
  arrowAngle = 75,
  arrowLength = (3 * strokeWidth) / 100,
  ...props
}) => {
  start = toRadians(start);
  end = toRadians(end);
  const radius = 0.5 - arrowLength / 2;
  const large = Number(modulo(clockwise ? start - end : end - start, 2 * Math.PI) > Math.PI);
  const mid = new Point(0.5, 0.5);
  const height = arrowLength / 2 / Math.tan(toRadians(arrowAngle) / 2);

  const p1 = new Point(Math.sin(start), Math.cos(start)).mult(radius).add(mid);
  const p2 = new Point(Math.sin(end), Math.cos(end)).mult(radius).add(mid);
  const p3 = new Point(Math.sin(end), Math.cos(end)).mult(radius + arrowLength / 2).add(mid);
  const p4 = new Point(Math.sin(end), Math.cos(end)).mult(radius - arrowLength / 2).add(mid);
  const p5 = new Point(Math.cos(end), -Math.sin(end)).mult(height * (clockwise ? -1 : 1)).add(p2);

  return (
    <SVG {...props} stroke={stroke} strokeWidth={strokeWidth}>
      <path d={`M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${large} ${Number(clockwise)} ${p2.x} ${p2.y}`} />
      <path fill={stroke} d={`M ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} z`} strokeWidth={0} />
    </SVG>
  );
};

interface ShuffleProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  arrowAngle?: number;
  arrowLength?: number;
}
export const ShuffleIcon: React.FC<ShuffleProps> = ({
  stroke = 'currentColor',
  strokeWidth = 12,
  arrowAngle = 75,
  arrowLength = (3 * strokeWidth) / 100,
  ...props
}) => {
  const padding = strokeWidth / 200;
  const height = arrowLength / 2 / Math.tan(toRadians(arrowAngle) / 2);
  const p1 = new Point(padding, arrowLength / 2);
  const p2 = new Point(1 - height, 1 - arrowLength / 2);
  const p3 = new Point(padding, 1 - arrowLength / 2);
  const p4 = new Point(1 - height, arrowLength / 2);

  return (
    <SVG {...props} stroke={stroke} strokeWidth={strokeWidth}>
      <path
        d={`M ${p1.x} ${p1.y} ${SCurve(p1, p2, 0.5)}
            M ${p3.x} ${p3.y} ${SCurve(p3, p4, 0.5)}`}
      />
      <path
        strokeWidth={0}
        fill={stroke}
        d={`M 1 ${p2.y} L ${p2.x} 1 v ${-arrowLength} z
            M 1 ${p4.y} L ${p4.x} 0 v ${arrowLength} z`}
      />
    </SVG>
  );
};

interface DiceProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  value?: number;
}

export const DiceIcon: React.FC<DiceProps> = ({ value = DEFAULT_DICE_VALUE, strokeWidth = 8, ...props }) => {
  const p = strokeWidth / 200;
  const br = 0.2;
  const radius = 0.1;
  const left = (0.5 + p) / 2;
  const size = 1 - 2 * p;
  const stroke = props.stroke ?? (props.fill && props.fill !== 'none' ? props.fill : 'currentColor');
  const hasFill = props.fill && props.fill !== 'none';
  const maskId = useId();
  value--;

  const points = [
    new Point(left, left),
    new Point(0.5, left),
    new Point(1 - left, left),
    new Point(left, 0.5),
    new Point(0.5, 0.5),
    new Point(1 - left, 0.5),
    new Point(left, 1 - left),
    new Point(0.5, 1 - left),
    new Point(1 - left, 1 - left),
  ];

  const indexes = [
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
    [0, 2, 3, 4, 5, 6, 8],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
  ];

  return (
    <SVG {...props} stroke={stroke} strokeWidth={strokeWidth}>
      <defs>
        <mask id={maskId}>
          <rect x='0' y='0' width='1' height='1' fill='white' />
          {indexes[value]?.map((i) => (
            <circle key={i} cx={points[i].x} cy={points[i].y} r={radius} fill='black' strokeWidth={0} />
          ))}
        </mask>
      </defs>

      {hasFill && <rect width={size} height={size} x={p} y={p} rx={br} ry={br} mask={`url(#${maskId})`} />}
      <rect width={size} height={size} x={p} y={p} rx={br} ry={br} fill='none' />

      {!hasFill &&
        indexes[value]?.map((i) => (
          <circle key={i} cx={points[i].x} cy={points[i].y} r={radius} fill={stroke} strokeOpacity={0} />
        ))}
    </SVG>
  );
};

export const PedalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SVG {...props}>
    <path d={`M ${1 / 6} 0.75 h ${2 / 3} l ${-1 / 12} ${-1 / 3} H 0.25 l ${-1 / 12} ${1 / 3} z`} />
    <path d={`M ${5 / 12} ${5 / 12} v ${-1 / 6} h ${1 / 6} v ${1 / 6}`} />
  </SVG>
);
