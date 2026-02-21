import React from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface MessageCardProps {
  type: 'info' | 'error';
  message: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ type, message }) => {
  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-900/30' : 'bg-blue-900/30';
  const borderColor = isError ? 'border-red-500/50' : 'border-blue-500/50';
  const textColor = isError ? 'text-red-300' : 'text-blue-300';
  const Icon = isError ? AlertTriangleIcon : InfoIcon;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${bgColor} ${borderColor} animate-fade-in`}>
      <Icon className={`h-8 w-8 flex-shrink-0 ${textColor}`} />
      <div>
        <h4 className={`font-bold ${isError ? 'text-red-200' : 'text-blue-200'}`}>
          {isError ? 'An Error Occurred' : 'Information'}
        </h4>
        <p className="text-sm text-gray-300">{message}</p>
      </div>
    </div>
  );
};
