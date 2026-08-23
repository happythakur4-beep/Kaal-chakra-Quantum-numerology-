import React from 'react';
import { RealisticBlackHoleInfall } from './RealisticBlackHoleInfall';

interface BlackHoleWarpTransitionProps {
  onComplete: () => void;
}

export const BlackHoleWarpTransition: React.FC<BlackHoleWarpTransitionProps> = ({ onComplete }) => {
  return <RealisticBlackHoleInfall onComplete={onComplete} />;
};
