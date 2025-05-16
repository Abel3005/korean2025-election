import React from 'react';

interface CandidateCardProps {
  name: string;
  party: string;
  image: string;
  description: string;
  supportRate: string;
  partyColor: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  party,
  image,
  description,
  supportRate,
  partyColor
}) => {
  const getStyles = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bgColor: 'bg-blue-100',
          gradient: 'from-blue-600',
          badge: 'bg-blue-700',
          text: 'text-blue-600',
          button: 'bg-blue-600'
        };
      case 'red':
        return {
          bgColor: 'bg-red-100',
          gradient: 'from-red-600',
          badge: 'bg-red-700',
          text: 'text-red-600',
          button: 'bg-red-600'
        };
      case 'green':
        return {
          bgColor: 'bg-green-100',
          gradient: 'from-green-600',
          badge: 'bg-green-700',
          text: 'text-green-600',
          button: 'bg-green-600'
        };
      case 'yellow':
        return {
          bgColor: 'bg-yellow-100',
          gradient: 'from-yellow-600',
          badge: 'bg-yellow-700',
          text: 'text-yellow-600',
          button: 'bg-yellow-600'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          gradient: 'from-gray-600',
          badge: 'bg-gray-700',
          text: 'text-gray-600',
          button: 'bg-gray-600'
        };
    }
  };

  const styles = getStyles(partyColor);

  return (
    <div className="candidate-card bg-white rounded-lg shadow-md flex-shrink-0 w-64 overflow-hidden border border-gray-100">
      <div className={`h-48 ${styles.bgColor} relative`}>
        <img
          src={image}
          className="w-full h-full object-cover object-top"
          alt={`${name} 후보`}
        />
        <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${styles.gradient} to-transparent p-4`}>
          <span className={`inline-block px-2 py-1 ${styles.badge} text-white text-xs font-medium rounded-full mb-2`}>
            {party}
          </span>
          <h3 className="text-white text-xl font-bold">{name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">지지율</span>
            <span className={`font-bold ${styles.text}`}>{supportRate}%</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${styles.button}`}
              style={{ width: `${supportRate}%` }}
            ></div>
          </div>
        </div>
        <button className={`w-full ${styles.button} text-white py-2 rounded-button font-medium !rounded-button whitespace-nowrap`}>
          자세히 보기
        </button>
      </div>
    </div>
  );
};

export default CandidateCard; 