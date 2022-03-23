interface RawLogoProps {
  width?: number;
  offsetX?: number;
  shadow?: boolean;
  selfBlur?: boolean;
}

function RawLogo({ width = 70, offsetX = 8, shadow = true, selfBlur = false }: RawLogoProps) {
  const colors = ["#22C55E", "#DC2626", "#3B82F6"];
  const geoParams = {
    radius: 9,
    offsetX: 8,
    get width() {
      let n = colors.length;
      return this.radius * n * 2 + this.offsetX * (n - 1);
    },
    get height() {
      return 2 * this.radius;
    },
    get ratio() {
      return this.width / this.height;
    },
  };

  return (
    <svg
      width={width}
      height={width / geoParams.ratio}
      viewBox={`0 0 ${geoParams.width} ${geoParams.height}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      overflow="visible"
      {...(selfBlur && { opacity: 0.25 })}
    >
      {shadow &&
        colors.map((color, index) => (
          <filter key={index} id={`shadow${index}`} x="-50" y="-50" width="100" height="100">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={color} floodOpacity="0.6" />
          </filter>
        ))}
      {selfBlur && (
        <filter id="blur" x="-50" y="-50" width="100" height="100">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      )}
      <g transform={`translate(0, ${geoParams.radius})`}>
        {colors.map((color, index) => (
          <circle
            key={index}
            cx={geoParams.radius + index * (geoParams.radius * 2 + geoParams.offsetX)}
            cy="0"
            r={geoParams.radius}
            fill={color}
            {...(shadow && { filter: `url(#shadow${index})` })}
            {...(selfBlur && { filter: "url(#blur)" })}
          />
        ))}
      </g>
    </svg>
  );
}

export default RawLogo;
