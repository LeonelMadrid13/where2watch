import type { dataType } from '@/types';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RenderProvidersComponent from '@/components/ui/renderproviders';

interface DetailsDialogComponentProps {
    movie: dataType;
}

const DetailsDialogComponent: React.FC<DetailsDialogComponentProps> = ({ movie }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full h-full text-left"> {/* wrap the card if needed */}
                    <div className="bg-[#d8d8d8] rounded-lg shadow overflow-hidden flex flex-col h-full">
                        <Image
                            src={movie.poster_path!}
                            alt={movie.title}
                            width={240}
                            height={360}
                            className="h-60 w-full object-cover"
                            unoptimized
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <p className="text-sm text-gray-600">⭐ {movie.rating}</p>
                        </div>
                    </div>
                </button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-3xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl mb-4">{movie.title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[80vh]">
                    {/* Movie Image */}
                    <div className="w-full md:w-1/3 flex justify-center ">
                        <Image
                            src={movie.poster_path!}
                            alt={movie.title}
                            width={240}
                            height={360}
                            className="rounded-lg object-cover w-auto h-auto max-w-full"
                            unoptimized
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="flex flex-col gap-4 w-full md:w-2/3">
                        <div>
                            <h3 className="text-lg font-semibold">Descripción</h3>
                            <p className="text-sm text-gray-700">{movie.description || 'No description available.'}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Calificación</h3>
                            <p className="inline-block bg-gray-300 px-2 py-1 rounded text-sm">⭐ {movie.rating}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Proveedores</h3>
                            <RenderProvidersComponent movie={movie} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DetailsDialogComponent;
