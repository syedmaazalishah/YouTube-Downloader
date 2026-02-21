import React from 'react';
import type { VideoFormat, Quality } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface QualitySelectorProps {
  label: string;
  formats: VideoFormat[];
  selectedValue: Quality;
  onValueChange: (value: Quality) => void;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({ label, formats, selectedValue, onValueChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full appearance-none bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          {formats.map((format) => (
            <option key={format.quality} value={format.quality}>
              {format.quality} ({format.size})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
