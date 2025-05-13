import { dataType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import RenderProvidersComponent from '@/components/ui/renderproviders';
import FallbackImage from '@/components/ui/FallbackImage';

interface RenderComponentProps {
    movies: dataType[];
}

const MovieDetailsComponent: React.FC<RenderComponentProps> = ({ movies }) => {
    return (
        <div className="grid gap-4 w-full text-black grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
            {movies.map((movie) => (
                <Dialog key={movie.id}>
                    <DialogTrigger asChild>
                        <div className="bg-[#d8d8d8] rounded-lg shadow overflow-hidden flex flex-col cursor-pointer hover:scale-[1.01] transition-transform">
                            <FallbackImage
                                src={movie.poster_path || '/no-image.png'}
                                alt={movie.title}
                                width={240}
                                height={360}
                                className="h-60 p-2 w-full object-cover"
                                unoptimized
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-lg font-semibold mb-2 flex-1">{movie.title}</h2>
                                <p className="text-sm mb-2">⭐ {movie.rating}</p>
                            </div>
                            <div className="p-4 bg-gray-200 flex flex-col">
                                <h3 className="text-md font-semibold mb-2">Proveedores</h3>
                                <RenderProvidersComponent movie={movie} />
                            </div>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-3xl w-full md:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl mb-4">{movie.title}</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Movie Image */}
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <FallbackImage
                                    src={movie.poster_path || '/no-image.png'}
                                    alt={movie.title}
                                    width={240}
                                    height={360}
                                    className="rounded-lg"
                                    unoptimized
                                />
                            </div>

                            {/* Movie Info */}
                            <div className="flex flex-col gap-4 flex-1">
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
            ))}
        </div>
    );
};

export default MovieDetailsComponent;
