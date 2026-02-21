import React from 'react';
import { LoaderIcon } from './icons/LoaderIcon';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <LoaderIcon className="h-10 w-10 text-red-500 animate-spin" />
    <p className="mt-4 text-lg text-gray-300 font-semibold">Fetching media details...</p>
    <p className="text-sm text-gray-500">Please wait a moment.</p>
  </div>
);
