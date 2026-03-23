import { motion } from "framer-motion";

export function ScoreChart({ score, total }: { score: number; total: number }) {
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const safePercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  const getColor = () => {
    if (safePercentage < 50) return "#ef4444"; // red
    if (safePercentage < 80) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  const getFillColor = () => {
    if (safePercentage < 50) return "#991b1b";
    if (safePercentage < 80) return "#854d0e";
    return "#14532d";
  };

  const fillColor = getFillColor();

  const color = getColor();

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Taustarengas */}
        <circle
          stroke="#1e3a8a"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Täyttö */}
        <motion.circle
          fill={fillColor}
          r={normalizedRadius - stroke / 2}
          cx={radius}
          cy={radius}
          initial={{ scale: 0 }}
          animate={{ scale: safePercentage / 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: "50%", originY: "50%" }}
        />

        {/* Progress */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* Teksti */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="600"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
}
