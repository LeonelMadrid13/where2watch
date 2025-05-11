// src/app/components/ui/renderproviders.tsx
import React from 'react';
import Image from 'next/image';
import type { dataType } from '@/types';

interface RenderProvidersComponentProps {
    movie: dataType;
}

const RenderProvidersComponent: React.FC<RenderProvidersComponentProps> = ({ movie }) => {
    const providers = movie.providers?.['MX']?.flatrate;
    if (!providers || providers.length === 0) return <>No providers found</>;

    return (
        <div className="flex flex-wrap gap-2">
            {providers.map(({ provider_id, logo_path, provider_name }) => (
                <Image
                    key={provider_id}
                    src={`https://media.themoviedb.org/t/p/original${logo_path}`}
                    alt={provider_name}
                    title={provider_name}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                />
            ))}
        </div>
    );
};

export default RenderProvidersComponent;